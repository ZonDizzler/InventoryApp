import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc, onSnapshot, Timestamp, setDoc, query, where } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { Alert } from "react-native";
import { Item, ItemsByFolder, ItemHistoryEntry, ItemLocation } from "@/types/types";
import { getChangedFields, generateChangeDescription } from "@/services/itemChanges"
import { FirebaseError } from "firebase/app";

// Function to fetch items from Firestore based on an Organization Id and organize them by category
export const subscribeToItems = (
  organizationId: string,
  callback: (itemsByFolder: ItemsByFolder) => void
) => {
  if (!organizationId) {
    console.error("subscribeToItems", "No organizationId provided");
    return () => {};
  }

  const orgRef = doc(db, "organizations", organizationId);
  const itemsRef = collection(orgRef, "items");

  // Step 1: Subscribe to categories first
  const unsubscribeCategories = subscribeToCategories(organizationId, (categoryNames) => {
    // Create the initial empty folder structure
    const initialItemsByFolder: ItemsByFolder = {};
    categoryNames.forEach((name) => {
      initialItemsByFolder[name] = [];
    });

    // Step 2: Now subscribe to items
    const unsubscribeItems = onSnapshot(itemsRef, (snapshot) => {

      // Update the folders each time an item is changed
      const initialItemsByFolder: ItemsByFolder = {};
      categoryNames.forEach((name) => {
        initialItemsByFolder[name] = [];
     });
      
      // Clone the initial folder structure to avoid mutating shared object
      const itemsByFolder: ItemsByFolder = { ...initialItemsByFolder };

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const category = data.category || "Uncategorized";

        if (!itemsByFolder[category]) {
          itemsByFolder[category] = []; // fallback for categories not in the list
        }

        const newItem = {
          id: doc.id,
          ...data,
        } as Item;

        itemsByFolder[category].push(newItem);
      });

      callback(itemsByFolder);
    });

    // Return combined unsubscribe
    return () => {
      unsubscribeCategories();
      unsubscribeItems();
    };
  });

  // In case only categories are fetched and no items yet
  return () => {
    unsubscribeCategories();
  };
};

// Function to fetch categories from Firestore based on an Organization Id
export const subscribeToCategories = (
  organizationId: string,
  callback: (categories: string[]) => void) => {

  if (!organizationId){
    console.error("subscribeToCategories", "No organizationId provided");
    return () => {};
  }

  const orgRef = doc(db, "organizations", organizationId);
  const categoriesRef = collection(orgRef, "categories");

  const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
    const categoryNames = snapshot.docs.map((doc) => doc.data().name as string);
    callback(categoryNames); // Pass the names to the callback
  });

  return unsubscribe; // Return the unsubscribe function for cleanup
};

// Function to fetch item locations from Firestore based on an Organization Id
export const subscribeToItemLocations = (
  organizationId: string,
  callback: (itemLocations: ItemLocation[]) => void
) => {
  if (!organizationId) {
    console.error("subscribeToItemLocations", "No organizationId provided");
    return () => {};
  }

  const orgRef = doc(db, "organizations", organizationId);
  const itemLocationsRef = collection(orgRef, "itemLocations");

  const unsubscribe = onSnapshot(itemLocationsRef, (snapshot) => {
    //Construct the full item location array
    const itemLocations: ItemLocation[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ItemLocation, "id">), // Type-safe spreading
    }));
    callback(itemLocations); // Pass the full Location objects
  });

  return unsubscribe; // Return the unsubscribe function for cleanup
};


export const getItem = async (organizationId: string, itemID: string): Promise<Item | null> => {
  
  if (!organizationId){
    console.error("getItem", "No organizationId provided");
    return null;
  }

  try {
    const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
    const itemsRef = collection(orgRef, "items"); // subcollection "items" under that doc
  
    const docRef = doc(itemsRef, itemID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const item = {
        id: itemID,
        ...data
      } as Item

      return item
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;

  }
}

export const editItem = async (organizationId: string, oldItem: Item, newItem: Item): Promise<boolean> => {
  if (oldItem.id !== newItem.id) {
    Alert.alert("Invalid Input", "Item IDs must match.");
    return false;
  }

  if (!organizationId){
    console.error("editItem", "No organizationId provided");
    return false;
  }

  const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
  const itemsRef = collection(orgRef, "items"); // subcollection "items" under that doc
  const docID = newItem.id;
  const changes = getChangedFields(oldItem, newItem);

  if (Object.keys(changes).length === 0) {
    Alert.alert("No Changes", "Nothing to update.");
    return false;
  }

  try {
    // Get the reference to the document using its ID
    const itemRef = doc(itemsRef, docID);
    
    // Create a timestamp for the snapshot
    const timestamp = Timestamp.now();

    // Remove the id from the newItem object
    const { id, ...itemFields } = { ...newItem, editedAt: timestamp};

    await updateDoc(itemRef, itemFields);


    // Create the snapshot document in the subcollection
    const snapshotRef = doc(
      collection(db, `organizations/${organizationId}/items/${docID}/snapshots`),
      timestamp.toMillis().toString()
    );

    const changeDescription = generateChangeDescription(oldItem, newItem);

    const historyEntry: ItemHistoryEntry = {
      itemId: docID,
      timestamp,
      changes,
      description: changeDescription,
    };

    await setDoc(snapshotRef, historyEntry);

    return true;
  } catch (error) {
    // Handle any errors that occur during the update
    Alert.alert("Error", "Failed to update item. Please try again.");
    console.error("Error updating item:", error);
    return false;
  }
};

export const addCategory = async (organizationId: string, name: string): Promise<boolean> => {
  if (!organizationId) {
    console.error("addCategory", "No organizationId provided");
    return false;
  }

  const orgRef = doc(db, "organizations", organizationId);
  const categoriesRef = collection(orgRef, "categories");

  // Check for duplicate category name
  const q = query(categoriesRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.warn(`Category "${name}" already exists for organization ${organizationId}`);
    return false;
  }

  try {
    const newCategory = { name };
    await addDoc(categoriesRef, newCategory);
    return true;
  } catch (error) {
    console.error("Error adding category:", error);
    return false;
  }
};

// Add a new item to Firestore
export const addItem = async (organizationId: string, item: Omit<Item, "id">): Promise<boolean> => {
  
  if (!organizationId){
    console.error("addItem", "No organizationId provided");
    return false;
  }

  const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
  const itemsRef = collection(orgRef, "items"); // subcollection "items" under that doc

  try {

    // Create timestamp
    const timestamp = Timestamp.now();

    //Add the timestamp to the new item
    const newItem: Omit<Item, "id"> = {
      ...item,
      createdAt: timestamp,
      editedAt: timestamp,
    }

    // Add the new item and get its reference
    const docRef = await addDoc(itemsRef, newItem);


    const historyEntry: ItemHistoryEntry = {
      itemId: docRef.id,
      timestamp,
      changes: { ...item }, // All fields are technically 'new'
      description: `Created item ${item.name}`,
    };

    const snapshotRef = doc(
      collection(docRef, "snapshots"),
      timestamp.toMillis().toString()
    );

    await setDoc(snapshotRef, historyEntry);

    return true;
  } catch (error) {
    console.error("Error adding item:", error);
    return false;
  }
};

// Add a new itemLocation to Firestore
export const addItemLocation = async (organizationId: string, itemLocation: Omit<ItemLocation, "id">): Promise<boolean> => {
  
  if (!organizationId){
    console.error("addItemLocation", "No organizationId provided");
    return false;
  }

  const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
  const itemLocationsRef = collection(orgRef, "itemLocations"); // subcollection "itemLocation" under that doc
    
  // Check for duplicate location name
    const q = query(itemLocationsRef, where("name", "==", itemLocation.name));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const errorMsg = `Location with name ${itemLocation.name} already exists.`;
      throw new Error(errorMsg);  // Throw an error if duplicate location exists
    }
  try {

    // Add the new item Location and get its reference
    const docRef = await addDoc(itemLocationsRef, itemLocation);

    return true;
  } catch (error) {
    console.error("Error adding item Location:", error);
    return false;
  }
};

export const removeCategory = async (
  organizationId: string,
  categoryName: string
): Promise<{ success: boolean; errorMessage?: string }> => {
  if (!organizationId) {
    const msg = "No organization ID provided.";
    console.error("removeCategory", msg);
    return { success: false, errorMessage: msg };
  }

  try {
    const categoriesRef = collection(db, "organizations", organizationId, "categories");
    const q = query(categoriesRef, where("name", "==", categoryName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const msg = "No item found with the given name.";
      console.warn("removeCategory", msg);
      return { success: false, errorMessage: msg };
    }

    const deletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(docSnapshot.ref)
    );
    await Promise.all(deletePromises);

    return { success: true };
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "permission-denied":
          errorMessage = "You do not have permission to delete this category.";
          break;
        case "unavailable":
          errorMessage = "The service is currently unavailable. Please try again later.";
          break;
        case "not-found":
          errorMessage = "The document was not found.";
          break;
        default:
          errorMessage = error.message;
      }
    }

    console.error("removeCategory error", error);
    return { success: false, errorMessage };
  }
};

// Remove an item from Firestore
export const removeItem = async (
  organizationId: string,
  itemID: string
): Promise<boolean> => {
  if (!organizationId) {
    console.error("removeItem", "No organizationId provided");
    return false;
  }

  try {
    const itemRef = doc(db, "organizations", organizationId, "items", itemID);
    const snapshotsRef = collection(itemRef, "snapshots");

    // Get all snapshot documents
    const snapshots = await getDocs(snapshotsRef);

    // Delete each snapshot
    const deletePromises = snapshots.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Delete the item itself
    await deleteDoc(itemRef);

    return true;
  } catch (error) {
    console.error("Error removing item and its history:", error);
    return false;
  }
};

import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc, onSnapshot, Timestamp, setDoc } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { Alert } from "react-native";
import { Item, ItemsByFolder, ItemHistoryEntry } from "@/types/types";
import { getChangedFields, generateChangeDescription } from "@/services/itemChanges"

// Function to fetch items from Firestore based on an Organization Id and organize them by category
export const subscribeToItems = (
  organizationId: string,
  callback: (itemsByFolder: ItemsByFolder) => void) => {

  if (!organizationId){
    console.error("subscribeToItems", "No organizationId provided");
    return () => {};
  }

  const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
  const itemsRef = collection(orgRef, "items"); // subcollection "items" under that doc

  const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
    const itemsByFolder: ItemsByFolder = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      const category = data.category || "Uncategorized"; // Default category if missing

      //If the category is empty, set its items to an empty array
      if (!itemsByFolder[category]) {
        itemsByFolder[category] = [];
      }

      const newItem = {
        id: doc.id,
        ...data
      } as Item

      itemsByFolder[category].push(newItem);
    });

    callback(itemsByFolder); // Pass the structured data to the callback
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

    // Remove the id from the newItem object
    const { id, ...itemFields } = newItem;

    await updateDoc(itemRef, itemFields);

    // Create a timestamp for the snapshot
    const timestamp = Timestamp.now();

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

// Add a new item to Firestore
export const addItem = async (organizationId: string, item: Omit<Item, "id">): Promise<boolean> => {
  
  if (!organizationId){
    console.error("addItem", "No organizationId provided");
    return false;
  }

  const orgRef = doc(db, "organizations", organizationId); // doc ref to organization
  const itemsRef = collection(orgRef, "items"); // subcollection "items" under that doc

  try {
    // Add the new item and get its reference
    const docRef = await addDoc(itemsRef, item);

    // Create timestamp
    const timestamp = Timestamp.now();

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

// Remove an item from Firestore
export const removeItem = async (itemID: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "items", itemID);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error removing item:", error);
    return false;
  }
};

import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { Alert } from "react-native";
import { Item, ItemsByFolder } from "@/types/types";

// Function to fetch items from Firestore and organize them by category
export const subscribeToItems = (callback: (itemsByFolder: ItemsByFolder) => void) => {
  const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
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

export const getItem = async (itemID: string): Promise<Item | null> => {
  try {
    const docRef = doc(db, "items", itemID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: itemID,
        name: docSnap.data().name,
        category: docSnap.data().category,
        minLevel: docSnap.data().minLevel,
        quantity: docSnap.data().quantity,
        price: docSnap.data().price,
        totalValue: docSnap.data().totalValue
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;

    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;

  }
}

// Fetch items from Firestore and organize them by folder
export const fetchItemsByFolder = async (): Promise<{ folders: string[]; itemsByFolder: ItemsByFolder }> => {
  try {
    const snapshot = await getDocs(collection(db, "items"));

    // Map documents into an array of objects
    const fetchedItems: Item[] = snapshot.docs.map((doc) => ({
      id: doc.id, //Use id of the document as the id of the item
      name: doc.data().name,
      category: doc.data().category,
      minLevel: doc.data().minLevel,
      quantity: doc.data().quantity,
      price: doc.data().price,
      totalValue: doc.data().totalValue
    }));

    // Extract folder names from items (default to "Uncategorized" if category is missing)
    const folders = Array.from(new Set(fetchedItems.map((item) => item.category?.trim() || "Uncategorized")));

    // Group items by category
    const itemsByFolder = fetchedItems.reduce<ItemsByFolder>((acc, item) => {
      const category = item.category?.trim() || "Uncategorized";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);
      return acc;
    }, {});

    return { folders, itemsByFolder };
  } catch (error) {
    console.error("Error fetching data from database", error);
    return { folders: [], itemsByFolder: {} };
  }
};



export const editItem = async (itemID: string, newItem: Item): Promise<boolean> => {
    // Validate item name
    if (!newItem.name.trim()) {
      Alert.alert("Invalid Input", "Item name cannot be empty.");
      return false;
    }

  // Ensure numerical fields are properly converted and validated
  const quantity = newItem.quantity ? parseInt(newItem.quantity.toString(), 10) : 0;
  const minLevel = newItem.minLevel ? parseInt(newItem.minLevel.toString(), 10) : 0;
  const totalValue = newItem.totalValue ? parseInt(newItem.totalValue.toString(), 10) : 0;
  const price = newItem.price ? parseInt(newItem.price.toString(), 10) : 0;

  if (isNaN(quantity) || isNaN(minLevel) || isNaN(price) || isNaN(totalValue)) {
    Alert.alert("Invalid Input", "Quantity, Min Level, and Total Value must be numbers.");
    return false;
  }
  try {

    // Get the reference to the document using its ID
    const itemRef = doc(db, "items", itemID);


    await updateDoc(itemRef, {
      name: newItem.name.trim(),
      category: newItem.category?.trim(),
      quantity, //The key and the value have the same value
      minLevel,
      price,
      totalValue,
    });
        // If the update is successful, return true
        return true;
      } catch (error) {
        // Handle any errors that occur during the update
        Alert.alert("Error", "Failed to update item. Please try again.");
        console.error("Error updating item:", error);
        return false;
      }
}

// Add a new item to Firestore
export const addItem = async (newItem: Item): Promise<boolean> => {
  // Validate item name
  if (!newItem.name.trim()) {
    Alert.alert("Invalid Input", "Item name cannot be empty.");
    return false;
  }

  // Ensure numerical fields are properly converted and validated
  const quantity = newItem.quantity ? parseInt(newItem.quantity.toString(), 10) : 0;
  const minLevel = newItem.minLevel ? parseInt(newItem.minLevel.toString(), 10) : 0;
  const totalValue = newItem.totalValue ? parseInt(newItem.totalValue.toString(), 10) : 0;
  const price = newItem.price ? parseInt(newItem.price.toString(), 10) : 0;

  if (isNaN(quantity) || isNaN(minLevel) || isNaN(price) || isNaN(totalValue)) {
    Alert.alert("Invalid Input", "Quantity, Min Level, and Total Value must be numbers.");
    return false;
  }

  try {
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      category: newItem.category?.trim(),
      quantity, //The key and the value have the same value
      minLevel,
      price,
      totalValue,
    });

    Alert.alert("Success", `${newItem.name} added successfully!`);
    return true;
  } catch (error) {
    console.error("Error adding item:", error);
    Alert.alert("Error", "Failed to add item. Please try again.");
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

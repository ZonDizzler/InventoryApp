import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@firebaseConfig";

// Define the Item type
type Item = {
  id: string;
  name: string;
  category?: string; // Optional category field
  minLevel?: string;
  quantity?: string;
  totalValue?: string;
};

// Define the ItemsByFolder type
export type ItemsByFolder = {
  [folderName: string]: Item[];
};

// Fetch items from Firestore and organize them by folder
export const fetchItemsByFolder = async (): Promise<{ folders: string[]; itemsByFolder: ItemsByFolder }> => {
  try {
    const snapshot = await getDocs(collection(db, "items"));

    // Map documents into an array of objects
    const fetchedItems: Item[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      category: doc.data().category,
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

// Add a new item to Firestore
export const addItem = async (name: string, category: string) => {
  try {
    await addDoc(collection(db, "items"), {
      name,
      category,
    });
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// Remove an item from Firestore
export const removeItem = async (documentID: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "items", documentID);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error removing item:", error);
    return false;
  }
};

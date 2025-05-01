import { ItemLocation } from "@/types/types";
import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc, onSnapshot, Timestamp, setDoc, query, where } from "firebase/firestore";
import { db } from "@firebaseConfig";


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
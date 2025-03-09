import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@firebaseConfig";

export default function Items() {
  // folders is an array of strings where each string represents a folder name.
  const [folders, setFolders] = useState<string[]>([]);

  // Define the type for items, which is an object where each key is a folder name
  // and the value is an array of strings representing the items in that folder.
  type ItemsType = {
    [folderName: string]: string[];
  };

  // items is an object that stores items in each folder.
  // the initial value is an empty object, representing folders and no objects
  const [items, setItems] = useState<ItemsType>({});

  // newItem is a string that represents the name of the new item the user wants to add.
  const [newItem, setNewItem] = useState<string>("");

  // newFolder is a string that represents the name of the new folder the user wants to create.
  const [newFolder, setNewFolder] = useState<string>("");

  // selectedFolder stores the name of the currently selected folder.
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // modalVisible controls the visibility of the modal for adding new folders or items.
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // isAddingFolder is a boolean that helps toggle between adding a folder or adding an item.
  const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);

  // addFolder is called when the user adds a new folder.
  const addFolder = () => {
    if (newFolder.trim()) {
      // Add the new folder name to the folders array.
      setFolders([...folders, newFolder]);

      // Create a new entry in the items object for the new folder with an empty array.
      setItems({ ...items, [newFolder]: [] });

      // Clear the newFolder input field.
      setNewFolder("");

      // Close the modal after adding the folder.
      setModalVisible(false);
    }
  };

  // addItem is called when the user adds a new item to the selected folder.
  const addItem = async () => {
    try {
      if (newItem.trim() && selectedFolder) {
        await addDoc(collection(db, "items"), {
          name: newItem,
          category: selectedFolder,
        });

        // Read the updated items from the database
        fetchData();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    // Clear the newItem input field.
    setNewItem("");

    // Close the modal
    setModalVisible(false);
  };

  async function fetchData() {
    try {
      const snapshot = await getDocs(collection(db, "items"));

      // Map the documents into an array of objects
      const fetchedItems = snapshot.docs.map((doc) => doc.data());

      // Extract folder names (categories) from the fetched items
      const foldersFromData = Array.from(
        new Set(fetchedItems.map((item) => item.category))
      );

      // Create an items object, grouping items by category
      const itemsFromData = fetchedItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item.name); // Add item name to the corresponding category
        return acc;
      }, {});

      // Set the state for folders and items
      setFolders(foldersFromData); // Set folders
      setItems(itemsFromData); // Set items
    } catch (error) {
      console.error("Error fetching data from database", error);
    }
  }

  //Fetch data from database when component is initially rendered
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl font-bold mb-4`}>Items</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="qr-code-outline" size={24} color="#00bcd4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter-outline" size={24} color="#00bcd4" />
        </TouchableOpacity>
      </View>

      {folders.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#00bcd4" />
          <Text style={tw`text-lg mt-4`}>
            Your Inventory is Currently Empty
          </Text>
          <Text>Add new items or</Text>
          <TouchableOpacity style={styles.importButton}>
            <Text style={tw`text-blue-500`}>Import from File</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={folders}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View
            style={[
              styles.folder,
              selectedFolder === item && styles.selectedFolder, // Apply different style when folder is selected
            ]}
          >
            <TouchableOpacity onPress={() => setSelectedFolder(item)}>
              <Text
                style={[
                  tw`text-lg font-bold`,
                  selectedFolder === item && tw`text-cyan-500`, // Change text color when selected
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
            {selectedFolder === item && (
              <FlatList
                data={items[item]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text>{item}</Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsAddingFolder(false);
          setModalVisible(!modalVisible);
        }}
      >
        <Ionicons
          name={modalVisible ? "close" : "add"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {modalVisible && (
        <View style={styles.modalContainer}>
          {isAddingFolder ? (
            <>
              <TextInput
                placeholder="Enter folder name"
                value={newFolder}
                onChangeText={setNewFolder}
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
              />
              <TouchableOpacity style={styles.addButton} onPress={addFolder}>
                <Text style={tw`text-white`}>Add Folder</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter item name"
                value={newItem}
                onChangeText={setNewItem}
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
              />
              <TouchableOpacity style={styles.addButton} onPress={addItem}>
                <Text style={tw`text-white`}>Add Item</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsAddingFolder(!isAddingFolder)}
          >
            <Text style={tw`text-blue-500`}>
              {isAddingFolder ? "Switch to Add Item" : "Switch to Add Folder"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },
  iconButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  importButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0f7fa",
  },
  folder: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedFolder: {
    backgroundColor: "#e0f7fa",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#00bcd4",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#00bcd4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  switchButton: {
    marginTop: 10,
    alignItems: "center",
  },
});

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
import { useTheme } from "../context/DarkModeContext"; 

export default function Items() {
  const [folders, setFolders] = useState<string[]>([]);

  type ItemsType = {
    [folderName: string]: string[];
  };

  const [items, setItems] = useState<ItemsType>({});
  const [newItem, setNewItem] = useState<string>("");
  const { darkMode } = useTheme();

  const containerStyle = darkMode ? styles.containerDark : styles.containerLight;
  const textStyle = darkMode ? tw`text-white` : tw`text-gray-700`;

  const [newFolder, setNewFolder] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);

  const addFolder = () => {
    if (newFolder.trim()) {
      setFolders([...folders, newFolder]);
      setItems({ ...items, [newFolder]: [] });
      setNewFolder("");
      setModalVisible(false);
    }
  };

  const addItem = async () => {
    try {
      if (newItem.trim() && selectedFolder) {
        await addDoc(collection(db, "items"), {
          name: newItem,
          category: selectedFolder,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNewItem("");
    setModalVisible(false);
  };

  async function fetchData() {
    try {
      const snapshot = await getDocs(collection(db, "items"));
      const fetchedItems = snapshot.docs.map((doc) => doc.data());
      const foldersFromData = Array.from(
        new Set(fetchedItems.map((item) => item.category))
      );

      const itemsFromData = fetchedItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item.name);
        return acc;
      }, {});

      setFolders(foldersFromData);
      setItems(itemsFromData);
    } catch (error) {
      console.error("Error fetching data from database", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={containerStyle}>
      <Text style={[tw`text-xl font-bold mb-4`, textStyle]}>Items</Text>

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
    <Text
      style={[
        tw`text-lg mt-4`,
        darkMode && tw`text-white`, 
      ]}
    >
      Your Inventory is Currently Empty
    </Text>
    <Text
      style={[
        darkMode && tw`text-white`, 
      ]}
    >
      Add new items or
    </Text>
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
              selectedFolder === item && styles.selectedFolder,
              darkMode && styles.folderDark, 
            ]}
          >
            <TouchableOpacity onPress={() => setSelectedFolder(item)}>
              <Text
                style={[
                  tw`text-lg font-bold`,
                  selectedFolder === item && tw`text-cyan-500`,
                  darkMode && tw`text-white`, 
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
                  <View style={[styles.item, darkMode && styles.itemDark]}>
                    <Text style={textStyle}>{item}</Text>
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
  containerLight: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#121212", 
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
  folderDark: {
    backgroundColor: "#333", 
  },
  selectedFolder: {
    backgroundColor: "#00695c", 
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  itemDark: {
    backgroundColor: "#444", 
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

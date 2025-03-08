import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

export default function Items() {
  const [folders, setFolders] = useState([]);
  const [items, setItems] = useState({});
  const [newItem, setNewItem] = useState('');
  const [newFolder, setNewFolder] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const addFolder = () => {
    if (newFolder.trim()) {
      setFolders([...folders, newFolder]);
      setItems({ ...items, [newFolder]: [] });
      setNewFolder('');
      setModalVisible(false);
    }
  };

  const addItem = () => {
    if (newItem.trim() && selectedFolder) {
      setItems({
        ...items,
        [selectedFolder]: [...items[selectedFolder], newItem],
      });
      setNewItem('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl font-bold mb-4`}>Items</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
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
          <Text style={tw`text-lg mt-4`}>Your Inventory is Currently Empty</Text>
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
          <View style={styles.folder}>
            <TouchableOpacity onPress={() => setSelectedFolder(item)}>
              <Text style={tw`text-lg font-bold`}>{item}</Text>
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
        <Ionicons name={modalVisible ? "close" : "add"} size={24} color="white" />
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
              {isAddingFolder ? 'Switch to Add Item' : 'Switch to Add Folder'}
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  importButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0f7fa',
  },
  folder: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00bcd4',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  addButton: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  switchButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});

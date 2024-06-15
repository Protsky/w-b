import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://master-nu-red.vercel.app/api'; // Replace with your Vercel Functions URL

const SettingsScreen = () => {
  const [gliders, setGliders] = useState([]);
  const [newGliderName, setNewGliderName] = useState('');
  const [newGliderEmptyWeight, setNewGliderEmptyWeight] = useState('');
  const [newGliderAftLimit, setNewGliderAftLimit] = useState('');
  const [newGliderForwardLimit, setNewGliderForwardLimit] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading state

  const fetchGliders = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await axios.get(`${API_BASE_URL}/fetchGliders`);
      setGliders(response.data);
      console.log('Fetched gliders:', "Response" + response.data); // Log the fetched data
    } catch (error) {
      console.error('Error fetching gliders:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes (success or error)
    }
  };

  const addNewGlider = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/createGlider`, {
        name: newGliderName,
        emptyWeight: newGliderEmptyWeight,
        aftLimit: newGliderAftLimit,
        forwardLimit: newGliderForwardLimit,
      });
      console.log('Created new glider:', response.data);
      fetchGliders(); // Refresh the list after adding
      setNewGliderName('');
      setNewGliderEmptyWeight('');
      setNewGliderAftLimit('');
      setNewGliderForwardLimit('');
    } catch (error) {
      console.error('Error creating glider:', error);
    }
  };

  useEffect(() => {
    fetchGliders();
  }, []);

  // Render loading state if data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render when data is fetched
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Glider</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newGliderName}
        onChangeText={setNewGliderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Empty Weight"
        value={newGliderEmptyWeight}
        onChangeText={setNewGliderEmptyWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Aft Limit"
        value={newGliderAftLimit}
        onChangeText={setNewGliderAftLimit}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Forward Limit"
        value={newGliderForwardLimit}
        onChangeText={setNewGliderForwardLimit}
        keyboardType="numeric"
      />
      <Button title="Add Glider" onPress={addNewGlider} />
      
      <Button title="Fetch Gliders" onPress={fetchGliders} /> {/* Button to force fetch gliders */}
      
      <Text style={[styles.header, { marginTop: 20 }]}>List of Gliders</Text>
      {gliders.length === 0 ? ( // Check if gliders array is empty
        <View style={styles.emptyContainer}>
          <Text>No gliders found</Text>
        </View>
      ) : (
        <FlatList
          data={gliders}
          keyExtractor={(item) => item?.id?.toString()} // Ensure item and item.id are not undefined/null
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Text>Empty Weight: {item.emptyWeight}</Text>
              <Text>Aft Limit: {item.aftLimit}</Text>
              <Text>Forward Limit: {item.forwardLimit}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default SettingsScreen;

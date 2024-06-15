import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'; // Import Axios for HTTP requests

const SERVER_URL = 'https://your-vercel-app.vercel.app/api/getGlider'; // Replace with your actual Vercel Function URL

const SettingsScreen = () => {
  const [gliders, setGliders] = useState([]);

  // Function to fetch gliders from the Vercel Function endpoint
  const fetchGliders = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setGliders(response.data);
    } catch (error) {
      console.error('Error fetching gliders:', error);
    }
  };

  // Load initial list of gliders when component mounts
  useEffect(() => {
    fetchGliders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Gliders</Text>
      <FlatList
        data={gliders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Empty Weight: {item.emptyWeight}</Text>
            <Text>Aft Limit: {item.aftLimit}</Text>
            <Text>Forward Limit: {item.forwardLimit}</Text>
          </View>
        )}
      />
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
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SettingsScreen;

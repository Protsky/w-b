import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios"; // Import Axios for HTTP requests

const SERVER_URL = "https://master-nu-red.vercel.app/api/getGlider"; // Replace with your actual Vercel Function URL

const SettingsScreen = () => {
  const [gliders, setGliders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  // Function to fetch gliders from the Vercel Function endpoint
  const fetchGliders = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setGliders(response.data);
    } catch (error) {
      console.error("Error fetching gliders:", error);
    } finally {
      setIsLoading(false); // Update loading state after fetching data
    }
  };

  // Load initial list of gliders when component mounts
  useEffect(() => {
    fetchGliders();
  }, []);

  // Render message when gliders array is empty
  const renderEmptyListMessage = () => (
    <View style={styles.container}>
      <Text style={styles.header}>No Gliders Available</Text>
      <Text style={styles.subtext}>There are no gliders to display.</Text>
    </View>
  );
  

  // Render individual glider item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>Empty Weight: {item.emptyWeight}</Text>
      <Text>Aft Limit: {item.aftLimit}</Text>
      <Text>Forward Limit: {item.forwardLimit}</Text>
    </View>
  );

  // Show loading indicator while fetching data
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render content based on gliders array
  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Gliders</Text>
      {gliders.length === 0 ? (
        renderEmptyListMessage()
      ) : (
        <FlatList
          data={gliders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default SettingsScreen;

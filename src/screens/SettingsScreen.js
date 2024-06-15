import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddGliderScreen = () => {
  const [name, setName] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [aftLimit, setAftLimit] = useState('');
  const [forwardLimit, setForwardLimit] = useState('');

  const handleAddGlider = async () => {
    try {
      // Perform validation if needed

      // Assuming you have a backend API endpoint to handle Prisma operations
      const response = await fetch('https://master-nu-red.vercel.app/api/addglider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          emptyWeight: parseFloat(emptyWeight),
          aftLimit: parseFloat(aftLimit),
          forwardLimit: parseFloat(forwardLimit),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add glider');
      }

      // Handle success scenario (e.g., show success message, navigate back, etc.)
      console.log('Glider added successfully!');
    } catch (error) {
      console.error('Error adding glider:', error);
      // Handle error scenario (e.g., show error message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Glider</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Empty Weight"
        value={emptyWeight}
        onChangeText={setEmptyWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Aft Limit"
        value={aftLimit}
        onChangeText={setAftLimit}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Forward Limit"
        value={forwardLimit}
        onChangeText={setForwardLimit}
        keyboardType="numeric"
      />
      <Button title="Add Glider" onPress={handleAddGlider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddGliderScreen;

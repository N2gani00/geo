import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddLocation = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const saveLocation = async () => {
    if (!name.trim() || !rating) {
      Alert.alert("Error", "Please enter a location name and rating.");
      return;
    }

    const newLocation = { 
      name, 
      description: description || "No description provided", 
      rating: Number(rating) 
    };

    try {
      const storedLocations = await AsyncStorage.getItem('locations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
      locations.push(newLocation);
      await AsyncStorage.setItem('locations', JSON.stringify(locations));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter location name" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Enter description" />

      <Text style={styles.label}>Rating (1-5)</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => setRating(star)}
            style={[styles.star, rating >= star && styles.selectedStar]}>
            <Text style={styles.starText}>{star}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Location" onPress={saveLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 5 },
  ratingContainer: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' },
  star: { padding: 10, borderRadius: 5 },
  selectedStar: { backgroundColor: 'gold' },
  starText: { fontSize: 20, color: 'black' },
});

export default AddLocation;

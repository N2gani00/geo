import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get locations from AsyncStorage
export const getLocations = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('locations');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading locations:", e);
    return [];
  }
};

// Function to save a new location
export const saveLocation = async (newLocation) => {
  try {
    const locations = await getLocations(); // Get existing locations
    locations.push(newLocation); // Add new location
    await AsyncStorage.setItem('locations', JSON.stringify(locations));
  } catch (e) {
    console.error("Error saving location:", e);
  }
};

// Function to clear all locations
export const clearLocations = async () => {
  try {
    await AsyncStorage.removeItem('locations');
  } catch (e) {
    console.error("Error clearing locations:", e);
  }
};

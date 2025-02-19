import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a new location
export const saveLocation = async (location) => {
  try {
    const storedLocations = await AsyncStorage.getItem('@saved_locations');
    const locations = storedLocations ? JSON.parse(storedLocations) : [];
    locations.push(location);
    await AsyncStorage.setItem('@saved_locations', JSON.stringify(locations));
    console.log('Location saved!');
  } catch (e) {
    console.error('Failed to save location:', e);
  }
};

// Get all saved locations
export const getLocations = async () => {
  try {
    const storedLocations = await AsyncStorage.getItem('@saved_locations');
    return storedLocations ? JSON.parse(storedLocations) : [];
  } catch (e) {
    console.error('Failed to fetch locations:', e);
    return [];
  }
};

// Remove all locations
export const clearLocations = async () => {
  try {
    await AsyncStorage.removeItem('@saved_locations');
    console.log('All locations cleared!');
  } catch (e) {
    console.error('Failed to clear locations:', e);
  }
};

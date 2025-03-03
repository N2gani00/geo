import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Load saved markers and user location when the screen opens
  useEffect(() => {
    if (Platform.OS === 'web') return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Load saved markers
      const storedMarkers = await AsyncStorage.getItem('markers');
      if (storedMarkers) {
        setMarkers(JSON.parse(storedMarkers));
      }
    })();
  }, []);

  
  const addMarker = async (event) => {
    const newMarker = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      title: `Marker ${markers.length + 1}`, // Placeholder name
    };

    const updatedMarkers = [...markers, newMarker];

    setMarkers(updatedMarkers);
    await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
  };

  // Function to clear all markers
  const clearMarkers = async () => {
    await AsyncStorage.removeItem('markers');
    setMarkers([]);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          🌍 Map is not available on web. Please use the mobile app.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region && (
        <>
          <MapView style={styles.map} initialRegion={region} onPress={addMarker}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.title}
              />
            ))}
          </MapView>
          {markers.length > 0 && (
            <Button title="Clear Markers" onPress={clearMarkers}/>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', padding: 20 },
  map: { width: '100%', height: '90%' },
});

export default MapScreen;

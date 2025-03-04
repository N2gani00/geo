import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as geocoding from 'expo-location'; // Geocode the name

const MapScreen = ({ route }) => {
  const { locationName } = route.params || {};

  const [region, setRegion] = useState({
    latitude: 60.1699, // Default to Helsinki
    longitude: 24.9384,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (locationName) {
      (async () => {
        try {
          let geoResults = await geocoding.geocodeAsync(locationName);
          if (geoResults.length > 0) {
            const { latitude, longitude } = geoResults[0];
            setRegion({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 });
          } else {
            Alert.alert("Location Not Found", "Unable to find coordinates for this location.");
          }
        } catch (error) {
          console.error("Geocoding Error:", error);
        }
      })();
    }
  }, [locationName]);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} region={region}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title={locationName} />
      </MapView>
    </View>
  );
};

export default MapScreen;

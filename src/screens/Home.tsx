import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function Home() {
  const [region, setRegion] = useState<Region>();

  function getInitialState() {
    Geolocation.getCurrentPosition(info => {
      const {latitude, longitude} = info.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  }

  function onRegionChange(value: Region) {
    // setRegion(value);
  }

  useEffect(() => {
    getInitialState();
  }, []);

  return (
    <MapView
      region={region}
      onRegionChange={onRegionChange}
      style={styles.map}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

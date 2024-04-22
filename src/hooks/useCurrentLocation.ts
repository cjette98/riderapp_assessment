import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {Region} from 'react-native-maps';

export function useCurrentLocation() {
  const [initialLocation, setInitialLocation] = useState<Region | undefined>();

  function getInitialState() {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setInitialLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        });
      },
      e => {
        console.log('getCurrentPosition e:', e);
      },
      {enableHighAccuracy: true},
    );
  }

  return {initialLocation, setInitialLocation, getInitialState};
}

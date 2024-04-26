import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {Platform} from 'react-native';
import {Region} from 'react-native-maps';

const MANILA_LAT = 14.599512;
const MANILA_LNG = 120.984222;

export function useCurrentLocation() {
  const [initialLocation, setInitialLocation] = useState<Region | undefined>();

  function getInitialState() {
    if (Platform.OS === 'ios') {
      setInitialLocation({
        latitude: MANILA_LAT,
        longitude: MANILA_LNG,
        latitudeDelta: 0.0053,
        longitudeDelta: 0.0054,
      });
    } else {
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
  }

  return {initialLocation, setInitialLocation, getInitialState};
}

import Geolocation from '@react-native-community/geolocation';
import {useEffect} from 'react';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export function usePermissions() {
  function locationPermission() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.DENIED:
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          break;
        case RESULTS.GRANTED:
          break;
      }
    });
  }

  function geolocationPermission() {
    Geolocation.requestAuthorization(
      () => {},
      e => {
        console.log('geolocationPermission:', e);
      },
    );
  }

  useEffect(() => {
    locationPermission();
    // geolocationPermission();
  }, []);

  return {};
}

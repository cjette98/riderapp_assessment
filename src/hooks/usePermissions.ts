import {useEffect} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export function usePermissions() {
  function androidLocationPermission() {
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

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidLocationPermission();
    }
  }, []);

  return {};
}

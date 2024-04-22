import React, {ReactNode} from 'react';
import {createRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RNMapView, {Marker} from 'react-native-maps';
import {ReCenterMap} from './ReCenterMap';
import Icon from 'react-native-vector-icons/Entypo';
import {useCurrentLocation} from '../hooks/useCurrentLocation';

interface Props {
  children: ReactNode;
}

export function MapView({children}: Props) {
  const mapRef = createRef<RNMapView>();
  const {initialLocation, getInitialState} = useCurrentLocation();

  function onReCenterMap() {
    if (initialLocation) {
      mapRef.current?.animateCamera({
        center: {
          latitude: initialLocation?.latitude,
          longitude: initialLocation?.longitude,
        },
      });
    }
  }

  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RNMapView
        ref={mapRef}
        initialRegion={initialLocation}
        region={initialLocation}
        loadingEnabled
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: initialLocation?.latitude || 0,
            longitude: initialLocation?.longitude || 0,
          }}>
          <Icon name="pin" size={40} color="black" />
        </Marker>
        {children}
      </RNMapView>
      <ReCenterMap onReCenterMap={onReCenterMap} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import React, {useEffect, useMemo} from 'react';
import {MapView} from '../components/MapView';
import {Marker} from 'react-native-maps';
import MockRideRequests from '../mocks/RideRequests.json';
import {RideRequest} from '../types/booking';
import {useCurrentLocation} from '../hooks/useCurrentLocation';
import {randomizeCoordinateByRadius} from '../helpers/locationHelpers';
import Icon from 'react-native-vector-icons/Entypo';

const PickupRadius = 0.15;
const DropOffRadius = 0.3;

export default function Home() {
  const {initialLocation, getInitialState} = useCurrentLocation();

  const rideRequests = useMemo(() => {
    if (initialLocation) {
      const requests = MockRideRequests.map((item: RideRequest) => {
        item.pickup.lat = randomizeCoordinateByRadius(
          initialLocation?.latitude || 0,
          PickupRadius,
        );
        item.pickup.lng = randomizeCoordinateByRadius(
          initialLocation?.longitude || 0,
          PickupRadius,
        );
        item.dropoff.lat = randomizeCoordinateByRadius(
          initialLocation?.latitude || 0,
          DropOffRadius,
        );
        item.dropoff.lng = randomizeCoordinateByRadius(
          initialLocation?.longitude || 0,
          DropOffRadius,
        );

        return item;
      });

      return requests;
    }
    return [];
  }, [initialLocation]);

  function onPressRequest(item: RideRequest) {
    console.log('item:', item);
  }

  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapView>
      {rideRequests.map((item, index) => {
        return (
          <Marker
            key={`${item.ride_id}`}
            coordinate={{
              latitude: item.pickup.lat,
              longitude: item.pickup.lng,
            }}
            zIndex={index}
            tappable
            onPress={() => onPressRequest(item)}>
            <Icon name="location-pin" size={34} color="red" />
          </Marker>
        );
      })}
    </MapView>
  );
}

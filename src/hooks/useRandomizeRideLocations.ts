import {useMemo} from 'react';
import {Region} from 'react-native-maps';
import {RideRequest} from '../types/booking';
import MockRideRequests from '../mocks/RideRequests.json';
import {randomizeCoordinateByRadius} from '../helpers/locationHelpers';

const PickupRadius = 0.01;
const DropOffRadius = 0.3;

export function useRandomizeRideLocations(initialLocation: Region | undefined) {
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

  return {rideRequests};
}

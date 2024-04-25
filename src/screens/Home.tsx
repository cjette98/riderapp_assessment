import React, {useEffect, useState} from 'react';
import {MapView} from '../components/MapView';
import {Marker} from 'react-native-maps';
import MockRideRequests from '../mocks/RideRequests.json';
import {ReverseGeoCodeResponse, RideRequest} from '../types/booking';
import {useCurrentLocation} from '../hooks/useCurrentLocation';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectedRideModal} from '../components/SelectedRideModal';
import {useBookingMutations} from '../services/mutations/booking';
import {useRandomizeRideLocations} from '../hooks/useRandomizeRideLocations';

export default function Home() {
  const {initialLocation, getInitialState} = useCurrentLocation();
  const {rideRequests} = useRandomizeRideLocations(initialLocation);
  const {onGetGeocodeName} = useBookingMutations();
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<RideRequest>(MockRideRequests[0]);

  async function onPressRequest(item: RideRequest) {
    const pickUpPayload = {
      latlng: `${item.pickup.lat},${item.pickup.lng}`,
    };
    const dropOffPayload = {
      latlng: `${item.dropoff.lat},${item.dropoff.lng}`,
    };

    const pickup = (await onGetGeocodeName.mutateAsync(
      pickUpPayload,
    )) as ReverseGeoCodeResponse;
    const dropoff = (await onGetGeocodeName.mutateAsync(
      dropOffPayload,
    )) as ReverseGeoCodeResponse;

    const mapItem = {
      ...item,
      pickup: {...item.pickup, name: pickup.results[0]?.formatted_address},
      dropoff: {...item.dropoff, name: dropoff.results[0]?.formatted_address},
    };
    setSelected(mapItem);
    setShowSelected(true);
  }

  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
      <SelectedRideModal
        visible={showSelected}
        setVisible={setShowSelected}
        {...selected}
      />
    </>
  );
}

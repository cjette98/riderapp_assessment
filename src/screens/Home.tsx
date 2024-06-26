import React, {useCallback, useEffect, useState} from 'react';
import {MapView} from '../components/MapView';
import {Marker} from 'react-native-maps';
import MockRideRequests from '../mocks/RideRequests.json';
import {ReverseGeoCodeResponse, RideRequest} from '../types/booking';
import {useCurrentLocation} from '../hooks/useCurrentLocation';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectedRideModal} from '../components/SelectedRideModal';
import {useBookingMutations} from '../services/mutations/booking';
import {useRandomizeRideLocations} from '../hooks/useRandomizeRideLocations';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSavedRideRequests,
  setSelectedRideRequest,
} from '../redux/booking.slice';
import {Alert} from 'react-native';
import {RootState} from '../../store';
import {useNavigation} from '@react-navigation/native';

const RequestOngoing: string[] = ['dropped-off', 'declined'];
const RequestAccepted: string[] = ['accepted', 'started', 'picked-up'];

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {initialLocation, getInitialState} = useCurrentLocation();
  const {rideRequests} = useRandomizeRideLocations(initialLocation);
  const {onGetGeocodeName} = useBookingMutations();
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<RideRequest>(MockRideRequests[0]);

  const {savedRideRequests} = useSelector((state: RootState) => state.booking);

  const onPressRequest = useCallback(
    async (item: RideRequest) => {
      const savedItem = savedRideRequests.find(
        saved => saved.ride_id === item.ride_id,
      );
      const itemValue = savedItem?.ride_id === item.ride_id ? savedItem : item;
      const isRequestDone = savedItem?.status === 'dropped-off';
      const hasOngoingRequest = savedRideRequests.some(
        saved =>
          RequestAccepted.includes(saved?.status || '') &&
          saved.ride_id !== item.ride_id,
      );
      const isRequestDeclined = savedItem?.status === 'declined';
      const isRequestOngoing =
        savedItem?.ride_id && !RequestOngoing.includes(itemValue?.status || '');

      const pickUpPayload = {
        latlng: `${itemValue.pickup.lat},${itemValue.pickup.lng}`,
      };
      const dropOffPayload = {
        latlng: `${itemValue.dropoff.lat},${itemValue.dropoff.lng}`,
      };

      try {
        const pickup = (await onGetGeocodeName.mutateAsync(
          pickUpPayload,
        )) as ReverseGeoCodeResponse;
        const dropoff = (await onGetGeocodeName.mutateAsync(
          dropOffPayload,
        )) as ReverseGeoCodeResponse;

        const mappedItem = {
          ...itemValue,
          pickup: {
            ...itemValue.pickup,
            name: pickup.results[0]?.formatted_address || 'Invalid Pick up',
          },
          dropoff: {
            ...itemValue.dropoff,
            name: dropoff.results[0]?.formatted_address || 'Invalid Drop off',
          },
        };

        if (savedItem && isRequestDeclined) {
          Alert.alert(
            'Ride Request is Declined',
            'Please select another request',
          );
        } else if (hasOngoingRequest) {
          Alert.alert(
            'You have an ongoing request',
            'Please finish the request first before accepting another request',
          );
        } else if (savedItem && isRequestDone) {
          Alert.alert('Ride Request is Done', 'Please select another request');
        } else {
          setSelected(mappedItem);
          if (isRequestOngoing) {
            navigation.navigate('Request' as never);
          } else {
            setShowSelected(true);
            dispatch(setSelectedRideRequest(mappedItem));
            dispatch(setSavedRideRequests([...savedRideRequests, mappedItem]));
          }
        }
      } catch (error) {
        Alert.alert('Something went wrong', 'Please try again');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [savedRideRequests],
  );

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

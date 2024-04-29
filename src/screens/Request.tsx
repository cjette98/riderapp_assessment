import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Spacer} from '../components/Spacer';
import {useRideContents} from '../hooks/useRideContents';
import {
  selectedRideRequestInitState,
  setSavedRideRequests,
  setSelectedRideRequest,
} from '../redux/booking.slice';
import {useNavigation} from '@react-navigation/native';
import {RideStatus} from '../types/booking';

const DECLINED_EXCLUDED_STATUS = ['declined', 'picked-up', 'dropped-off'];

export function Request() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selectedRideRequest, savedRideRequests} = useSelector(
    (state: RootState) => state.booking,
  );
  const {
    passenger_name,
    ride_distance_miles,
    ride_duration_minutes,
    fare_amount,
    pickup,
    dropoff,
  } = selectedRideRequest;
  const {getKeyValue, getItemValue} = useRideContents(
    ride_distance_miles,
    ride_duration_minutes,
    fare_amount,
  );

  const filterSavedRequests = savedRideRequests.filter(
    saved => saved.ride_id !== selectedRideRequest.ride_id,
  );
  const savedItem =
    savedRideRequests.find(
      saved => saved.ride_id === selectedRideRequest.ride_id,
    ) || selectedRideRequestInitState;

  const statusText = useMemo(() => {
    switch (savedItem?.status) {
      case 'pending':
        return 'Accept';
      case 'accepted':
        return 'Start';
      case 'started':
        return 'Pick Up';
      case 'picked-up':
        return 'Drop Off';
      default:
        return 'Done';
    }
  }, [savedItem?.status]);

  const changedStatus = useMemo(() => {
    switch (savedItem?.status) {
      case 'pending':
        return 'accepted';
      case 'accepted':
        return 'started';
      case 'started':
        return 'picked-up';
      case 'picked-up':
        return 'dropped-off';
      case 'dropped-off':
        return 'dropped-off';
      default:
        return 'declined';
    }
  }, [savedItem?.status]);

  const onSaveStatus = useCallback(
    (toChangeStatus: RideStatus) => {
      const toSaveRequests = [
        ...filterSavedRequests,
        {...savedItem, status: toChangeStatus},
      ];
      dispatch(setSavedRideRequests(toSaveRequests));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onPressAction = useCallback(() => {
    if (changedStatus === 'dropped-off') {
      navigation.goBack();
    }
    onSaveStatus(changedStatus);
    dispatch(
      setSelectedRideRequest({...selectedRideRequest, status: changedStatus}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedStatus]);

  const onPressDecline = () => {
    onSaveStatus('declined');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.rowContainer}>
          <Text style={{marginRight: 40}}>name: </Text>
          <Text style={[styles.blackText, styles.headerText]}>
            {passenger_name}
          </Text>
        </View>
        <Spacer size={12} />

        {Array.from({length: 3}).map((_, index) => (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={{flex: 1}}>{`${getKeyValue(index)}: `}</Text>
              <Text style={[styles.blackText, styles.mediumText, {flex: 3}]}>
                {getItemValue(index)}
              </Text>
            </View>
            <Spacer size={4} />
          </View>
        ))}

        <Spacer size={8} />
        <View style={styles.rowContainer}>
          <Text style={{flex: 1}}>Pick up: </Text>
          <Text style={[styles.blackText, styles.mediumText, {flex: 3}]}>
            {pickup?.name}
          </Text>
        </View>
        <Spacer size={12} />
        <View style={styles.rowContainer}>
          <Text style={{flex: 1}}>Drop off: </Text>
          <Text style={[styles.blackText, styles.mediumText, {flex: 3}]}>
            {dropoff?.name}
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonAccept]}
          onPress={onPressAction}>
          <Text style={[styles.mediumText, styles.whiteText]}>
            {statusText}
          </Text>
        </TouchableOpacity>
        {!DECLINED_EXCLUDED_STATUS.includes(savedItem?.status || '') && (
          <TouchableOpacity
            style={[styles.button, styles.buttonDecline]}
            onPress={onPressDecline}>
            <Text style={styles.blackText}>Decline</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 12,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  buttonDecline: {
    borderWidth: 1,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  mediumText: {
    fontWeight: '600',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

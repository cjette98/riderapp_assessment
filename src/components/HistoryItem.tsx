import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {RideRequest} from '../types/booking';
import {useRideContents} from '../hooks/useRideContents';
import {Text} from 'react-native';
import {Spacer} from './Spacer';
import {useDispatch} from 'react-redux';
import {setSelectedRideRequest} from '../redux/booking.slice';
import {useNavigation} from '@react-navigation/native';

interface Props extends ViewProps {
  item: RideRequest;
  isCurrent?: boolean;
}

export function HistoryItem({item, isCurrent, ...props}: Props) {
  const {
    passenger_name,
    ride_distance_miles,
    ride_duration_minutes,
    fare_amount,
    pickup,
    dropoff,
    status,
  } = item;
  const {getKeyValue, getItemValue} = useRideContents(
    ride_distance_miles,
    ride_duration_minutes,
    fare_amount,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressItem = useCallback(() => {
    dispatch(setSelectedRideRequest(item));
    navigation.navigate('Request' as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity style={styles.container} {...props} onPress={onPressItem}>
      <View style={{flex: 1}}>
        <View style={styles.rowContainer}>
          <Text style={[{marginRight: 40}, styles.whiteText]}>name: </Text>
          <Text style={[styles.whiteText, styles.headerText]}>
            {passenger_name}
          </Text>
        </View>
        <Spacer size={12} />

        {!isCurrent &&
          Array.from({length: 3}).map((_, index) => (
            <View key={index}>
              <View style={styles.rowContainer}>
                <Text style={[{flex: 1}, styles.whiteText]}>{`${getKeyValue(
                  index,
                )}: `}</Text>
                <Text style={[styles.whiteText, styles.mediumText, {flex: 3}]}>
                  {getItemValue(index)}
                </Text>
              </View>
              <Spacer size={4} />
            </View>
          ))}

        <Spacer size={8} />
        <View style={styles.rowContainer}>
          <Text style={[{flex: 1}, styles.whiteText]}>Pick up: </Text>
          <Text style={[styles.whiteText, styles.mediumText, {flex: 3}]}>
            {pickup?.name}
          </Text>
        </View>
        <Spacer size={12} />
        <View style={styles.rowContainer}>
          <Text style={[{flex: 1}, styles.whiteText]}>Drop off: </Text>
          <Text style={[styles.whiteText, styles.mediumText, {flex: 3}]}>
            {dropoff?.name}
          </Text>
        </View>
        <Spacer size={12} />
        <View style={styles.rowContainer}>
          <Text style={[{flex: 1}, styles.whiteText]}>Status: </Text>
          <Text style={[styles.whiteText, styles.mediumText, {flex: 3}]}>
            {`${status?.charAt(0).toUpperCase()}${status?.substring(
              1,
              status?.length || 1,
            )}` || 'Pending'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'blue',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

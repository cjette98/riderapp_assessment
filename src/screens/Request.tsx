import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {StyleSheet, Text, View} from 'react-native';
import {Spacer} from '../components/Spacer';
import {useRideContents} from '../hooks/useRideContents';

export function Request() {
  const {selectedRideRequest} = useSelector(
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

  return (
    <View style={styles.container}>
      <Spacer size={12} />
      <Text>
        <Text>name: </Text>
        <Text style={[styles.blackText, styles.headerText]}>
          {passenger_name}
        </Text>
      </Text>
      <Spacer size={12} />

      {Array.from({length: 3}).map((_, index) => (
        <View key={index}>
          <Text>
            <Text>{getKeyValue(index)}</Text>
            <Text style={[styles.blackText, styles.boldText]}>
              {`: ${getItemValue(index)}`}
            </Text>
          </Text>
          <Spacer size={4} />
        </View>
      ))}

      <Spacer size={8} />
      <Text>
        <Text>pick up: </Text>
        <Text style={[styles.blackText, styles.boldText]}>{pickup?.name}</Text>
      </Text>
      <Spacer size={12} />
      <Text>
        <Text>drop off: </Text>
        <Text style={[styles.blackText, styles.boldText]}>{dropoff?.name}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
  boldText: {
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

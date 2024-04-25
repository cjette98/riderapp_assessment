import React from 'react';
import {RideRequest} from '../types/booking';
import {Modal, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Spacer} from './Spacer';
import {minutesToDuration} from '../helpers/stringHelpers';

interface Props extends Partial<RideRequest> {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

export function SelectedRideModal({
  visible,
  setVisible,
  passenger_name,
  ride_distance_miles,
  ride_duration_minutes,
  fare_amount,
  pickup,
  dropoff,
}: Props) {
  const onHideModal = () => {
    setVisible(false);
  };

  const getKeyValue = (index: number) => {
    if (!index) {
      return 'Distance';
    }
    if (index === 1) {
      return 'Arrive in';
    }
    if (index === 2) {
      return 'Fare';
    }
    return '';
  };

  const getItemValue = (index: number) => {
    if (!index) {
      return `${ride_distance_miles} mi`;
    }
    if (index === 1) {
      return `${minutesToDuration(Number(ride_duration_minutes))}`;
    }
    if (index === 2) {
      return `₱${fare_amount}`;
    }
    return '';
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onHideModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            <Text
              style={[styles.blackText, styles.headerText, styles.boldText]}>
              Ride Request
            </Text>
            <Spacer size={8} />
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
                  <Text
                    style={[
                      styles.blackText,
                      styles.bodyText,
                      styles.boldText,
                    ]}>
                    {`: ${getItemValue(index)}`}
                  </Text>
                </Text>
                <Spacer size={4} />
              </View>
            ))}

            <Spacer size={8} />
            <Text>
              <Text>pick up: </Text>
              <Text
                style={[styles.blackText, styles.bodyText, styles.boldText]}>
                {pickup?.name}
              </Text>
            </Text>
            <Spacer size={12} />
            <Text>
              <Text>drop off: </Text>
              <Text
                style={[styles.blackText, styles.bodyText, styles.boldText]}>
                {dropoff?.name}
              </Text>
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonAccept]}
              onPress={onHideModal}>
              <Text style={[styles.boldText, styles.whiteText]}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDecline]}
              onPress={onHideModal}>
              <Text style={styles.blackText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    minHeight: '50%',
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 14,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 12,
    width: '80%',
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
  bodyText: {
    fontSize: 14,
  },
  subtitleText: {
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

import React from 'react';
import {RideRequest} from '../types/booking';
import {Modal, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Spacer} from './Spacer';
import {useNavigation} from '@react-navigation/native';
import {useRideContents} from '../hooks/useRideContents';

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
  const navigation = useNavigation();
  const onHideModal = () => {
    setVisible(false);
  };

  const onPressAccept = () => {
    onHideModal();
    setTimeout(() => {
      navigation.navigate('Request' as never);
    }, 400);
  };

  const {getKeyValue, getItemValue} = useRideContents(
    ride_distance_miles || 0,
    ride_duration_minutes || 0,
    fare_amount || 0,
  );

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
              <Text style={[styles.blackText, styles.boldText]}>
                {pickup?.name}
              </Text>
            </Text>
            <Spacer size={12} />
            <Text>
              <Text>drop off: </Text>
              <Text style={[styles.blackText, styles.boldText]}>
                {dropoff?.name}
              </Text>
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonAccept]}
              onPress={onPressAccept}>
              <Text style={[styles.boldText, styles.whiteText]}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDecline]}
              onPress={onHideModal}>
              <Text style={styles.blackText}>Cancel</Text>
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
    minHeight: '60%',
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

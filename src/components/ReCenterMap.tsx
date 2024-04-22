import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onReCenterMap: () => void;
}

export function ReCenterMap({onReCenterMap}: Props) {
  return (
    <Pressable style={styles.centerBtn} onPress={onReCenterMap}>
      <View style={styles.circleBtn}>
        <Icon name="target" size={30} color={'white'} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centerBtn: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginRight: 12,
    marginBottom: 12,
  },
  circleBtn: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

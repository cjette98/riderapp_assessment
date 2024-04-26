import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

export default function RequestsHistory() {
  return (
    <View style={styles.container}>
      <View>
        <Text>History</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

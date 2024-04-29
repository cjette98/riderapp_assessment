/* eslint-disable react/no-unstable-nested-components */
import React, {useMemo, useState} from 'react';
import {FlatList, LayoutChangeEvent, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {HistoryItem} from '../components/HistoryItem';
import {RideRequest} from '../types/booking';
import {Spacer} from '../components/Spacer';

const ActiveRequest: string[] = ['accepted', 'started', 'picked-up'];
const RequestHistory: string[] = ['dropped-off', 'declined'];

export default function RequestsHistory() {
  const {savedRideRequests} = useSelector((state: RootState) => state.booking);
  const [activeItemLayout, setActiveItemLayout] = useState<number>(0);

  const activeRequest = useMemo(() => {
    return savedRideRequests.filter(saved =>
      ActiveRequest.includes(saved?.status || ''),
    ) as RideRequest[];
  }, [savedRideRequests]);

  const history = useMemo(() => {
    return savedRideRequests.filter(saved =>
      RequestHistory.includes(saved?.status || ''),
    ) as RideRequest[];
  }, [savedRideRequests]);

  return (
    <View style={styles.container}>
      {activeRequest[0]?.ride_id && (
        <View>
          <Text style={styles.headerText}>Current Request</Text>
          <Spacer size={12} />
          <View style={[styles.activeContainer, {height: activeItemLayout}]}>
            <HistoryItem
              item={activeRequest[0]}
              isCurrent
              onLayout={(e: LayoutChangeEvent) => {
                e.preventDefault();
                setActiveItemLayout(e.nativeEvent.layout.height);
              }}
            />
          </View>
        </View>
      )}
      <Spacer size={24} />

      <Text style={styles.headerText}>Request History</Text>
      <Spacer size={12} />
      <FlatList
        data={history}
        keyExtractor={item => `${item.ride_id}`}
        renderItem={({item}) => <HistoryItem item={item} />}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Requests yet...</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  activeContainer: {
    minHeight: 210,
    marginHorizontal: 24,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    gap: 12,
    marginHorizontal: 24,
  },
});

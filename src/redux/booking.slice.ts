import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RideRequest} from '../types/booking';

const selectedRideRequestInitState: RideRequest = {
  ride_id: 0,
  passenger_name: '',
  pickup: {lat: 0, lng: 0, name: ''},
  dropoff: {lat: 0, lng: 0, name: ''},
  fare_amount: 0,
  ride_duration_minutes: 0,
  ride_distance_miles: 0,
};

const initialState = {
  selectedRideRequest: selectedRideRequestInitState,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedRideRequest: (state, action: PayloadAction<RideRequest>) => {
      state.selectedRideRequest = action.payload;
    },
  },
});

export const {setSelectedRideRequest} = bookingSlice.actions;

export default bookingSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RideRequest, RideStatus} from '../types/booking';

interface State {
  selectedRideRequest: RideRequest;
  selectedStatus: string;
  savedRideRequests: RideRequest[];
}

export const selectedRideRequestInitState: RideRequest = {
  ride_id: 0,
  passenger_name: '',
  pickup: {lat: 0, lng: 0, name: ''},
  dropoff: {lat: 0, lng: 0, name: ''},
  fare_amount: 0,
  ride_duration_minutes: 0,
  ride_distance_miles: 0,
  status: 'pending',
};

const initialState: State = {
  selectedRideRequest: selectedRideRequestInitState,
  selectedStatus: 'pending',
  savedRideRequests: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedRideRequest: (state, action: PayloadAction<RideRequest>) => {
      state.selectedRideRequest = action.payload;
    },
    setSelectedStatus: (state, action: PayloadAction<RideStatus>) => {
      state.selectedStatus = action.payload;
    },
    setSavedRideRequests: (state, action: PayloadAction<RideRequest[]>) => {
      state.savedRideRequests = action.payload;
    },
  },
});

export const {setSelectedRideRequest, setSelectedStatus, setSavedRideRequests} =
  bookingSlice.actions;

export default bookingSlice.reducer;

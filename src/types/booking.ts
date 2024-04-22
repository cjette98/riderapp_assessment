export type RideRequest = {
  ride_id: number;
  passenger_name: string;
  pickup: {lat: number; lng: number};
  dropoff: {lat: number; lng: number};
  fare_amount: number;
  ride_duration_minutes: number;
  ride_distance_miles: number;
};

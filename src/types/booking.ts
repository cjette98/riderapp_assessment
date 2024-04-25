export type RideRequest = {
  ride_id: number;
  passenger_name: string;
  pickup: {lat: number; lng: number; name?: string};
  dropoff: {lat: number; lng: number; name?: string};
  fare_amount: number;
  ride_duration_minutes: number;
  ride_distance_miles: number;
};

export type LocationNamePayload = {
  latlng: string;
};

export type ReverseGeoCodeResponse = {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: {
    address_components: object[];
    formatted_address: string;
    geometry: object[];
    place_id: string;
    plus_code: object[];
    types: object[];
  }[];
  status: string;
};

export type RideStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'started'
  | 'picked-up'
  | 'dropped-off';

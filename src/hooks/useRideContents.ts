import {miToKm, minutesToDuration} from '../helpers/stringHelpers';
export function useRideContents(
  ride_distance_miles: number,
  ride_duration_minutes: number,
  fare_amount: number,
) {
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
      return `${miToKm(Number(ride_distance_miles))}`;
    }
    if (index === 1) {
      return `${minutesToDuration(Number(ride_duration_minutes))}`;
    }
    if (index === 2) {
      return `₱${fare_amount}`;
    }
    return '';
  };
  return {getKeyValue, getItemValue};
}

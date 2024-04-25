import {useMutation} from '@tanstack/react-query';
import {getGeocodeName} from '../api/booking.request';

export function useBookingMutations() {
  const onGetGeocodeName = useMutation({
    mutationKey: ['inviteByEmail'],
    mutationFn: getGeocodeName,
    onError: async err => {
      console.log('onGetGeocodeName err:', err);
    },
  });

  return {
    onGetGeocodeName,
  };
}

import {LocationNamePayload} from '../../types/booking';
import {geoCodeInstance} from './instance';

export async function getGeocodeName({latlng}: LocationNamePayload) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const response = await geoCodeInstance
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}`,
    )
    .json();
  return response;
}

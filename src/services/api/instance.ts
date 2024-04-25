import ky from 'ky';

export const geoCodeInstance = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set(
          'X-Goog-Api-Key',
          process.env.GOOGLE_MAPS_API_KEY || '',
        );
      },
    ],
  },
});

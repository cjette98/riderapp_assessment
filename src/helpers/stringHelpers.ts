import {formatDuration} from 'date-fns';

const KM_VALUE = 1.60934;

export function minutesToDuration(min: number) {
  return formatDuration({minutes: min});
}

export function miToKm(mi: number) {
  return `${(mi * KM_VALUE)?.toFixed(2)} km`;
}

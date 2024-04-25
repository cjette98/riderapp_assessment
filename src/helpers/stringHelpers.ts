import {formatDuration} from 'date-fns';

export function minutesToDuration(min: number) {
  return formatDuration({minutes: min});
}

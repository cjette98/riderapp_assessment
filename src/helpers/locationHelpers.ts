export function randomizeCoordinateByRadius(currCoordinate: number, r: number) {
  return currCoordinate + Math.random() * (r - -r) + -r;
}

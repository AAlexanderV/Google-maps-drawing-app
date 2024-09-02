import { Position, InputPosition, Snapshot } from '../../../types';

export const getDefaultCoords = () => ({ lat: '', lng: '' });

export const getMarkerInitialValue = () => [getDefaultCoords()];

export const getPolygonInitialValue = () =>
  Array.from({ length: 3 }, () => getDefaultCoords());

export function extractCoordinates(snapshot: Snapshot) {
  if (snapshot.position) {
    const lat = snapshot.position.lat.toFixed(4);
    const lng = snapshot.position.lng.toFixed(4);

    return `(${lat}, ${lng})`;
  }

  if (snapshot.path) {
    return snapshot.path
      .map((coord) => `(${coord.lat().toFixed(4)}, ${coord.lng().toFixed(4)})`)
      .join(', ');
  }
}

export function validateDraft(isPolygon: boolean, points?: InputPosition[]) {
  if (
    !points ||
    (isPolygon && points.length < 3) ||
    !checkEachPairIsNonEmpty(points)
  ) {
    return false;
  }

  const nonEmptyPoints = points.filter((point) => !!point.lat && !!point.lng);

  if (nonEmptyPoints.length <= 0) return false;

  const MAX_LAT = 90;
  const MAX_LNG = 180;

  // lat range -90° до +90°
  // lng range -180° до +180°
  return nonEmptyPoints.every(
    (point) =>
      Math.abs(Number(point.lat)) <= MAX_LAT &&
      Math.abs(Number(point.lng)) <= MAX_LNG,
  );
}

function checkEachPairIsNonEmpty(points: InputPosition[]) {
  let result = true;

  points.forEach((point) => {
    if ((point.lat && !point.lng) || (!point.lat && point.lng)) {
      // point is not filled with both lat and lng, possible client's misprint
      result = false;
    }
  });

  return result;
}

export function covertDraftInputsToNumberCoordinates(
  points: InputPosition[],
): Position[] {
  return points.map((point) => ({
    lat: Number(point.lat),
    lng: Number(point.lng),
  }));
}

import { Position, PositionStringified, Snapshot } from '../../../types';

export const getDefaultCoords = () => ({ lat: '', lng: '' });

export const getMarkerInitialValue = () => [getDefaultCoords()];

export const getPolygonInitialValue = () =>
  Array.from({ length: 3 }, () => getDefaultCoords());

export function extractCoordinates(snapshot: Snapshot) {
  if (snapshot.position) {
    const lat = snapshot.position.lat;
    const lng = snapshot.position.lng;

    return `(${lat}, ${lng})`;
  }

  if (snapshot.path) {
    return snapshot.path
      .map((coord) => `(${coord.lat()}, ${coord.lng()})`)
      .join(', ');
  }
}

export function validateDraft(
  isPolygon: boolean,
  points: PositionStringified[],
) {
  if (isPolygon && (points.length < 3 || !checkEachPairIsNonEmpty(points))) {
    return false;
  }

  const MAX_LAT = 90;
  const MAX_LNG = 180;

  // lat range -90° до +90°
  // lng range -180° до +180°
  return points
    .filter((point) => !!point.lat && !!point.lng)
    .every(
      (sp) =>
        Math.abs(Number(sp.lat)) <= MAX_LAT &&
        Math.abs(Number(sp.lng)) <= MAX_LNG,
    );
}

function checkEachPairIsNonEmpty(points: PositionStringified[]) {
  let result = true;

  points.forEach((point) => {
    if ((point.lat && !point.lng) || (!point.lat && point.lng)) {
      // point is not filled with both lat and lng, possible client's misprint
      result = false;
    }
  });

  return result;
}

export function covertDraftPointsToNumberCoordinates(
  points: PositionStringified[],
): Position[] {
  return points.map((point) => ({
    lat: Number(point.lat),
    lng: Number(point.lng),
  }));
}

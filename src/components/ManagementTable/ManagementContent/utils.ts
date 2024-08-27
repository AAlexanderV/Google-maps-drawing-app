import { Snapshot } from '../../../types';

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

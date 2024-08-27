import { OverlayGeometry } from '../types';

export function isMarker(
  overlay: OverlayGeometry,
): overlay is google.maps.Marker {
  return (overlay as google.maps.Marker).getPosition !== undefined;
}

export function isPolygon(
  overlay: OverlayGeometry,
): overlay is google.maps.Polygon {
  return (overlay as google.maps.Polygon).getPath !== undefined;
}

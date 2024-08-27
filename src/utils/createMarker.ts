import { Action, DrawingActionKind, DrawResult } from '../types';

export function createMarker(
  map: google.maps.Map | null,
  position: google.maps.LatLngLiteral,
  dispatch: React.Dispatch<Action>,
) {
  const marker = new google.maps.Marker({
    position,
    map,
    clickable: true,
  });

  const result: DrawResult = {
    type: google.maps.drawing.OverlayType.MARKER,
    overlay: marker,
  };

  dispatch({ type: DrawingActionKind.SET_OVERLAY, payload: result });

  return marker;
}

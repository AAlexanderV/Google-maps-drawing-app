import { Action, DrawingActionKind, DrawResult, Position } from '../types';

export function createMarker(
  [position]: Position[],
  dispatch: React.Dispatch<Action>,
) {
  const marker = new google.maps.Marker({
    position,
    clickable: true,
    cursor: 'pointer',
  });

  const result: DrawResult = {
    type: google.maps.drawing.OverlayType.MARKER,
    overlay: marker,
  };

  dispatch({ type: DrawingActionKind.SET_OVERLAY, payload: result });

  return marker;
}

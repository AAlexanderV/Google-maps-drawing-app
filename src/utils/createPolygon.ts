import { Action, DrawResult, DrawingActionKind, Position } from '../types';

export function createPolygon(
  map: google.maps.Map | null,
  paths: Position[],
  dispatch: React.Dispatch<Action>,
) {
  const polygon = new google.maps.Polygon({
    paths,
    map,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });

  const result: DrawResult = {
    type: google.maps.drawing.OverlayType.POLYGON,
    overlay: polygon,
  };

  dispatch({ type: DrawingActionKind.SET_OVERLAY, payload: result });

  return polygon;
}

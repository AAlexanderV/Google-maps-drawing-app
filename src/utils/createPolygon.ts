import { DRAW_COLOR } from '../constants/mapDefaults';
import { Action, DrawResult, DrawingActionKind, Position } from '../types';

export function createPolygon(
  paths: Position[],
  title: string,
  dispatch: React.Dispatch<Action>,
) {
  const polygon = new google.maps.Polygon({
    paths,
    strokeColor: DRAW_COLOR,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: DRAW_COLOR,
    fillOpacity: 0.35,
  });

  const result: DrawResult = {
    type: google.maps.drawing.OverlayType.POLYGON,
    overlay: polygon,
  };

  dispatch({ type: DrawingActionKind.SET_OVERLAY, title, payload: result });

  return polygon;
}

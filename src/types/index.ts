export type Position = google.maps.LatLngLiteral;

export type InputPosition = {
  lat?: string | number;
  lng?: string | number;
};

export type OverlayGeometry = google.maps.Marker | google.maps.Polygon;

export interface DrawResult {
  type: google.maps.drawing.OverlayType;
  overlay: OverlayGeometry;
}

export interface Snapshot {
  radius?: number;
  center?: Position;
  position?: Position;
  path?: Array<google.maps.LatLng>;
  bounds?: google.maps.LatLngBoundsLiteral;
}

export interface Overlay {
  title: string;
  type: google.maps.drawing.OverlayType;
  geometry: OverlayGeometry;
  snapshot: Snapshot;
}

export enum DrawingActionKind {
  SET_OVERLAY = 'SET_OVERLAY',
  UPDATE_OVERLAYS = 'UPDATE_OVERLAYS',
  DELETE = 'DELETE',
}

export interface UpdateOverlayAction {
  type: DrawingActionKind.UPDATE_OVERLAYS;
}

export interface SetOverlayAction {
  type: DrawingActionKind.SET_OVERLAY;
  payload: DrawResult;
  title?: string;
}

export interface DeleteOverlayAction {
  type: DrawingActionKind.DELETE;
  deleteItem: Overlay;
}

export type Action =
  | UpdateOverlayAction
  | SetOverlayAction
  | DeleteOverlayAction;

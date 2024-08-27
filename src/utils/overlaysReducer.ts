import { Action, DrawingActionKind, Overlay, Snapshot } from '../types';
import { isMarker, isPolygon } from './geometryCheckers';

const overlaysReducer = (state: Overlay[], action: Action): Overlay[] => {
  switch (action.type) {
    case DrawingActionKind.UPDATE_OVERLAYS: {
      const overlays = state.map((overlay: Overlay) => {
        const snapshot: Snapshot = {};
        const { geometry } = overlay;

        if (isMarker(geometry)) {
          snapshot.position = geometry.getPosition()?.toJSON();
        } else if (isPolygon(geometry)) {
          snapshot.path = geometry.getPath()?.getArray();
        }

        return {
          ...overlay,
          snapshot,
        };
      });

      return overlays;
    }

    case DrawingActionKind.SET_OVERLAY: {
      const { title } = action;
      const { overlay, type } = action.payload;

      const alternateTitle = `${type} # ${state.length}`;

      const snapshot: Snapshot = {};

      if (isMarker(overlay)) {
        snapshot.position = overlay.getPosition()?.toJSON();
      } else if (isPolygon(overlay)) {
        snapshot.path = overlay.getPath()?.getArray();
      }

      return [
        ...state,
        {
          title: title ?? alternateTitle,
          type: action.payload.type,
          geometry: action.payload.overlay,
          snapshot,
        },
      ];
    }

    case DrawingActionKind.DELETE: {
      const { deleteItem } = action;

      return state.filter((overlay) => overlay !== deleteItem);
    }

    default:
      return state;
  }
};

export default overlaysReducer;

import { createContext, useContext, useMemo, useReducer, useRef } from 'react';
import { Action, Overlay } from '../types';
import overlaysReducer from '../utils/overlaysReducer';
import { isMarker, isPolygon } from '../utils/geometryCheckers';

import { useDrawingManager } from './DrawingManagerContext';
import { useMap } from '@vis.gl/react-google-maps';
import { useDrawingManagerEvents } from '../hooks/useDrawingManagerEvents';
import { useOverlaySnapshots } from '../hooks/useOverlaySnapshots';

export type MapOverlaysContextValue = {
  overlays: Overlay[];
  dispatchOverlays: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode;
};

const initialOverlaysState: Overlay[] = [];

export const MapOverlaysContext = createContext<MapOverlaysContextValue>({
  overlays: [],
  dispatchOverlays: () => {},
});

export const MapOverlaysContextProvider = (props: Props) => {
  const map = useMap();
  const drawingManager = useDrawingManager();

  const [overlaysState, dispatchOverlays] = useReducer<
    React.Reducer<Overlay[], Action>
  >(overlaysReducer, initialOverlaysState);

  const overlaysShouldUpdateRef = useRef<boolean>(false);

  useDrawingManagerEvents(
    drawingManager,
    overlaysShouldUpdateRef,
    dispatchOverlays,
  );

  useOverlaySnapshots(map, overlaysState, overlaysShouldUpdateRef);

  return (
    <MapOverlaysContext.Provider
      value={{
        overlays: overlaysState,
        dispatchOverlays,
      }}
    >
      {props.children}
    </MapOverlaysContext.Provider>
  );
};

export const useMarkers = () => {
  const { overlays } = useContext(MapOverlaysContext);

  return useMemo(() => {
    return overlays.filter((overlay: Overlay) => isMarker(overlay.geometry));
  }, [overlays]);
};

export const usePolygons = () => {
  const { overlays } = useContext(MapOverlaysContext);

  return useMemo(() => {
    return overlays.filter((overlay: Overlay) => isPolygon(overlay.geometry));
  }, [overlays]);
};

export const useDispatchOverlays = () =>
  useContext(MapOverlaysContext).dispatchOverlays;

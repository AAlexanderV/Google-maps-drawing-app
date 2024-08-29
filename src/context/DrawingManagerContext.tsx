import { createContext, useContext, useEffect, useState } from 'react';

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { DRAW_COLOR } from '../constants/mapDefaults';

export type DrawingManagerContextValue =
  google.maps.drawing.DrawingManager | null;

type Props = {
  children: React.ReactNode;
};

export const DrawingManagerContext =
  createContext<DrawingManagerContextValue>(null);

export const DrawingManagerContextProvider = (props: Props) => {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(null);

  useEffect(() => {
    if (!map || !drawing) return;

    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      markerOptions: {
        draggable: false,
        clickable: true,
        cursor: 'pointer',
      },

      polygonOptions: {
        editable: false,
        draggable: false,

        strokeColor: DRAW_COLOR,
        fillColor: DRAW_COLOR,
        fillOpacity: 0.4,
      },
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, map]);

  return (
    <DrawingManagerContext.Provider value={drawingManager}>
      {props.children}
    </DrawingManagerContext.Provider>
  );
};

export const useDrawingManager = () => useContext(DrawingManagerContext);

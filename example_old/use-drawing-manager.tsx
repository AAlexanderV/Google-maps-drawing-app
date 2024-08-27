import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function useDrawingManager(
  initialValue: google.maps.drawing.DrawingManager | null = null,
) {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(initialValue);

  useEffect(() => {
    if (!map || !drawing) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      markerOptions: {
        draggable: false,
      },

      polygonOptions: {
        editable: false,
        draggable: false,

        strokeColor: '#D898FF',
        fillColor: '#D898FF',
        fillOpacity: 0.4,
      },
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, map]);

  return drawingManager;
}

import { MutableRefObject, Dispatch, useEffect } from 'react';
import { Action, DrawResult, DrawingActionKind } from '../types';

export function useDrawingManagerEvents(
  drawingManager: google.maps.drawing.DrawingManager | null,
  overlaysShouldUpdateRef: MutableRefObject<boolean>,
  dispatch: Dispatch<Action>,
) {
  useEffect(() => {
    if (!drawingManager) return;

    const eventListeners: Array<google.maps.MapsEventListener> = [];

    const addUpdateListener = (eventName: string, drawResult: DrawResult) => {
      const updateListener = google.maps.event.addListener(
        drawResult.overlay,
        eventName,
        () => {
          if (eventName === 'dragstart') {
            overlaysShouldUpdateRef.current = false;
          }

          if (eventName === 'dragend') {
            overlaysShouldUpdateRef.current = true;
          }

          if (overlaysShouldUpdateRef.current) {
            dispatch({ type: DrawingActionKind.UPDATE_OVERLAYS });
          }
        },
      );

      eventListeners.push(updateListener);
    };

    const overlayCompleteListener = google.maps.event.addListener(
      drawingManager,
      'overlaycomplete',
      (drawResult: DrawResult) => {
        switch (drawResult.type) {
          case google.maps.drawing.OverlayType.MARKER:
            ['dragend'].forEach((eventName) =>
              addUpdateListener(eventName, drawResult),
            );
            break;

          case google.maps.drawing.OverlayType.POLYGON:
            ['mouseup'].forEach((eventName) =>
              addUpdateListener(eventName, drawResult),
            );
            break;
        }

        dispatch({ type: DrawingActionKind.SET_OVERLAY, payload: drawResult });
      },
    );

    eventListeners.push(overlayCompleteListener);

    return () => {
      eventListeners.forEach((listener) =>
        google.maps.event.removeListener(listener),
      );
    };
  }, [dispatch, drawingManager, overlaysShouldUpdateRef]);
}

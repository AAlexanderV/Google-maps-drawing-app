import { MutableRefObject, useEffect } from 'react';
import { isMarker, isPolygon } from '../utils/geometryCheckers';
import { Overlay } from '../types';

export function useOverlaySnapshots(
  map: google.maps.Map | null,
  state: Overlay[],
  overlaysShouldUpdateRef: MutableRefObject<boolean>,
) {
  useEffect(() => {
    if (!map || !state) return;

    for (const overlay of state) {
      overlaysShouldUpdateRef.current = false;

      overlay.geometry.setMap(map);

      const { position, path } = overlay.snapshot;

      if (isMarker(overlay.geometry)) {
        overlay.geometry.setPosition(position);
      } else if (isPolygon(overlay.geometry)) {
        overlay.geometry.setPath(path ?? []);
      }

      overlaysShouldUpdateRef.current = true;
    }

    return () => {
      for (const overlay of state) {
        overlay.geometry.setMap(null);
      }
    };
  }, [map, overlaysShouldUpdateRef, state]);
}

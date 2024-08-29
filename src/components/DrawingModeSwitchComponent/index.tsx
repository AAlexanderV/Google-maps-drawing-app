import { useState } from 'react';
import './styles.css';
import { ManagementTableState } from '../ManagementTable';

type Props = {
  drawingManager: google.maps.drawing.DrawingManager | null;
};

const polygonMode = ManagementTableState.POLYGON;
const markerMode = ManagementTableState.MARKER;

export default function DrawingModeSwitchComponent({ drawingManager }: Props) {
  const [drawingModeLocal, setDrawingModeLocal] =
    useState<ManagementTableState>(polygonMode);

  const isPolygonMode = drawingModeLocal === polygonMode;

  const setMarkerMode = () => {
    drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
    setDrawingModeLocal(markerMode);
  };

  const setPolygonMode = () => {
    drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    setDrawingModeLocal(polygonMode);
  };

  return (
    <div className="DrawingModeSwitch-container">
      <button
        onClick={setPolygonMode}
        className={'mapButton' + (isPolygonMode ? ' active' : '')}
      >
        Draw polygon
      </button>

      <button
        onClick={setMarkerMode}
        className={'mapButton' + (isPolygonMode ? '' : ' active')}
      >
        Add marker
      </button>
    </div>
  );
}

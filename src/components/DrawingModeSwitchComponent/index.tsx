import './styles.css';

type Props = {
  drawingManager: google.maps.drawing.DrawingManager | null;
};

export default function DrawingModeSwitchComponent({ drawingManager }: Props) {
  const setMarkerMode = () =>
    drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.MARKER);

  const setPolygonMode = () =>
    drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

  return (
    <div className="DrawingModeSwitch-container">
      <button onClick={setPolygonMode}>Draw polygon</button>

      <button onClick={setMarkerMode}>Add marker</button>
    </div>
  );
}

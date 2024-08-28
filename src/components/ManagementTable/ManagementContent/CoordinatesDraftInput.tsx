import { PositionStringified } from '../../../types';
import { getDefaultCoords } from './utils';

type Props = {
  isPolygonMode: boolean;
  points: PositionStringified[];
  setDraftName: React.Dispatch<React.SetStateAction<string | null>>;
  setDraftPoints: React.Dispatch<React.SetStateAction<PositionStringified[]>>;
};

export default function CoordinatesDraftInput({
  isPolygonMode,
  points,
  setDraftName,
  setDraftPoints,
}: Props) {
  const handlePointChange = (
    index: number,
    field: 'lat' | 'lng',
    value: string,
  ) => {
    if (isNaN(Number(value))) return;

    const newCoordinates = [...points];
    newCoordinates[index][field] = value;
    setDraftPoints(newCoordinates);
  };

  const handleAddPoint = () =>
    setDraftPoints((currentPoints) => [
      ...(currentPoints ?? []),
      getDefaultCoords(),
    ]);

  const handleRemovePoint = (index: number) => {
    if (points.length <= 1) {
      setDraftPoints([getDefaultCoords()]);
    } else {
      const newPoints = points.filter((_, i) => i !== index);
      setDraftPoints(newPoints);
    }
  };

  const handleSaveCoordinates = () => {
    // keep coords and close modal
  };

  const handleCancelCoordinates = () => {
    // rest coords and close modal
  };

  return (
    <div>
      <button>{`${points.length} points`}</button>

      <div className="accordion-content">
        {points.map((point, index) => (
          <div className="point-row" key={index}>
            <div className="drag-handle">::</div>
            <input
              className="coordinate-input"
              type="number"
              value={point.lat}
              onChange={(e) => handlePointChange(index, 'lat', e.target.value)}
            />
            <input
              className="coordinate-input"
              type="number"
              value={point.lng}
              onChange={(e) => handlePointChange(index, 'lng', e.target.value)}
            />
            <button
              className="remove-button"
              onClick={() => handleRemovePoint(index)}
            >
              ✖️
            </button>
          </div>
        ))}
        {isPolygonMode && (
          <button className="add-point-button" onClick={handleAddPoint}>
            + Add point
          </button>
        )}

        <div className="action-buttons">
          <button className="cancel-button" onClick={handleCancelCoordinates}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveCoordinates}>
            Save and apply
          </button>
        </div>
      </div>
    </div>
  );
}

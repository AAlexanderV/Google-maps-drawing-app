import { Action } from '../../../types';
import { useDraftManager } from '../../../context/DraftContext';
import { useState } from 'react';

type Props = {
  isPolygonMode: boolean;
  dispatchOverlays: React.Dispatch<Action>;
};

export default function DraftRow({ isPolygonMode, dispatchOverlays }: Props) {
  const [points, setPoints] = useState([{ lat: 0, lng: 0 }]);

  const { markerDraft, polygonDraft, setPolygonDraft, setMarkerDraft } =
    useDraftManager();

  const isDraftEmpty: boolean = isPolygonMode ? !polygonDraft : !markerDraft;

  console.log('polygonDraft, markerDraft', polygonDraft, markerDraft);
  console.log('isPolygonMode', isPolygonMode);
  console.log('isDraftEmpty', isDraftEmpty);

  if (isDraftEmpty) return null;

  const appliedFigureDraft = isPolygonMode ? polygonDraft : markerDraft;
  const appliedName = appliedFigureDraft?.name;
  const appliedCoordinates = appliedFigureDraft?.coordinates;

  const appliedDraftSetter = isPolygonMode ? setPolygonDraft : setMarkerDraft;

  const handleConfirm = () => {};

  const handleRemove = () => {};

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDraft = { ...appliedFigureDraft, name: e.target.value };
    appliedDraftSetter(newDraft);
  };

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDraft = { ...appliedFigureDraft, coordinates: e.target.value };
    appliedDraftSetter(newDraft);
  };

  // ////////////////
  const handleAddPoint = () => {
    setPoints([...points, { lat: 0, lng: 0 }]);
  };

  const handlePointChange = (
    index: number,
    field: 'lat' | 'lng',
    value: number,
  ) => {
    const newPoints = [...points];
    newPoints[index][field] = value;
    setPoints(newPoints);
  };

  const handleRemovePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
  };

  const handleSaveCoordinates = () => {};

  const handleCancelCoordinates = () => {};

  return (
    <tr>
      <td>
        <input value={appliedName} onChange={handleNameChange} />
      </td>
      <td>
        <div>
          <input
            value={appliedCoordinates}
            onChange={handleCoordinatesChange}
          />

          <div className="accordion-content">
            {points.map((point, index) => (
              <div className="point-row" key={index}>
                <div className="drag-handle">::</div>
                <input
                  className="coordinate-input"
                  type="number"
                  value={point.lat}
                  onChange={(e) =>
                    handlePointChange(index, 'lat', Number(e.target.value))
                  }
                />
                <input
                  className="coordinate-input"
                  type="number"
                  value={point.lng}
                  onChange={(e) =>
                    handlePointChange(index, 'lng', Number(e.target.value))
                  }
                />
                <button
                  className="remove-button"
                  onClick={() => handleRemovePoint(index)}
                >
                  ✖️
                </button>
              </div>
            ))}
            <button className="add-point-button" onClick={handleAddPoint}>
              + Add point
            </button>

            <div className="action-buttons">
              <button
                className="cancel-button"
                onClick={handleCancelCoordinates}
              >
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveCoordinates}>
                Save and apply
              </button>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <button onClick={handleConfirm} className="confirm-button">
            ✔️
          </button>
          <button onClick={handleRemove} className="close-button">
            ❌
          </button>
        </div>
      </td>
    </tr>
  );
}

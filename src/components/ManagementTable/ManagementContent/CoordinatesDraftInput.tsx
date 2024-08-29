import { useState } from 'react';
import { InputPosition } from '../../../types';
import {
  covertDraftInputsToNumberCoordinates,
  getDefaultCoords,
  getMarkerInitialValue,
  getPolygonInitialValue,
  validateDraft,
} from './utils';
import { useDraftManager } from '../../../context/DraftContext';
import './styles.css';

type Props = {
  isPolygonMode: boolean;
};

export default function CoordinatesDraftInput({ isPolygonMode }: Props) {
  const { polygonDraft, markerDraft, setPolygonDraft, setMarkerDraft } =
    useDraftManager();

  const [polygonPointsInputs, setPolygonPointsInputs] = useState<
    InputPosition[]
  >(polygonDraft?.points ?? getPolygonInitialValue);

  const [markerPointsInput, setMarkerPointsInput] = useState<InputPosition[]>(
    markerDraft?.points ?? getMarkerInitialValue,
  );

  const [isAccordionVisible, setIsAccordionVisible] = useState(false);

  const toggleAccordion = () => setIsAccordionVisible((prev) => !prev);

  const appliedDraft = isPolygonMode ? polygonDraft : markerDraft;

  const appliedPointsInputs = isPolygonMode
    ? polygonPointsInputs
    : markerPointsInput;

  const appliedPointsInputsSetter = isPolygonMode
    ? setPolygonPointsInputs
    : setMarkerPointsInput;

  const appliedDraftSetter = isPolygonMode ? setPolygonDraft : setMarkerDraft;

  const handleInputChange = (
    index: number,
    field: 'lat' | 'lng',
    value: string,
  ) => {
    if (isNaN(Number(value))) return;

    const newCoordinates = [...appliedPointsInputs];
    newCoordinates[index][field] = value;
    appliedPointsInputsSetter(newCoordinates);
  };

  const handleAddPoint = () => {
    appliedPointsInputsSetter((currentPoints) => [
      ...(currentPoints ?? []),
      getDefaultCoords(),
    ]);
  };

  const handleRemovePoint = (index: number) => {
    if (appliedPointsInputs.length <= 1) {
      appliedPointsInputsSetter([getDefaultCoords()]);
    } else {
      const newPoints = appliedPointsInputs.filter((_, i) => i !== index);
      appliedPointsInputsSetter(newPoints);
    }
  };

  const handleSaveCoordinates = () => {
    setIsAccordionVisible(false);

    const isValid = validateDraft(isPolygonMode, appliedPointsInputs);
    if (!isValid || !appliedPointsInputs) {
      console.log('Sorry, your Draft is not valid.');
      return;
    }

    appliedDraftSetter((prev) => ({
      ...prev,
      points: covertDraftInputsToNumberCoordinates(appliedPointsInputs),
    }));
  };

  const handleCancelCoordinates = () => {
    // rest coords to draft values and close
    setIsAccordionVisible(false);
  };

  return (
    <div className="CoordinatesDraftInput-container">
      <button
        onClick={toggleAccordion}
        className="button-accordion-toggle"
      >{`${appliedDraft?.points?.length ?? 0} points`}</button>
      <div
        className={
          'accordion-wrapper' + (isAccordionVisible ? ' isVisible' : '')
        }
      >
        <div className="accordion-content">
          {appliedPointsInputs.map((point, index) => (
            <div className="point-row" key={index}>
              <div className="drag-handle">::</div>
              <input
                className="coordinate-input"
                type="number"
                value={point.lat}
                onChange={(e) =>
                  handleInputChange(index, 'lat', e.target.value)
                }
              />
              <input
                className="coordinate-input"
                type="number"
                value={point.lng}
                onChange={(e) =>
                  handleInputChange(index, 'lng', e.target.value)
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
    </div>
  );
}

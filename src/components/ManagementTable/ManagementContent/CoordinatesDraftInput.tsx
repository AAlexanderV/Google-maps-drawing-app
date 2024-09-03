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

const PLACEHOLDER_VALUE = '00.0000';

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

  const draftPointsCount: number = appliedDraft?.points?.length ?? 0;
  const buttonText =
    draftPointsCount > 0
      ? `${draftPointsCount} ${isPolygonMode ? 'points' : 'point'}`
      : 'add point';

  const buttonAccordionToggleClass =
    'button-accordion-toggle' + (isAccordionVisible ? ' active' : '');

  const accordionToggleArrowClass =
    'accordion-toggle-arrow' + (isAccordionVisible ? ' up' : '');

  const accordionWrapperClass =
    'accordion-wrapper' + (isAccordionVisible ? ' isVisible' : '');

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
      <div onClick={toggleAccordion} className={buttonAccordionToggleClass}>
        <p>{buttonText}</p>

        <div className={accordionToggleArrowClass} />
      </div>

      <div className={accordionWrapperClass}>
        <div className="accordion-content">
          {appliedPointsInputs.map((point, index) => (
            <div className="draft-point-row" key={index}>
              <div className="draft-coordinates-container">
                <input
                  className="coordinate-input"
                  value={point.lat}
                  placeholder={PLACEHOLDER_VALUE}
                  onChange={(e) =>
                    handleInputChange(index, 'lat', e.target.value)
                  }
                />
                <input
                  className="coordinate-input"
                  value={point.lng}
                  placeholder={PLACEHOLDER_VALUE}
                  onChange={(e) =>
                    handleInputChange(index, 'lng', e.target.value)
                  }
                />
              </div>

              <div
                className="square-button remove"
                onClick={() => handleRemovePoint(index)}
              />
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

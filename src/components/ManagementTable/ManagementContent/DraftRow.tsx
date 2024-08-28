import { Action, PositionStringified } from '../../../types';
import { useDraftManager } from '../../../context/DraftContext';
import { useState } from 'react';
import CoordinatesDraftInput from './CoordinatesDraftInput';
import {
  covertDraftPointsToNumberCoordinates,
  getMarkerInitialValue,
  getPolygonInitialValue,
  validateDraft,
} from './utils';
import { createPolygon } from '../../../utils/createPolygon';
import { useMap } from '@vis.gl/react-google-maps';
import { createMarker } from '../../../utils/createMarker';

type Props = {
  isPolygonMode: boolean;
  dispatchOverlays: React.Dispatch<Action>;
};

export default function DraftRow({ isPolygonMode, dispatchOverlays }: Props) {
  const [markerDraftPoints, setMarkerDraftPoints] = useState<
    PositionStringified[]
  >(getMarkerInitialValue);

  const [polygonDraftPoints, setPolygonDraftPoints] = useState<
    PositionStringified[]
  >(getPolygonInitialValue);

  const { markerDraft, polygonDraft, setPolygonDraft, setMarkerDraft } =
    useDraftManager();

  const map = useMap();

  const isDraftEmpty: boolean = isPolygonMode ? !polygonDraft : !markerDraft;

  console.log('polygonDraft, markerDraft', polygonDraft, markerDraft);
  console.log('isPolygonMode', isPolygonMode);
  console.log('isDraftEmpty', isDraftEmpty);

  if (isDraftEmpty) return null;

  const appliedDraftName = (isPolygonMode ? polygonDraft : markerDraft) ?? '';

  const appliedDraftPoints = isPolygonMode
    ? polygonDraftPoints
    : markerDraftPoints;

  const appliedDraftNameSetter = isPolygonMode
    ? setPolygonDraft
    : setMarkerDraft;

  const appliedDraftPointsSetter = isPolygonMode
    ? setPolygonDraftPoints
    : setMarkerDraftPoints;

  const overlayCreationFunction = isPolygonMode ? createPolygon : createMarker;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    appliedDraftNameSetter(e.target.value);
  };

  const handleConfirmDraft = () => {
    const isValid = validateDraft(isPolygonMode, appliedDraftPoints);
    if (!isValid) {
      console.log('Sorry, your Draft is not valid.');
      return;
    }

    const appliedCoordinates =
      covertDraftPointsToNumberCoordinates(appliedDraftPoints);

    overlayCreationFunction(map, appliedCoordinates, dispatchOverlays);
    removeDraft();
  };

  const removeDraft = () => {
    appliedDraftNameSetter(null);
    appliedDraftPointsSetter(
      isPolygonMode ? getPolygonInitialValue() : getMarkerInitialValue(),
    );
  };

  return (
    <tr>
      <td>
        <input value={appliedDraftName} onChange={handleNameChange} />
      </td>
      <td>
        <CoordinatesDraftInput
          isPolygonMode={isPolygonMode}
          points={appliedDraftPoints}
          setDraftName={appliedDraftNameSetter}
          setDraftPoints={appliedDraftPointsSetter}
        />
      </td>
      <td>
        <div>
          <button onClick={handleConfirmDraft} className="confirm-button">
            ✔️
          </button>
          <button onClick={removeDraft} className="close-button">
            ❌
          </button>
        </div>
      </td>
    </tr>
  );
}

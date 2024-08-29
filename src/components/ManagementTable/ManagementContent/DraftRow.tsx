import { Action } from '../../../types';
import { useDraftManager } from '../../../context/DraftContext';
import CoordinatesDraftInput from './CoordinatesDraftInput';
import { createPolygon } from '../../../utils/createPolygon';
import { useMap } from '@vis.gl/react-google-maps';
import { createMarker } from '../../../utils/createMarker';
import './styles.css';

type Props = {
  isPolygonMode: boolean;
  dispatchOverlays: React.Dispatch<Action>;
};

export default function DraftRow({ isPolygonMode, dispatchOverlays }: Props) {
  const { markerDraft, polygonDraft, setPolygonDraft, setMarkerDraft } =
    useDraftManager();

  const map = useMap();

  const isDraftEmpty: boolean = isPolygonMode ? !polygonDraft : !markerDraft;

  console.log('polygonDraft, markerDraft', polygonDraft, markerDraft);
  console.log('isPolygonMode', isPolygonMode);
  console.log('isDraftEmpty', isDraftEmpty);

  if (isDraftEmpty) return null;

  const appliedDraftName =
    (isPolygonMode ? polygonDraft?.name : markerDraft?.name) ?? '';

  const appliedDraftPoints = isPolygonMode
    ? polygonDraft?.points
    : markerDraft?.points;

  const appliedDraftSetter = isPolygonMode ? setPolygonDraft : setMarkerDraft;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    appliedDraftSetter((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleConfirmDraft = () => {
    if (!appliedDraftPoints) {
      console.log('Please, fill in the points.');
      return;
    }

    const overlayCreationFunction = isPolygonMode
      ? createPolygon
      : createMarker;

    overlayCreationFunction(appliedDraftPoints, dispatchOverlays);
    removeDraft();
  };

  const removeDraft = () => {
    appliedDraftSetter(null);
  };

  return (
    <tr>
      <td>
        <input value={appliedDraftName} onChange={handleNameChange} />
      </td>
      <td>
        <CoordinatesDraftInput isPolygonMode={isPolygonMode} />
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

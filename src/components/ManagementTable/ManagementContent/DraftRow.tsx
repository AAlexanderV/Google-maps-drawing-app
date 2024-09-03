import { Action } from '../../../types';
import { useDraftManager } from '../../../context/DraftContext';
import CoordinatesDraftInput from './CoordinatesDraftInput';
import { createPolygon } from '../../../utils/createPolygon';
import { createMarker } from '../../../utils/createMarker';
import './styles.css';

type Props = {
  isPolygonMode: boolean;
  dispatchOverlays: React.Dispatch<Action>;
};

export default function DraftRow({ isPolygonMode, dispatchOverlays }: Props) {
  const { markerDraft, polygonDraft, setPolygonDraft, setMarkerDraft } =
    useDraftManager();

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

    overlayCreationFunction(
      appliedDraftPoints,
      appliedDraftName,
      dispatchOverlays,
    );
    removeDraft();
  };

  const removeDraft = () => {
    appliedDraftSetter(null);
  };

  return (
    <div className="row-container draft">
      <div className="row-item name">
        <input
          type="text"
          value={appliedDraftName}
          onChange={handleNameChange}
        />
      </div>

      <div className="row-item coordinates">
        <CoordinatesDraftInput isPolygonMode={isPolygonMode} />
      </div>

      <div className="row-item action">
        <div className="square-button confirm" onClick={handleConfirmDraft} />
        <div className="square-button remove" onClick={removeDraft} />
      </div>
    </div>
  );
}

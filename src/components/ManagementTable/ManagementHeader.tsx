import { ManagementTableState } from '.';
import { useDraftManager } from '../../context/DraftContext';
import MapSearch from '../MapSearch';
import './styles.css';

type Props = {
  managementTableState: ManagementTableState;
  setManagementState: React.Dispatch<
    React.SetStateAction<ManagementTableState>
  >;
};

export default function ManagementHeader({
  managementTableState,
  setManagementState,
}: Props) {
  const { createInitialPolygonDraft, createInitialMarkerDraft } =
    useDraftManager();

  const isPolygonMode = managementTableState === ManagementTableState.POLYGON;

  const polygonsButtonClassName = isPolygonMode
    ? 'navButton active'
    : 'navButton';

  const markersButtonClassName = !isPolygonMode
    ? 'navButton active'
    : 'navButton';

  const polygonsButtonText = 'Polygons management';
  const markersButtonText = 'Markers management';

  return (
    <div className="ManagementHeader-container">
      <div className="nav-buttons-container">
        <button
          className={polygonsButtonClassName}
          onClick={() => setManagementState(ManagementTableState.POLYGON)}
          data-text={polygonsButtonText}
        >
          {polygonsButtonText}
        </button>

        <button
          className={markersButtonClassName}
          onClick={() => setManagementState(ManagementTableState.MARKER)}
          data-text={markersButtonText}
        >
          {markersButtonText}
        </button>
      </div>

      <div className="add-button-container">
        {isPolygonMode ? (
          <button
            onClick={createInitialPolygonDraft}
            className="addOverlayButton"
          >
            + Add polygon
          </button>
        ) : (
          <button
            onClick={createInitialMarkerDraft}
            className="addOverlayButton"
          >
            + Add marker
          </button>
        )}
      </div>
    </div>
  );
}

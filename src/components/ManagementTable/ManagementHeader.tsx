import { ManagementTableState } from '.';
import { useDraftManager } from '../../context/DraftContext';
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

  return (
    <div className="ManagementHeader-container">
      <div className="buttonsContainer">
        <button
          className={polygonsButtonClassName}
          onClick={() => setManagementState(ManagementTableState.POLYGON)}
        >
          Polygons management
        </button>

        <button
          className={markersButtonClassName}
          onClick={() => setManagementState(ManagementTableState.MARKER)}
        >
          Markers management
        </button>
      </div>

      <div className="buttonsContainer">
        {isPolygonMode ? (
          <button onClick={createInitialPolygonDraft}>Add polygon</button>
        ) : (
          <button onClick={createInitialMarkerDraft}>Add marker</button>
        )}
      </div>
    </div>
  );
}

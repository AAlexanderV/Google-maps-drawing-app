import { ManagementTableState } from '..';
import './styles.css';
import {
  useDispatchOverlays,
  useMarkers,
  usePolygons,
} from '../../../context/MapOverlaysContext';
import ContentRow from './ContentRow';
import DraftRow from './DraftRow';

type Props = {
  managementTableState: ManagementTableState;
};

export default function ManagementContent({ managementTableState }: Props) {
  const isPolygonMode = managementTableState === ManagementTableState.POLYGON;
  const dispatchOverlays = useDispatchOverlays();
  const polygonsData = usePolygons();
  const markersData = useMarkers();
  const dataToShow = isPolygonMode ? polygonsData : markersData;

  return (
    <div className="ManagementContent-container">
      <table className="triangle-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((item, index) => (
            <ContentRow
              overlay={item}
              dispatchOverlays={dispatchOverlays}
              key={index}
            />
          ))}

          <DraftRow {...{ isPolygonMode, dispatchOverlays }} />
        </tbody>
      </table>
    </div>
  );
}

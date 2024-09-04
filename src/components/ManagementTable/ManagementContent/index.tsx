import { ManagementTableState } from '..';
import {
  useDispatchOverlays,
  useMarkers,
  usePolygons,
} from '../../../context/MapOverlaysContext';
import ContentRow from './ContentRow';
import DraftRow from './DraftRow';
import './styles.css';

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
      <div className="header-container row-container">
        <div className="row-item name">
          <p>Name</p>
        </div>
        <div className="row-item coordinates">Coordinates</div>
        <div className="row-item action">Action</div>
      </div>

      <div className="content-container">
        {dataToShow.map((item, index) => (
          <ContentRow
            overlay={item}
            dispatchOverlays={dispatchOverlays}
            key={index}
          />
        ))}

        <DraftRow {...{ isPolygonMode, dispatchOverlays }} />
      </div>
    </div>
  );
}

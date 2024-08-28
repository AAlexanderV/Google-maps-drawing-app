import { useMap } from '@vis.gl/react-google-maps';
import './styles.css';
import { createMarker } from '../../utils/createMarker';
import { createPolygon } from '../../utils/createPolygon';
import { useState } from 'react';
import ManagementHeader from './ManagementHeader';
import ManagementContent from './ManagementContent';
import { useDispatchOverlays } from '../../context/MapOverlaysContext';
import { DraftContextProvider } from '../../context/DraftContext';
import { Position } from '../../types';

export enum ManagementTableState {
  POLYGON = 'POLYGON',
  MARKER = 'MARKER',
}

export default function ManagementTable() {
  const map = useMap();
  const dispatchOverlays = useDispatchOverlays();

  const [managementTableState, setManagementState] =
    useState<ManagementTableState>(ManagementTableState.POLYGON);

  const addPolygonTest = () => {
    const triangleCoords: Position[] = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
    ];

    // createPolygon(map, triangleCoords, dispatchOverlays);
  };

  const addMarkerTest = () => {
    const coords: Position = {
      lat: 25.774,
      lng: -80.19,
    };

    // createMarker(map, coords, dispatchOverlays);
  };

  return (
    <div className="ManagementTable-container">
      <p>ManagementTable</p>
      <button onClick={addPolygonTest}>Add Polygon</button>
      <button onClick={addMarkerTest}>Add Marker</button>

      <DraftContextProvider>
        <ManagementHeader {...{ managementTableState, setManagementState }} />
        <ManagementContent {...{ managementTableState }} />
      </DraftContextProvider>
    </div>
  );
}

import { useState } from 'react';
import ManagementHeader from './ManagementHeader';
import ManagementContent from './ManagementContent';
import { DraftContextProvider } from '../../context/DraftContext';
import MapSearch from '../MapSearch';
import './styles.css';

export enum ManagementTableState {
  POLYGON = 'POLYGON',
  MARKER = 'MARKER',
}

export default function ManagementTable() {
  const [managementTableState, setManagementState] =
    useState<ManagementTableState>(ManagementTableState.POLYGON);

  return (
    <div className="ManagementTable-container">
      <MapSearch />

      <DraftContextProvider>
        <div className="header-content-wrapper">
          <ManagementHeader {...{ managementTableState, setManagementState }} />
          <ManagementContent {...{ managementTableState }} />
        </div>
      </DraftContextProvider>
    </div>
  );
}

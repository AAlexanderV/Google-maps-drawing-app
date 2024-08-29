import './styles.css';
import { useState } from 'react';
import ManagementHeader from './ManagementHeader';
import ManagementContent from './ManagementContent';
import { DraftContextProvider } from '../../context/DraftContext';

export enum ManagementTableState {
  POLYGON = 'POLYGON',
  MARKER = 'MARKER',
}

export default function ManagementTable() {
  const [managementTableState, setManagementState] =
    useState<ManagementTableState>(ManagementTableState.POLYGON);

  return (
    <div className="ManagementTable-container">
      <DraftContextProvider>
        <ManagementHeader {...{ managementTableState, setManagementState }} />
        <ManagementContent {...{ managementTableState }} />
      </DraftContextProvider>
    </div>
  );
}

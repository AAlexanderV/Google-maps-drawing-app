import { createContext, useContext, useState } from 'react';
import { usePolygons, useMarkers } from './MapOverlaysContext';

export type PolygonOrMarkerDraftName = string;

export type DraftContextValue = {
  polygonDraft: PolygonOrMarkerDraftName | null;
  setPolygonDraft: React.Dispatch<
    React.SetStateAction<PolygonOrMarkerDraftName | null>
  >;
  createInitialPolygonDraft: () => void;

  markerDraft: PolygonOrMarkerDraftName | null;
  setMarkerDraft: React.Dispatch<
    React.SetStateAction<PolygonOrMarkerDraftName | null>
  >;
  createInitialMarkerDraft: () => void;
};

type Props = {
  children: React.ReactNode;
};

const initialContextValue = {
  markerDraft: null,
  setMarkerDraft: () => {},
  createInitialMarkerDraft: () => {},
  polygonDraft: null,
  setPolygonDraft: () => {},
  createInitialPolygonDraft: () => {},
};

export const DraftContext =
  createContext<DraftContextValue>(initialContextValue);

export const DraftContextProvider = (props: Props) => {
  const polygonsData = usePolygons();
  const markersData = useMarkers();

  const [polygonDraft, setPolygonDraft] =
    useState<PolygonOrMarkerDraftName | null>(null);
  const [markerDraft, setMarkerDraft] =
    useState<PolygonOrMarkerDraftName | null>(null);

  const createInitialPolygonDraft = () => {
    const name = 'Polygon ' + (polygonsData?.length + 1 ?? 1);
    setPolygonDraft(name);
  };

  const createInitialMarkerDraft = () => {
    const name = 'Marker ' + (markersData?.length + 1 ?? 1);
    setMarkerDraft(name);
  };

  const contextValue = {
    markerDraft,
    setMarkerDraft,
    createInitialMarkerDraft,
    polygonDraft,
    setPolygonDraft,
    createInitialPolygonDraft,
  };

  return (
    <DraftContext.Provider value={contextValue}>
      {props.children}
    </DraftContext.Provider>
  );
};

export const useDraftManager = () => useContext(DraftContext);

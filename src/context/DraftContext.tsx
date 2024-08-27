import { createContext, useContext, useState } from 'react';
import { usePolygons, useMarkers } from './MapOverlaysContext';

export type PolygonOrMarkerDraft = {
  name?: string;
  coordinates?: string;
};

export type DraftContextValue = {
  markerDraft: PolygonOrMarkerDraft | null;
  setMarkerDraft: React.Dispatch<
    React.SetStateAction<PolygonOrMarkerDraft | null>
  >;
  createInitialMarkerDraft: () => void;

  polygonDraft: PolygonOrMarkerDraft | null;
  setPolygonDraft: React.Dispatch<
    React.SetStateAction<PolygonOrMarkerDraft | null>
  >;
  createInitialPolygonDraft: () => void;
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

  const [markerDraft, setMarkerDraft] = useState<PolygonOrMarkerDraft | null>(
    null,
  );
  const [polygonDraft, setPolygonDraft] = useState<PolygonOrMarkerDraft | null>(
    null,
  );

  const createInitialPolygonDraft = () => {
    const name = 'Polygon ' + (polygonsData?.length + 1 ?? 1);
    setPolygonDraft({ name });
  };

  const createInitialMarkerDraft = () => {
    const name = 'Marker ' + (markersData?.length + 1 ?? 1);
    setMarkerDraft({ name });
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

import { createContext, useContext, useEffect, useState } from 'react';
import '../App.css';
import { useMap } from '@vis.gl/react-google-maps';

export type SearchContextValue = {
  selectedPlace: google.maps.places.PlaceResult | null;
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >;
};

type Props = {
  children: React.ReactNode;
};

export const SearchContext = createContext<SearchContextValue>({
  selectedPlace: null,
  setSelectedPlace: () => {},
});

export const SearchContextProvider = (props: Props) => {
  const map = useMap();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const contextValue = {
    selectedPlace,
    setSelectedPlace,
  };

  // handles change of selectedPlace on the map
  useEffect(() => {
    if (!map || !selectedPlace) return;

    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry?.viewport);
    }
  }, [map, selectedPlace]);

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

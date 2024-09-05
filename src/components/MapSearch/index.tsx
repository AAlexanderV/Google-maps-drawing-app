import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useSearchContext } from '../../context/SearchContext';
import './styles.css';

export default function MapSearch() {
  const map = useMap();
  const places = useMapsLibrary('places');

  const { setSelectedPlace: onPlaceSelect } = useSearchContext();

  return (
    <div className="MapSearch-container">
      <div className="search">
        <div className="input_box">
          <svg className="search_city-submit">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>

          <input
            className="search_city-text"
            autoComplete="on"
            id="search_city"
            name="search_city"
            type="text"
            placeholder="Search on map"
          />
        </div>
      </div>
    </div>
  );
}

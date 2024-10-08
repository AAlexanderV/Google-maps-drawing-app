import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';
import DrawingModeSwitchComponent from '../DrawingModeSwitchComponent';
import {
  DEFAULT_ZOOM,
  DEFAULT_LOCATION,
  DEFAULT_MAP_MODE,
} from '../../constants/mapDefaults';
import { useDrawingManager } from '../../context/DrawingManagerContext';
import './styles.css';
import { useIsMobile } from '../../context/ScreenModeContext';

export default function MapTable() {
  const drawingManager = useDrawingManager();
  const isMobile = useIsMobile();

  return (
    <div className="MapTable-container">
      <Map
        className="Map"
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={DEFAULT_LOCATION}
        gestureHandling={'greedy'}
        disableDefaultUI={isMobile}
        mapTypeId={DEFAULT_MAP_MODE}
      />

      <MapControl position={ControlPosition.BOTTOM_CENTER}>
        <DrawingModeSwitchComponent drawingManager={drawingManager} />
      </MapControl>

      {/* <MapHandler place={selectedPlace} /> */}
    </div>
  );
}

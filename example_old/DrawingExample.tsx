import {
  ControlPosition,
  Map,
  MapControl,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import { UndoRedoControl } from './undo-redo-control';
import { useDrawingManager } from './use-drawing-manager';

const DrawingExample = () => {
  const drawingManager = useDrawingManager();

  return (
    <>
      <Map
        defaultZoom={5}
        defaultCenter={{ lat: 22, lng: -75 }}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        mapTypeId="satellite"
      />

      <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl>
    </>
  );
};

export default DrawingExample;

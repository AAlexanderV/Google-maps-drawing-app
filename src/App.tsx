import ManagementTable from './components/ManagementTable';
import MapTable from './components/MapTable';
import { DrawingManagerContextProvider } from './context/DrawingManagerContext';
import { MapOverlaysContextProvider } from './context/MapOverlaysContext';
import { useIsDrawingMode, useIsMobile } from './context/ScreenModeContext';
import './App.css';
import { SearchContextProvider } from './context/SearchContext';

export default function App() {
  const isMobile = useIsMobile();
  const isDrawingMode = useIsDrawingMode();

  const showMapTable = !isMobile || isDrawingMode;
  const showManagementTable = !isMobile || !isDrawingMode;

  return (
    <DrawingManagerContextProvider>
      <MapOverlaysContextProvider>
        <SearchContextProvider>
          {showMapTable && <MapTable />}
          {showManagementTable && <ManagementTable />}
        </SearchContextProvider>
      </MapOverlaysContextProvider>
    </DrawingManagerContextProvider>
  );
}

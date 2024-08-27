import './App.css';
import ManagementTable from './components/ManagementTable';
import MapTable from './components/MapTable';
import { DrawingManagerContextProvider } from './context/DrawingManagerContext';
import { MapOverlaysContextProvider } from './context/MapOverlaysContext';

export default function App() {
  return (
    <DrawingManagerContextProvider>
      <MapOverlaysContextProvider>
        <div className="app-view-container">
          <MapTable />
          <ManagementTable />
        </div>
      </MapOverlaysContextProvider>
    </DrawingManagerContextProvider>
  );
}

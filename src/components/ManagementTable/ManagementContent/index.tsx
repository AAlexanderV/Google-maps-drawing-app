import { useState } from 'react';
import { ManagementTableState } from '..';
import './styles.css';
import {
  useDispatchOverlays,
  useMarkers,
  usePolygons,
} from '../../../context/MapOverlaysContext';
import { DrawingActionKind } from '../../../types';

type Props = {
  managementTableState: ManagementTableState;
};

export default function ManagementContent({ managementTableState }: Props) {
  const data_test = [
    {
      name: 'Bermudas Triangle',
      coordinates: [
        '(25.7743, -80.1937)',
        '(18.4663, -66.1057)',
        '(32.3214, -64.7574)',
      ],
    },
    {
      name: 'Michigan Triangle',
      coordinates: [
        '(44.0000, -87.0000)',
        '(44.5000, -86.0000)',
        '(43.5000, -87.5000)',
      ],
    },
    {
      name: 'Bridgewater Triangle',
      coordinates: [
        '(41.9443, -71.0017)',
        '(41.9565, -71.0890)',
        '(41.9742, -70.9235)',
      ],
    },
  ];

  const isPolygonMode = managementTableState === ManagementTableState.POLYGON;
  const dispatchOverlays = useDispatchOverlays();
  const polygonsData = usePolygons();
  const markersData = useMarkers();
  const dataToShow = isPolygonMode ? polygonsData : markersData;

  const [showOptions, setShowOptions] = useState<number | null>(null);

  const toggleOptions = (index: number) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <div className="ManagementContent-container">
      <table className="triangle-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>
                {/* {item.coordinates.map((coord, coordIndex) => (
                  <div key={coordIndex}>{coord}</div>
                ))} */}
              </td>
              <td>
                <div className="action-menu">
                  <span className="dots" onClick={() => toggleOptions(index)}>
                    &#x2026;
                  </span>
                  {showOptions === index && (
                    <div className="options-menu">
                      <button>Edit</button>
                      <button
                        onClick={() =>
                          dispatchOverlays({
                            type: DrawingActionKind.DELETE,
                            deleteItem: item,
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Action, DrawingActionKind, Overlay } from '../../../types';
import { extractCoordinates } from './utils';

type Props = {
  overlay: Overlay;
  dispatchOverlays: React.Dispatch<Action>;
};

export default function ContentRow({ overlay, dispatchOverlays }: Props) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const overlayName = overlay.title;
  const coordinates = useMemo(
    () => extractCoordinates(overlay.snapshot),
    [overlay.snapshot],
  );

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleDelete = () => {
    dispatchOverlays({
      type: DrawingActionKind.DELETE,
      deleteItem: overlay,
    });

    setShowOptions(false);
  };

  const handleEdit = () => {
    setShowOptions(false);
  };

  return (
    <tr>
      <td>{overlayName}</td>
      <td>{coordinates}</td>
      <td>
        <div className="action-menu">
          <span className="dots" onClick={toggleOptions}>
            &#x2026;
          </span>
          {showOptions && (
            <div className="options-menu">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

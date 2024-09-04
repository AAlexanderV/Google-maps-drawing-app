import { useMemo, useState } from 'react';
import { Action, DrawingActionKind, Overlay } from '../../../types';
import { extractCoordinates } from './utils';
import './styles.css';

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

  const dotsClassName = showOptions ? 'dots active' : 'dots';
  const dotClassName = showOptions ? 'dot active' : 'dot';

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
    <div className="row-container">
      <div className="row-item name">
        <p>{overlayName}</p>
      </div>

      <div className="row-item coordinates">
        <p>{coordinates}</p>
      </div>

      <div className="row-item action">
        <div className="action-menu">
          <button className={dotsClassName} onClick={toggleOptions}>
            {[0, 1, 2].map((_, index) => (
              <span key={index} className={dotClassName} />
            ))}
          </button>
          {showOptions && (
            <div className="options-menu">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

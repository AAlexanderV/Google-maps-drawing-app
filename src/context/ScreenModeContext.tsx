import { createContext, useContext, useEffect, useState } from 'react';
import '../App.css';

export type ScreenModeContextValue = {
  isDrawingMode: boolean;
  isMobile: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const ScreenModeContext = createContext<ScreenModeContextValue>({
  isDrawingMode: true,
  isMobile: false,
});

export const ScreenModeContextProvider = (props: Props) => {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const toggleButtonText = isDrawingMode ? 'Management table' : 'Switch to Map';

  const handleToggleMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const shouldResizeToMobile = innerWidth < 900;

      if (shouldResizeToMobile !== isMobile) {
        setIsMobile(shouldResizeToMobile);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const contextValue = {
    isDrawingMode,
    isMobile,
  };

  return (
    <ScreenModeContext.Provider value={contextValue}>
      <div className="app-view-container">
        {isMobile && (
          <button
            className="map-management-toggle-button"
            onClick={handleToggleMode}
          >
            {toggleButtonText}
          </button>
        )}

        {props.children}
      </div>
    </ScreenModeContext.Provider>
  );
};

export const useIsMobile = () => useContext(ScreenModeContext).isMobile;
export const useIsDrawingMode = () =>
  useContext(ScreenModeContext).isDrawingMode;

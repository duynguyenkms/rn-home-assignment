import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

type RenderCallback = (id: string) => React.ReactNode;

type PortalElement = {
  id: string;
  render: RenderCallback;
};

type PortalContextType = {
  present: (render: RenderCallback) => string;
  dismiss: (id: string) => void;
};

type PortalProviderProps = React.PropsWithChildren;

const initialValue: PortalContextType = {
  present: () => 'unknown',
  dismiss: () => {},
};

const PortalContext = React.createContext<PortalContextType>(initialValue);

const usePortal = () => useContext(PortalContext);

const PortalProvider = ({ children }: PortalProviderProps) => {
  const [elements, setElements] = useState<PortalElement[]>([]);

  const present = (render: RenderCallback) => {
    const id = uuid.v4();
    const element: PortalElement = {
      id,
      render,
    };
    setElements(prev => [...prev, element]);
    return id;
  };

  const dismiss = (id: string) => {
    setElements(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    return () => {
      setElements([]);
    };
  }, []);

  return (
    <PortalContext.Provider value={{ present, dismiss }}>
      {children}
      {elements.map(item => (
        <React.Fragment key={item.id}>{item.render(item.id)}</React.Fragment>
      ))}
    </PortalContext.Provider>
  );
};

export { PortalProvider, usePortal };

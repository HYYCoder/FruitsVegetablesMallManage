import { createContext } from 'react';

export interface RegisterContextProps {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const RegisterContext: React.Context<RegisterContextProps> = createContext({});

export default RegisterContext;

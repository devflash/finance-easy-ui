import { useState, createContext } from "react";

type Icontext = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

type GlobalContextProps = {
  children: JSX.Element;
};

export const GlobalState = createContext<Icontext>({
  openDialog: false,
  setOpenDialog: () => {},
});

export const GlobalClientStateProvider = ({ children }: GlobalContextProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <GlobalState.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </GlobalState.Provider>
  );
};

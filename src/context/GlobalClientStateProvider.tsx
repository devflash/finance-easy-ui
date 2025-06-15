import { useState, createContext } from "react";

type Icontext = {
  openDialogKey: string;
  setOpenDialogKey: React.Dispatch<React.SetStateAction<string>>;
};

type GlobalContextProps = {
  children: JSX.Element;
};

export const GlobalState = createContext<Icontext>({
  openDialogKey: "",
  setOpenDialogKey: () => {},
});

export const GlobalClientStateProvider = ({ children }: GlobalContextProps) => {
  const [openDialogKey, setOpenDialogKey] = useState("");
  return (
    <GlobalState.Provider value={{ openDialogKey, setOpenDialogKey }}>
      {children}
    </GlobalState.Provider>
  );
};

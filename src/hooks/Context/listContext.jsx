import { createContext, useContext, useState } from "react";

export const listContext = createContext();

const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  return (
    <listContext.Provider value={{ list, setList }}>
      {children}
    </listContext.Provider>
  );
};

export default ListProvider;

export const uselistContext = () => useContext(listContext);

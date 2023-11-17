import React, { createContext, useContext, useState } from "react";

const CorralsArrayContext = createContext();

export const CorralsArrayProvider = ({ children }) => {
  const [corralsArray, setCorralsArray] = useState(Array(35).fill(0));

  const updateCorralsArray = (newCorralsArray) => {
    setCorralsArray(newCorralsArray);
  };

  return (
    <CorralsArrayContext.Provider value={{ corralsArray, updateCorralsArray }}>
      {children}
    </CorralsArrayContext.Provider>
  );
};

export { CorralsArrayContext };

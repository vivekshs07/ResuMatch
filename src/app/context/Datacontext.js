// app/context/DataContext.js
'use client';

import { createContext, useContext, useState } from 'react';

// Create the context
const DataContext = createContext(null);

// Context Provider Component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use context
export const useDataContext = () => useContext(DataContext);

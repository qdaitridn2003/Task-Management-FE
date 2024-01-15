import React, { createContext, useState } from 'react';

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  return <TagContext.Provider value={{ page, setPage }}>{children}</TagContext.Provider>;
};

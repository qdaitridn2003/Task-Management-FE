import React, { createContext, useState, useEffect } from 'react';

import { accessTokenKey } from '../common';
import { asyncStorageGetItem, axiosAuthGet } from '../configs';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(1);
  const [searchText, setSearchText] = useState('');

  const fetchData = async (page, status) => {
    const token = await asyncStorageGetItem(accessTokenKey);

    const response = await axiosAuthGet('/client/get-client-list', token, {
      limit: 6,
      page,
      status,
    });

    const listClient = response.listClient;

    if (listClient.length > 0) {
      if (page === 1) {
        setIsLoading(false);
        setData(listClient);
      } else {
        setData([...data, ...listClient]);
        setIsLoading(false);
      }
    } else if (listClient.length === 0 && status) {
      setIsLoading(false);
      setData(listClient);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <ClientContext.Provider
      value={{
        data,
        setData,
        clientId,
        setClientId,
        fetchData,
        page,
        setPage,
        isLoading,
        setIsLoading,
        edit,
        setEdit,
      }}>
      {children}
    </ClientContext.Provider>
  );
};

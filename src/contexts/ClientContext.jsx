import React, { createContext, useState, useEffect } from 'react';
import { asyncStorageGetItem, axiosAuthGet } from '../configs';
import { accessTokenKey } from '../common';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(1);
  // const [searchText, setSearchText] = useState('');

  const fetchData = async (page) => {
    const token = await asyncStorageGetItem(accessTokenKey);
    // console.log(token);
    const response = await axiosAuthGet('/client/get-client-list', token, { limit: 6, page });
    console.log('Respone: ', response.listClient);
    const dataResponse = response.listClient;
    if (dataResponse.length > 0) {
      if (page === 1) {
        setIsLoading(false);
        setData(dataResponse);
      } else {
        setData([...data, ...dataResponse]);
        setIsLoading(false);
      }
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

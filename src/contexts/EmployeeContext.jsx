import React, { createContext, useEffect, useState } from 'react';

import { accessTokenKey } from '../common';
import { asyncStorageGetItem, axiosAuthGet } from '../configs';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [employeeId, setEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(1);

  const fetchData = async (page) => {
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthGet('/employee/get-employee-list', token, { limit: 6, page });
    console.log('Respone: ', response.listEmployee);
    const dataResponse = response.listEmployee;

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
    <EmployeeContext.Provider
      value={{
        data,
        setData,
        employeeId,
        setEmployeeId,
        fetchData,
        page,
        setPage,
        isLoading,
        setIsLoading,
        edit,
        setEdit,
      }}>
      {children}
    </EmployeeContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from 'react';
import { asyncStorageGetItem, axiosAuthGet } from '../configs';
import { accessTokenKey } from '../common';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async (page) => {
    const token = await asyncStorageGetItem(accessTokenKey);
    // console.log(token);
    const response = await axiosAuthGet('/employee/get-employee-list', token, { limit: 6, page });
    const listEmployee = response.listEmployee;
    // console.log(response.listEmployee);
    setData(listEmployee);
    // const dataResponse = response.data.listClient;
    // if (dataResponse.length > 0) {
    //   if (page === 1) {
    //     setIsLoading(false);
    //     setData(dataResponse);
    //   } else {
    //     setData([...data, ...dataResponse]);
    //     setIsLoading(false);
    //   }
    // } else {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <EmployeeContext.Provider value={{ data, setData, page, setPage }}>
      {children}
    </EmployeeContext.Provider>
  );
};

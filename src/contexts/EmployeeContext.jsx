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

  const fetchData = async (page, status) => {
    const token = await asyncStorageGetItem(accessTokenKey);
    // console.log(token);
    const response = await axiosAuthGet('/employee/get-employee-list', token, {
      limit: 6,
      page,
      status: status ? status : 'active',
    });

    const listEmployee = response.listEmployee;

    if (listEmployee.length > 0) {
      if (page === 1) {
        setIsLoading(false);
        setData(listEmployee);
      } else {
        setData([...data, ...listEmployee]);
        setIsLoading(false);
      }
    } else if (listEmployee.length === 0 && status) {
      setIsLoading(false);
      setData(listEmployee);
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

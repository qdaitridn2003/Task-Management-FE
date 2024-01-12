import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { ScreenName } from '../../common';
import { Button, ContainerView } from '../../components';
import { AuthContext } from '../../contexts';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [checkData]);

  // const fetchData = async () => {
  //   const accessToken = await AsyncStorage.getItem(accessTokenKey);
  //   const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
  //   if (respone) {
  //     setIsModalIndicator(false);
  //   }

  //   if (checkData !== respone) {
  //     setCheckData(respone);
  //     const employee = respone.employee;
  //     setData({
  //       name: employee.name,
  //       avatar: employee.avatar,
  //     });
  //   }
  // };

  const handleOnEdit = () => {
    console.log('handleOnEdit');
  };

  return (
    <ContainerView>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.client)}>
        Khách hàng
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.employee)}>
        Nhân viên
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.demo)}>
        Màn hình demo
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => setIsLogin(false)}>
        Đăng xuất
      </Button>
    </ContainerView>
  );
};

export default ManagementScreen;

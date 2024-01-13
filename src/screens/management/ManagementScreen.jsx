import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { ScreenName } from '../../common';
import { Button, ContainerView } from '../../components';
import { AuthContext } from '../../contexts';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ContainerView>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.client)}>
        Quản lý Khách hàng
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.employee)}>
        Quản lý Nhân viên
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

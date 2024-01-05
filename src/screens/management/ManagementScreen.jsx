import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ContainerView } from '../../components';
import { ScreenName } from '../../common';
import { AuthContext } from '../../contexts';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ContainerView>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Thông tin tài khoản
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

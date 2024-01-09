import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ContainerView, SubHeaderBar } from '../../components';
import { ScreenName } from '../../common';
import { AuthContext } from '../../contexts';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ContainerView>
      <SubHeaderBar backButton={false} title="Quản lý" />
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.client)}>
        Quản lý khách hàng
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

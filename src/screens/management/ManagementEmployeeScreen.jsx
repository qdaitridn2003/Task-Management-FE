import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { ScreenName } from '../../common';
import { Button, ContainerView } from '../../components';
import { AuthContext } from '../../contexts';

const ManagementEmployeeScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ContainerView>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => setIsLogin(false)}>
        Đăng xuất
      </Button>
    </ContainerView>
  );
};

export default ManagementEmployeeScreen;

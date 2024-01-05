import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ContainerView } from '../../components';
import { ScreenName } from '../../common';

const ManagementScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Account Details
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.demo)}>
        Demo Screen
      </Button>
    </ContainerView>
  );
};

export default ManagementScreen;

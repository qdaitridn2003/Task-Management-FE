import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

import { ScreenName, accessTokenKey } from '../../common';
import { Button, ContainerView, Image, SubHeaderBar, Text, View } from '../../components';
import { AuthContext } from '../../contexts';
import { axiosAuthGet } from '../../configs';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [isModalIndicator, setIsModalIndicator] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [checkData]);

  const fetchData = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenKey);
    const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
    if (respone) {
      setIsModalIndicator(false);
    }

    if (checkData !== respone) {
      setCheckData(respone);
      const employee = respone.employee;
      setData({
        name: employee.name,
        avatar: employee.avatar,
      });
    }
  };

  const handleOnEdit = () => {
    console.log('handleOnEdit');
  };

  return (
    <ContainerView>
      <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
        <Image
          tw="mb-3.5 h-32 w-32 rounded-full"
          source={data.avatar ? { uri: data.avatar } : { uri: 'https://picsum.photos/700' }}
        />

        <Text tw="mb-4 text-2xl text-primary font-bold">{data.name}</Text>
      </View>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>

      <Button tw="mb-4" type="secondary">
        Nhân viên
      </Button>

      <Button tw="mb-4" type="secondary">
        Khách hàng
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

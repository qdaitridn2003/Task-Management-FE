import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';

import { ScreenName, accessTokenKey } from '../../common';
import {
  Button,
  ContainerView,
  Image,
  ScrollView,
  SubHeaderBar,
  Text,
  View,
} from '../../components';
import { axiosAuthGet } from '../../configs';
import { EmployeeContext } from '../../contexts';

const TextRow = ({ label, value }) => {
  let textColor = '';
  let displayText = value;

  if (value === 'active') {
    textColor = 'color-semanticGreen';
    displayText = 'Hoạt động';
  } else if (value === 'disabled') {
    textColor = 'color-semanticRed';
    displayText = 'Đã vô hiệu hóa';
  }

  return (
    <View tw="mb-2 flex-row self-start justify-center">
      <View tw="items-end mr-6 min-w-[95px]">
        <Text tw="color-neutral2 text-base text-neutral2">{label}</Text>
      </View>
      <Text tw={`flex-1 text-base ${textColor}`}>{displayText}</Text>
    </View>
  );
};

const EmployeeDetailsScreen = () => {
  const navigation = useNavigation();
  const { employeeId } = useContext(EmployeeContext);
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthGet(
        `/employee/get-employee-profile/${employeeId}`,
        accessToken,
      );

      console.log(response);
      console.log(employeeId);
      const employee = response.employee;
      const dateString = employee.birthday;
      const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
      const formattedGender = employee.gender === 'nam' ? 'Nam' : 'Nữ';
      setData({
        status: employee.status,
        name: employee.name,
        birthDay: formattedDate,
        role: employee.auth ? employee.auth.role.name : 'null',
        gender: formattedGender,
        phone: employee.phone,
        address: employee.address,
        email: employee.email,
        avatar: employee.avatar,
      });
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  return (
    <ContainerView tw="px-0">
      <SubHeaderBar
        tw="-mb-2 mx-5"
        title="Chi tiết nhân viên"
        backButton={false}
        rightButton={false}
      />

      <ScrollView>
        <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
          <Image
            tw="mb-3.5 h-32 w-32 rounded-full"
            source={data.avatar ? { uri: data.avatar } : { uri: 'https://picsum.photos/700' }}
          />

          <Text tw="mb-3.5 text-2xl font-bold">{data.name}</Text>
          <Text tw="mb-3.5 text-lg font-bold">{data.role}</Text>

          <TextRow label="Ngày sinh" value={data.birthDay} />
          <TextRow label="Giới tính" value={data.gender} />
          <TextRow label="Số điện thoại" value={data.phone} />
          <TextRow label="Email" value={data.email} />
          <TextRow label="Địa chỉ" value={data.address} />
          <TextRow label="Tài khoản" value={data.status} />
        </View>

        <Button tw="mb-4" onPress={() => navigation.navigate(ScreenName.updatRoleEmployee)}>
          Đổi chức vụ
        </Button>

        <Button tw="mb-4" onPress={() => navigation.navigate(ScreenName.updatRoleEmployee)}>
          Vô hiệu hóa nhân viên
        </Button>
      </ScrollView>
    </ContainerView>
  );
};

export default EmployeeDetailsScreen;

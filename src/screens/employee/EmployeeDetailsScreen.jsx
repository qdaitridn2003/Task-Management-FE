import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

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
import { asyncStorageGetItem, axiosAuthGet, axiosAuthPut } from '../../configs';
import { EmployeeContext } from '../../contexts';

const TextRow = ({ label, value }) => {
  let textColor = '';
  let displayText = value;

  if (value === 'active') {
    textColor = 'color-semanticGreen';
    displayText = 'Hoạt động';
  } else if (value === 'disabled') {
    textColor = 'color-semanticRed';
    displayText = 'Vô hiệu hóa';
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
  const { employeeId, edit, setEdit, fetchData } = useContext(EmployeeContext);
  const [data, setData] = useState({});
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthGet(
        `/employee/get-employee-profile/${employeeId}`,
        accessToken,
        {},
      );
      // console.log('Response: ', response);

      if (response) {
        const formattedDate = format(new Date(response.employee.birthday), 'dd/MM/yyyy');
        setFormatBirthday(formattedDate);
        setData(response.employee);
        setIsLoading(false);
      }
    })();
  }, [edit]);

  const handleDisabled = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthPut(`employee/update-employee-status/${employeeId}`, token, {
      status: 'disabled',
    });
    if (response) {
      fetchData(1);
      ToastAndroid.show('Đã vô hiệu hóa', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.employeeList);
    }
  };

  const handleActive = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthPut(`employee/update-employee-status/${employeeId}`, token, {
      status: 'active',
    });
    if (response) {
      ToastAndroid.show('Đã kích hoạt lại', ToastAndroid.SHORT);
      fetchData(1, 'disabled');
    }
  };

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
            source={
              data.avatar ? { uri: data.avatar } : require('../../assets/images/AddAvatar.jpeg')
            }
          />

          <Text tw="mb-3.5 text-2xl font-bold">{data.name}</Text>
          <Text tw="mb-3.5 text-lg font-bold">{data.role}</Text>

          <TextRow label="Ngày sinh" value={formatBirthday} />
          <TextRow label="Giới tính" value={data.gender} />
          <TextRow label="Số điện thoại" value={data.phone} />
          <TextRow label="Email" value={data.email} />
          <TextRow label="Địa chỉ" value={data.address} />
          <TextRow label="Tài khoản" value={data.status} />
        </View>

        {data.status === 'active' && (
          <>
            <Button tw="mb-4" onPress={() => navigation.navigate(ScreenName.updatRoleEmployee)}>
              Đổi chức vụ
            </Button>

            <Button tw="mb-4" type="secondary" onPress={handleDisabled}>
              Vô hiệu hóa nhân viên
            </Button>

            {/* Ẩn button Kích hoạt */}
            <Button tw="mb-4" style={{ display: 'none' }}>
              Kích hoạt nhân viên
            </Button>
          </>
        )}

        {data.status === 'disabled' && (
          <>
            {/* Ẩn button Đổi chức vụ */}
            <Button tw="mb-4" style={{ display: 'none' }}>
              Đổi chức vụ
            </Button>

            {/* Ẩn button Vô hiệu hóa nhân viên */}
            <Button tw="mb-4" type="secondary" style={{ display: 'none' }}>
              Vô hiệu hóa nhân viên
            </Button>

            {/* Hiển thị button Kích hoạt */}
            <Button tw="mb-4" onPress={handleActive}>
              Kích hoạt nhân viên
            </Button>
          </>
        )}
      </ScrollView>
    </ContainerView>
  );
};

export default EmployeeDetailsScreen;

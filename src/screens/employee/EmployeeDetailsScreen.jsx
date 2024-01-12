import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { Color, ScreenName, accessTokenKey } from '../../common';
import {
  Button,
  ContainerView,
  Icon,
  Image,
  ScrollView,
  SubHeaderBar,
  Text,
  TouchableOpacity,
  View,
} from '../../components';
import { asyncStorageGetItem, axiosAuthDel, axiosAuthGet } from '../../configs';

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

const EmployeeDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [isModalIndicator, setIsModalIndicator] = useState(true);

  const { selectedItem } = route.params;
  // const [data, setData] = useState(selectedItem);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const response = await axiosAuthGet(`/employee/get-employee-profile/${data._id}`, token);

      console.log('Cient info:', response);
      setData(response.employee);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchData);

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  // const handleConfirm = async () => {
  //   try {
  //     setLoading(true);
  //     const token = await AsyncStorage.getItem(accessTokenKey);
  //     await axiosAuthDel(`/client/delete-client/${data._id}`, token);
  //     console.log('Client deleted successfully');

  //     hidePopup();
  //     // Navigate back to the previous screen
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error('Error deleting client:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEdit = () => {
    navigation.navigate('AddClient', { editData: data });
  };

  const formatBirthday = (birthdayString) => {
    const date = new Date(birthdayString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const mapGenderToVietnamese = (gender) => {
    return gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : '';
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
          {/* <Image
            tw="mb-3.5 h-32 w-32 rounded-full"
            source={data.avatar ? { uri: data.avatar } : { uri: 'https://picsum.photos/700' }}
          />

          <Text tw="mb-3.5 text-primary text-2xl font-bold">{data.name}</Text>

          <Text tw="mb-3.5 text-primary text-lg font-bold">{data.role}</Text> */}

          <TextRow label="Ngày sinh" value="18/01/2000" />
          {/* <TextRow label="Giới tính" value={data.gender} />
          <TextRow label="Số điện thoại" value={data.phone} />
          <TextRow label="Email" value={data.email} />
          <TextRow label="Địa chỉ" value={data.address} /> */}
          <TextRow label="Tài khoản" value="active" />
        </View>

        <Button tw="mb-4" onPress={() => navigation.navigate(ScreenName.updatRoleEmployee)}>
          Đổi chức vụ
        </Button>
      </ScrollView>
    </ContainerView>
  );
};

export default EmployeeDetailsScreen;

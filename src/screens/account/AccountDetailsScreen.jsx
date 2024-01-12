import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { Color, accessTokenKey } from '../../common';
import {
  ContainerView,
  Icon,
  Image,
  ScrollView,
  SubHeaderBar,
  Text,
  TouchableOpacity,
  View,
} from '../../components';
import { asyncStorageGetItem, axiosAuthGet } from '../../configs';

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

const AccountDetailsScreen = () => {
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [isModalIndicator, setIsModalIndicator] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await asyncStorageGetItem(accessTokenKey);
      const response = await axiosAuthGet('/employee/get-employee-profile', {}, token);
      console.log(response);
    })();
  }, []);

  const handleOnEdit = () => {
    console.log('handleOnEdit');
  };

  return (
    <ContainerView tw="px-0">
      <SubHeaderBar tw="-mb-2 mx-5" title="Cá nhân" backButton={false} onEditPress={handleOnEdit} />

      <ScrollView>
        <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
          <Image
            tw="mb-3.5 h-32 w-32 rounded-full"
            source={data.avatar ? { uri: data.avatar } : { uri: 'https://picsum.photos/700' }}
          />

          <Text tw="mb-3.5 text-primary text-2xl font-bold">{data.name}</Text>

          <Text tw="mb-3.5 text-primary text-lg font-bold">{data.role}</Text>

          <TextRow label="Ngày sinh" value={data.birthDay} />
          <TextRow label="Giới tính" value={data.gender} />
          <TextRow label="Số điện thoại" value={data.phone} />
          <TextRow label="Email" value={data.email} />
          <TextRow label="Địa chỉ" value={data.address} />
          <TextRow label="Tài khoản" value="active" />
        </View>
        <View tw="pb-4">
          <TouchableOpacity
            tw="self-start mx-5 pr-4 items-center justify-center"
            onPress={() => console.log('Settings')}>
            <View tw="flex-row items-center">
              <Icon source={require('../../assets/icons/Lock.png')} color={Color.primary} />
              <Text tw="ml-2 text-base font-bold text-primary">Đổi mật khẩu</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View tw="pb-4">
          <TouchableOpacity
            tw="self-start mx-5 pr-4 items-center justify-center"
            onPress={() => console.log('Settings')}>
            <View tw="flex-row items-center">
              <Icon
                source={require('../../assets/icons/SettingsOutline.png')}
                color={Color.primary}
              />
              <Text tw="ml-2 text-base font-bold text-primary">Cài đặt</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContainerView>
  );
};

export default AccountDetailsScreen;

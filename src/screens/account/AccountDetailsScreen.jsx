import React from 'react';
import {
  ContainerView,
  FilterBar,
  Icon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Searchbar,
  SubHeaderBar,
  Text,
  TouchableOpacity,
  View,
} from '../../components';
import { Color } from '../../common';

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
    <View tw="mb-2 flex-row self-start">
      <View tw="items-end mr-6 min-w-[95px]">
        <Text tw={`color-neutral2 text-base text-neutral2`}>{label}</Text>
      </View>
      <Text tw={`flex-1 text-base ${textColor}`}>{displayText}</Text>
    </View>
  );
};

const AccountDetailsScreen = () => {
  const handleOnEdit = () => {
    console.log('handleOnEdit');
  };

  return (
    <ContainerView tw="px-0">
      <SubHeaderBar
        tw="-mt-2 mx-5"
        title={'Cá nhân'}
        backButton={false}
        onEditPress={handleOnEdit}
      />

      <ScrollView>
        <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
          <Image tw="mb-3.5 h-32 w-32 rounded-full" source={{ uri: 'https://picsum.photos/700' }} />

          <Text tw="mb-3.5 text-2xl font-bold">Họ Và Tên</Text>

          <Text tw="mb-3.5 text-lg font-bold">Chức vụ</Text>

          <TextRow label="Ngày sinh" value="28/06/2001" />
          <TextRow label="Giới tính" value="Nam" />
          <TextRow label="Số điện thoại" value="0905123456" />
          <TextRow label="Email" value="email@gmail.com" />
          <TextRow label="Địa chỉ" value="123 Trần Cao Vân" />
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

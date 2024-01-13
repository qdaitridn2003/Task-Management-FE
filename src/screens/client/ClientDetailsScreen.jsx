import {
  ActivityIndicator,
  Button,
  ContainerView,
  Image,
  ScrollView,
  SubHeaderBar,
  Text,
  View,
} from '../../components';
import { Color, ScreenName, accessTokenKey } from '../../common';

import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { asyncStorageGetItem, axiosAuthGet, axiosAuthPut } from '../../configs';
import { ClientContext } from '../../contexts';
import { format } from 'date-fns';

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

const ClientDetailsScreen = () => {
  const navigation = useNavigation();
  const { clientId, edit, setEdit, fetchData } = useContext(ClientContext);
  const [data, setData] = useState({});
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleOnEdit = () => {
    navigation.navigate(ScreenName.updateClient);
  };

  useEffect(() => {
    (async () => {
      const token = await asyncStorageGetItem(accessTokenKey);
      // console.log('clientIdDetails:', clientId);
      const response = await axiosAuthGet(`/client/get-client-detail/${clientId}`, token, {});
      // console.log('Response: ', response);
      if (response) {
        const formattedDate = format(new Date(response.birthday), 'dd/MM/yyyy');
        setFormatBirthday(formattedDate);
        setData(response);
        setIsLoading(false);
      }
    })();
  }, [edit]);

  const handleChangeStatus = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthPut(`client/update-client-status/${clientId}`, token, {
      status: 'active',
    });
    if (response) {
      console.log(response);
      setEdit(edit + 1);

      fetchData(1, 'disabled');
    }
  };
  return (
    <ContainerView tw="px-0">
      <SubHeaderBar
        tw="-mb-2 mx-5"
        title="Thông tin khách hàng"
        onBackPress={() => navigation.navigate(ScreenName.clientList)}
        onEditPress={data.status === 'active' ? handleOnEdit : false}
      />

      {isLoading ? (
        <ActivityIndicator size={40} color={Color.primary} />
      ) : (
        <ScrollView>
          <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
            <Image
              tw="mb-3.5 h-32 w-32 rounded-full"
              source={data.avatar ? { uri: avatar } : require('../../assets/images/AddAvatar.jpeg')}
            />

            <Text tw="mb-3.5 text-primary text-2xl font-bold">{data.name}</Text>

            <TextRow label="Ngày sinh" value={formatBirthday} />
            <TextRow label="Giới tính" value={data.gender} />
            <TextRow label="Số điện thoại" value={data.phone} />
            <TextRow label="Email" value={data.email} />
            <TextRow label="Địa chỉ" value={data.address} />
            <TextRow label="Trạng thái" value={data.status} />
          </View>
          {data.status === 'disabled' ? (
            <Button children={'Khôi phục'} onPress={handleChangeStatus} />
          ) : (
            false
          )}
        </ScrollView>
      )}
    </ContainerView>
  );
};

export default ClientDetailsScreen;

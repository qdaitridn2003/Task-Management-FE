import {
  ActivityIndicator,
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

import { asyncStorageGetItem, axiosAuthGet } from '../../configs';
import { ClientContext } from '../../contexts';
import { format } from 'date-fns';

const TextRow = ({ label, value }) => {
  let textColor = '';
  let displayText = value;
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
  const { clientId, edit } = useContext(ClientContext);
  const [data, setData] = useState({});
  const [formatBirthday, setFormatBirthday] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleOnEdit = () => {
    navigation.navigate(ScreenName.updateClient);
  };

  useEffect(() => {
    (async () => {
      const token = await asyncStorageGetItem(accessTokenKey);
      console.log(clientId);
      const response = await axiosAuthGet(`/client/get-client-detail/${clientId}`, {}, token);
      if (response) {
        const formattedDate = format(new Date(response.data.birthday), 'dd/MM/yyyy');
        setFormatBirthday(formattedDate);
        setData(response.data);
        setIsLoading(false);
      }
    })();
  }, [edit]);

  return (
    <ContainerView tw="px-0">
      <SubHeaderBar
        tw="-mb-2 mx-5"
        title="Thông tin khách hàng"
        onBackPress={() => navigation.navigate(ScreenName.clientList)}
        onEditPress={handleOnEdit}
      />

      {isLoading ? (
        <ActivityIndicator size={40} color={Color.primary} />
      ) : (
        <ScrollView>
          <View tw="p-5 mt-2 mb-4 mx-5 rounded-2xl elevation items-center">
            <Image
              tw="mb-3.5 h-32 w-32 rounded-full"
              source={
                data.avatar ? { uri: data.avatar } : require('../../assets/images/AddAvatar.jpeg')
              }
            />

            <Text tw="mb-3.5 text-primary text-2xl font-bold">{data.name}</Text>

            <TextRow label="Ngày sinh" value={formatBirthday} />
            <TextRow label="Giới tính" value={data.gender} />
            <TextRow label="Số điện thoại" value={data.phone} />
            <TextRow label="Email" value={data.email} />
            <TextRow label="Địa chỉ" value={data.address} />
          </View>
        </ScrollView>
      )}
    </ContainerView>
  );
};

export default ClientDetailsScreen;

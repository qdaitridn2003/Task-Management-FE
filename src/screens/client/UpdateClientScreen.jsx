import React, { useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  ContainerView,
  Icon,
  ScrollView,
  Image,
  TextInputWithLabel,
  TouchableOpacity,
  DateTimePickerWithLabel,
  RadioButtonOptionGender,
  Button,
  ActivityIndicator,
} from '../../components';
import { ScreenName, accessTokenKey, Color } from '../../common';
import { add, format, set } from 'date-fns';
import { asyncStorageGetItem, axiosAuthGet, axiosAuthPost, axiosAuthPut } from '../../configs';
import { ClientContext } from '../../contexts';
import { uploadImage } from '../../utilities/uploadImage';
const UpdateClientScreen = () => {
  const navigation = useNavigation();
  const { clientId, edit, setEdit } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const imagePicker = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('Image: ', assets[0].uri);

      if (!canceled) {
        const imageUri = assets[0].uri;
        const result = await uploadImage('/client/upload-image/', imageUri, 'avatar');
        if (result) {
          setAvatar(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateClient = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    // console.log(token);
    const response = await axiosAuthPut(`/client/update-info-client/${clientId}`, token, {
      email,
      fullName: name,
      gender,
      dateOfBirth: birthday,
      phoneNumber: phone,
      address,
      avatarUrl: avatar,
    });
    console.log(response);
    if (!email) {
      handleErrors('Email không được để trống', 'email');
    } else if (response.message === 'Email không hợp lệ') {
      handleErrors('Email không hợp lệ', 'email');
    }
    if (!name) {
      handleErrors('Tên không được để trống', 'name');
    }
    if (!phone) {
      handleErrors('Số điện thoại không được để trống', 'phone');
    }
    if (response) {
      navigation.navigate(ScreenName.clientDetails);
      setEdit(edit + 1);
    }
  };

  useEffect(() => {
    (async () => {
      const token = await asyncStorageGetItem(accessTokenKey);
      const response = await axiosAuthGet(`/client/get-client-detail/${clientId}`, {}, token);
      if (response) {
        const formattedDate = format(new Date(response.data.birthday), 'yyyy-MM-dd');
        setName(response.data.name);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setBirthday(formattedDate);
        setAvatar(response.data.avatar);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <ScrollView tw="flex justify-content bg-white">
      <ContainerView>
        {isLoading ? (
          <ActivityIndicator size={40} color={Color.primary} />
        ) : (
          <View>
            <View tw="flex flex-row justify-between mx-6">
              <TouchableOpacity onPress={() => navigation.navigate(ScreenName.clientDetails)}>
                <Icon size={24} source={require('../../assets/icons/Back.png')} />
              </TouchableOpacity>
              <Text tw="text-lg font-semibold">Sửa khách hàng</Text>
              <View tw="w-6"></View>
            </View>

            <View tw="mt-4 py-2 items-center min-h-32">
              <TouchableOpacity onPress={imagePicker}>
                <Image
                  tw="w-20 h-20 rounded-full"
                  source={avatar ? { uri: avatar } : require('../../assets/images/AddAvatar.jpeg')}
                />
                <View tw="w-6 h-6 p-1 absolute bottom-0 right-0 rounded-full">
                  <Image tw="w-4 h-4 " source={require('../../assets/icons/AddPhoto.png')} />
                </View>
              </TouchableOpacity>
              <View>
                <Text style={{ color: Color.primary }} tw="mt-4 text-sm">
                  Nhấn vào hình để tải lên ảnh mới
                </Text>
              </View>
            </View>

            <TextInputWithLabel
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={name}
              onChangeText={(text) => setName(text)}
              onFocus={() => handleErrors(null, 'name')}
              error={errors.name}
            />

            <DateTimePickerWithLabel
              value={birthday}
              onChange={(text) => setBirthday(text)}
              label="Ngày sinh"
              type="birthday"
              mode="date"
            />

            <RadioButtonOptionGender
              label="Giới tính"
              onValueChange={(value) => setGender(value)}
              gender={gender}
            />

            <TextInputWithLabel
              label="Email"
              placeholder="Nhập email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={() => handleErrors(null, 'email')}
              error={errors.email}
            />

            <TextInputWithLabel
              label="Số điện thoại"
              value={phone}
              placeholder="Nhập số điện thoại"
              onChangeText={(text) => setPhone(text)}
              onFocus={() => handleErrors(null, 'phone')}
              error={errors.phone}
            />

            <TextInputWithLabel
              value={address}
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              onChangeText={(text) => setAddress(text)}
            />

            <Button
              tw="mb-4"
              icon={'right'}
              onPress={handleUpdateClient}
              iconSource={require('../../assets/icons/ForwardArow.png')}
              loading={false}>
              Sửa khách hàng
            </Button>
          </View>
        )}
      </ContainerView>
    </ScrollView>
  );
};

export default UpdateClientScreen;

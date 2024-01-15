import { useNavigation } from '@react-navigation/native';
import { add, format, set } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState, useEffect } from 'react';

import { ScreenName, accessTokenKey, Color } from '../../common';
import {
  View,
  Text,
  Icon,
  ScrollView,
  Image,
  TextInputWithLabel,
  TouchableOpacity,
  DateTimePickerWithLabel,
  RadioButtonOptionGender,
  Button,
  ActivityIndicator,
  ContainerView,
  SubHeaderBar,
} from '../../components';
import { asyncStorageGetItem, axiosAuthGet, axiosAuthPost, axiosAuthPut } from '../../configs';
import { ClientContext, EmployeeContext } from '../../contexts';
import { uploadImage } from '../../utilities/uploadImage';
import { ToastAndroid } from 'react-native';

const EditAccountScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const [birthday, setBirthday] = useState(data.birthday);
  const [phone, setPhone] = useState(data.phone);
  const [address, setAddress] = useState(data.address);
  const [avatar, setAvatar] = useState(data.avatar);
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    phone: '',
  });

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
        const result = await uploadImage('/employee/upload-image/', imageUri, 'avatar');
        if (result) {
          setAvatar(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleUpdateEmployee = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    // console.log(token);
    const response = await axiosAuthPut(`/employee/update-employee-profile`, token, {
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
      ToastAndroid.show('Cật nhật thành công', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.accountDetails);
    }
  };

  useEffect(() => {
    const formattedBirthday = data.birthday ? format(new Date(data.birthday), 'yyyy-MM-dd') : '';

    setName(data.name || '');
    setGender(data.gender || '');
    setEmail(data.email || '');
    setBirthday(formattedBirthday);
    setPhone(data.phone || '');
    setAddress(data.address || '');
    setAvatar(data.avatar || '');
  }, [data]);

  return (
    <ScrollView className="bg-white" showsHorizontalScrollIndicator="false">
      <ContainerView>
        {isLoading ? (
          <ActivityIndicator size={40} color={Color.primary} />
        ) : (
          <View>
            <SubHeaderBar
              tw="-mb-2 mx-5"
              title="Sửa thông tin"
              onBackPress={() => navigation.navigate(ScreenName.accountDetails)}
            />

            <View className="mt-4 py-2 items-center min-h-32">
              <TouchableOpacity onPress={imagePicker}>
                <Image
                  className="w-20 h-20 rounded-full"
                  source={avatar ? { uri: avatar } : require('../../assets/images/AddAvatar.jpeg')}
                />
                <View className="w-6 h-6 p-1 absolute bottom-0 right-0 rounded-full">
                  <Image className="w-4 h-4 " source={require('../../assets/icons/AddPhoto.png')} />
                </View>
              </TouchableOpacity>
              <View>
                <Text style={{ color: Color.primary }} className="mt-4 text-sm">
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
              type="birthDay"
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
              className="mb-4"
              icon="right"
              onPress={handleUpdateEmployee}
              iconSource={require('../../assets/icons/ForwardArow.png')}
              loading={false}>
              Cật nhật
            </Button>
          </View>
        )}
      </ContainerView>
    </ScrollView>
  );
};

export default EditAccountScreen;

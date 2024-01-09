import { Color } from '../../common';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

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
} from '../../components';
import { axiosGet, axiosPost, axiosAuthPost } from '../../configs';
import { uploadImage } from '../../utilities/uploadImage';

const AddClientScreen = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const imagePicker = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log('Image: ', assets[0].uri);

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

  // const handleAddClient = async () => {
  //   const respone = await axiosAuthPost('/client/create-info-client', {
  //     email,
  //     fullName: name,
  //     gender,
  //     dateOfBirth: birthday,
  //     phoneNumber: phone,
  //     address,
  //     avatarUrl: avatar,
  //   });
  //   console.log(respone);
  // };

  return (
    <ScrollView>
      <ContainerView>
        <View tw="flex flex-row justify-between mx-6">
          <Icon size={24} source={require('../../assets/icons/Back.png')} />
          <Text tw="text-lg font-semibold">Thêm khách hàng</Text>
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
          onChangeText={(text) => setName(text)}
        />

        <DateTimePickerWithLabel
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
          onChangeText={(text) => setEmail(text)}
        />

        <TextInputWithLabel
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          onChangeText={(text) => setPhone(text)}
        />

        <TextInputWithLabel
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          onChangeText={(text) => setAddress(text)}
        />

        <Button
          tw="mb-4"
          icon={'right'}
          onPress={handleAddClient}
          iconSource={require('../../assets/icons/ForwardArow.png')}
          loading={false}>
          Thêm khách hàng
        </Button>
      </ContainerView>
    </ScrollView>
  );
};

export default AddClientScreen;

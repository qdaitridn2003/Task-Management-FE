import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';

import {
  Button,
  ContainerView,
  DateTimePickerWithLabel,
  RadioButtonOptionGender,
  Text,
  TextInputWithLabel,
  View,
} from '../../components';
import { axiosPut } from '../../configs';
import { AuthContext } from '../../contexts';
import { ScreenName } from '../../common';

const AddEmployee = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(AuthContext);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [birthday, setBirthday] = useState();
  const [isFocus, setIsFocus] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const email = route.params?.email || '';
  const authId = route.params?.authId || '';

  useEffect(() => {
    // console.log('Email from SignInScreen:', email);
    // console.log('AuthId from SignInScreen:', authId);
  }, [email, authId]);

  const AddEmployees = async () => {
    if (!inputs.name) {
      handleErrors('Vui lòng nhập họ và tên', 'name');
    } else {
      handleErrors('', 'name');
    }
    if (!inputs.phone) {
      handleErrors('Vui lòng nhập số điện thoại', 'phone');
    } else if (!/^\d{10}$/.test(inputs.phone)) {
      handleErrors('Số điện thoại phải có đúng 10 số', 'phone');
    } else {
      handleErrors('', 'phone');
    }
    if (!inputs.address) {
      handleErrors('Vui lòng nhập họ và tên', 'address');
    } else {
      handleErrors('', 'address');
    }

    const response = await axiosPut('/employee/register-employee-profile', {
      username: email,
      authId,
      fullName: inputs.name,
      phoneNumber: inputs.phone,
      address: inputs.address,
      gender: gender,
    });

    console.log(response);
    if (inputs.name && inputs.phone && inputs.address) {
      navigation.navigate(ScreenName.signIn);
      ToastAndroid.show('Tạo thành công', ToastAndroid.SHORT);
    }
  };

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Tạo nhân viên</Text>

          <TextInputWithLabel
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            onChangeText={(text) => setInputs({ ...inputs, name: text })}
            onFocus={() => {
              setErrors((prevState) => ({ ...prevState, name: '' }));
              setIsFocus('name');
            }}
            value={inputs.name}
            error={errors.name}
          />
          <TextInputWithLabel
            label="Số điện thoại"
            placeholder="0326252558"
            onChangeText={(text) => setInputs({ ...inputs, phone: text })}
            onFocus={() => {
              setErrors((prevState) => ({ ...prevState, phone: '' }));
              setIsFocus('phone');
            }}
            value={inputs.phone}
            error={errors.phone}
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
            label="Địa chỉ"
            placeholder="12 Nguyễn Thị Thập"
            onChangeText={(text) => setInputs({ ...inputs, address: text })}
            onFocus={() => {
              setErrors((prevState) => ({ ...prevState, address: '' }));
              setIsFocus('address');
            }}
            value={inputs.address}
            error={errors.address}
          />

          <Button tw="mb-4 mt-8" onPress={AddEmployees} loading={isLoading}>
            Tạo nhân viên
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default AddEmployee;

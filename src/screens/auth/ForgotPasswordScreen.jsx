import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import * as yup from 'yup';

import { Color, ScreenName, emailRegisterKey, otpSecretKey } from '../../common';
import {
  Button,
  ContainerView,
  Image,
  SubHeaderBar,
  Text,
  TextInputWithLabel,
  View,
} from '../../components';
import { axiosPost } from '../../configs';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  // const [firstSend, setFirstSend] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    otp: '',
  });

  const handleBtnSendEmail = async () => {
    Keyboard.dismiss();
    const response = await axiosPost('/auth/forgot-password', { username: inputs.email });

    if (!inputs.email) {
      ToastAndroid('Vui lòng nhập email khôi phục', ToastAndroid.SHORT);
    } else if (response.message === 'Account is not exist') {
      ToastAndroid('Email chưa được đăng ký', ToastAndroid.SHORT);
    }
    if (response.otpSecret) {
      console.log(response);
      await AsyncStorage.setItem(otpSecretKey, response.otpSecret);
      await AsyncStorage.setItem(emailRegisterKey, inputs.email);

      ToastAndroid.show('Đã gửi mã OTP. Vui lòng check email.', ToastAndroid.SHORT);
    }
  };

  const handleVerifiedOtp = async () => {
    Keyboard.dismiss();
    const otpSecret = await AsyncStorage.getItem(otpSecretKey);
    const response = await axiosPost('/auth/verify-otp/reset-password', {
      otp: inputs.otp,
      otpSecret,
    });
    if (!inputs.otp) {
      ToastAndroid('Vui lòng nhập mã OTP');
    } else if (inputs.otp.length > 6 || inputs.otp.length < 6) {
      ToastAndroid('Mã OTP Phải có 6 số');
    } else if (response.message === 'Otp was expired or invalid') {
      ToastAndroid('Otp đã hết hạn hoặc không hợp lệ');
    }
    if (response.username) {
      navigation.navigate(ScreenName.resetPassword);
    }
  };

  return (
    <ContainerView>
      <SubHeaderBar tw="pb-4 ml-3" onBackPress={() => navigation.goBack()} />

      <Image
        tw="mb-4 self-center"
        style={{ width: 121, height: 112 }}
        source={require('../../assets/images/ForgotPassword.png')}
      />

      <Text tw="self-center text-2xl font-semibold pb-4">Khôi phục mật khẩu</Text>

      <Text tw="self-center text-sm p-2 pb-6 text-center" style={{ color: Color.neutral2 }}>
        Vui lòng nhập địa chỉ email của bạn để nhận được email khôi phục mật khẩu
      </Text>

      <TextInputWithLabel
        label="Email"
        placeholder="admin@gmail.com"
        onChangeText={(text) => setInputs({ ...inputs, email: text })}
        value={inputs.email}
        error={errors.email}
      />

      <View tw="flex-row items-center pb-4">
        <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
        <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
      </View>

      <View>
        <View tw="flex flex-row">
          <TextInputWithLabel
            label="OTP"
            placeholder="Nhập mã OTP"
            tw="w-8/12 mr-0"
            onChangeText={(text) => setInputs({ ...inputs, otp: text })}
            value={inputs.otp}
            error={errors.otp}
          />
          <Button type="secondary" tw="flex justify-end mb-5 ml-1" onPress={handleBtnSendEmail}>
            Gửi mã
          </Button>
        </View>

        <Button tw="mb-4" onPress={handleVerifiedOtp}>
          Xác nhận
        </Button>
      </View>
    </ContainerView>
  );
};

export default ForgotPasswordScreen;

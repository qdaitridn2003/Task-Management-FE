import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, ToastAndroid } from 'react-native';

import { Color, ScreenName, emailRegisterKey, otpSecretKey } from '../../common';
import { ContainerView, Text, Button, TextInputWithLabel, View } from '../../components';
import { axiosPost } from '../../configs';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [countdown, setcountdown] = useState(60);
  const [showBtnResendOtp, setShowBtnResendOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFocus, setIsFocus] = useState('');
  const [firstSend, setFirstSend] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const verifiedAccount = async () => {
    const response = await axiosPost('/auth/send-otp/confirm-email', { username: inputs.email });

    if (!inputs.email) {
      handleErrors('Vui lòng nhập email', 'email');
    } else if (response.message === 'Tài khoản đã được đăng ký') {
      handleErrors('Tài khoản đã được đăng ký', 'email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErrors('Vui lòng nhập Email hợp lệ', 'email');
    } else {
      handleErrors('', 'email');
    }

    if (!inputs.password) {
      handleErrors('Vui lòng nhập mật khẩu', 'password');
    } else if (inputs.password.length < 6) {
      handleErrors('Mật khẩu phải có ít nhất 6 ký tự', 'password');
    } else {
      handleErrors('', 'password');
    }

    if (!inputs.confirmPassword) {
      handleErrors('Vui lòng nhập lại mật khẩu', 'confirmPassword');
    } else if (inputs.confirmPassword !== inputs.password) {
      handleErrors('Mật khẩu không trùng khớp', 'confirmPassword');
    } else {
      handleErrors('', 'confirmPassword');
    }

    // if (!errors.email && !errors.password && !errors.confirmPassword) {
    if (inputs.email && inputs.password && inputs.confirmPassword) {
      console.log(response);
      if (response.otpSecret) {
        setFirstSend(false);
        setcountdown(60);

        await AsyncStorage.setItem(otpSecretKey, response.otpSecret);
        await AsyncStorage.setItem(emailRegisterKey, inputs.email);

        ToastAndroid.show('Đã gửi mã OTP. Vui lòng kiểm tra email.', ToastAndroid.SHORT);
      }
    }
  };

  // const handleVerifiedOtp = async () => {
  //   const otpSecret = await AsyncStorage.getItem(otpSecretKey);
  //   const response = await axiosPost('/auth/verify-otp', {
  //     // username: inputs.email,
  //     otp: inputOtp,
  //     otpSecret,
  //   });

  //   if (!inputOtp) {
  //     handleErrors('Vui lòng nhập mã OTP', 'inputOtp');
  //   } else if (inputOtp.length !== 6 || !/^\d+$/.test(inputOtp)) {
  //     handleErrors('Mã OTP phải là 6 số', 'inputOtp');
  //   } else if (response.message === 'Otp was expired or invalid') {
  //     handleErrors('Mã OTP đã hết hạn hoặc không hợp lệ', 'inputOtp');
  //   } else {
  //     handleErrors('', 'inputOtp'); // Reset lỗi nếu không có lỗi
  //     registerHandler(); // Gọi hàm đăng ký khi OTP hợp lệ
  //   }
  // };

  const handleResendOtp = async () => {
    setShowBtnResendOtp(false);
    setcountdown(60);
    const email = await AsyncStorage.getItem(emailRegisterKey);
    const responseResendOtp = await axiosPost('/auth/resend-otp/confirm-email', {
      username: email,
    });
    await AsyncStorage.setItem(otpSecretKey, responseResendOtp.otpSecret);
    console.log(email);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setcountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      setShowBtnResendOtp(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const registerHandler = async () => {
    const otpSecret = await AsyncStorage.getItem(otpSecretKey);
    Keyboard.dismiss();
    const response = await axiosPost('/auth/sign-up', {
      username: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      otp: inputs.otp,
      otpSecret,
    });

    if (!inputs.otp) {
      ToastAndroid('Vui lòng nhập mã OTP', ToastAndroid.SHORT);
    } else if (inputs.otp.length > 6 || inputs.otp.length < 6) {
      ToastAndroid('Mã OTP Phải có 6 số', ToastAndroid.SHORT);
    } else if (response.message === 'Otp was expired or invalid') {
      ToastAndroid('Otp đã hết hạn hoặc không hợp lệ', ToastAndroid.SHORT);
    } else if (response) {
      ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.signIn);
    }
  };

  return (
    <ContainerView>
      <Text tw="self-center text-2xl font-semibold py-4">Đăng ký</Text>
      <TextInputWithLabel
        label="Email"
        placeholder="Địa chỉ email"
        onChangeText={(text) => setInputs({ ...inputs, email: text })}
        onFocus={() => {
          setErrors((prevState) => ({ ...prevState, email: '' }));
          setIsFocus('email');
        }}
        value={inputs.email}
        error={errors.email}
      />
      <TextInputWithLabel
        label="Mật khẩu"
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, password: text })}
        onFocus={() => {
          setErrors((prevState) => ({ ...prevState, password: '' }));
          setIsFocus('password');
        }}
        value={inputs.password}
        error={errors.password}
      />
      <TextInputWithLabel
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, confirmPassword: text })}
        onFocus={() => {
          setErrors((prevState) => ({ ...prevState, confirmPassword: '' }));
          setIsFocus('confirmPassword');
        }}
        value={inputs.confirmPassword}
        error={errors.confirmPassword}
      />

      <View tw="flex flex-row">
        <TextInputWithLabel
          label="OTP"
          placeholder="Nhập mã OTP"
          tw="w-8/12 mr-0"
          onChangeText={(text) => setInputs({ ...inputs, otp: text })}
          value={inputs.otp}
          error={errors.otp}
        />
        <Button type="secondary" tw="flex justify-end mb-5 ml-1" onPress={verifiedAccount}>
          Gửi mã
        </Button>
      </View>

      <Button tw="mb-4" onPress={registerHandler}>
        Đăng ký
      </Button>

      <View tw="flex-row items-center pb-4">
        <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
        <Text tw="px-2 text-base" style={{ color: Color.neutral2 }}>
          Hoặc
        </Text>
        <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
      </View>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.signIn)}>
        Đăng nhập
      </Button>
    </ContainerView>
  );
};

export default SignUpScreen;

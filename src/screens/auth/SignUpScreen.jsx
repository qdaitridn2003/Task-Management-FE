import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, ToastAndroid } from 'react-native';

import { Color, ScreenName, emailRegisterKey, otpSecretKey } from '../../common';
import { TextInput, View, Text, TouchableOpacity } from '../../components';
import CustomButton from '../../components/customs/CustomButtonSignUp';
import CustomInput from '../../components/customs/CustomInput';
import CustomPassInput from '../../components/customs/CustomPassInput';
import { axiosPost } from '../../configs';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [countdown, setcountdown] = useState(60);
  const [showBtnResendOtp, setShowBtnResendOtp] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [firstSend, setFirstSend] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const verifiedAccount = async () => {
    const response = await axiosPost('/auth/send-otp/confirm-email', { username: inputs.email });

    if (!inputs.email) {
      handleErrors('Vui lòng nhập email', 'email');
    } else if (response.message === 'Account already exists') {
      handleErrors('Email đã tồn tại', 'email');
    } else if (
      !inputs.email ||
      typeof inputs.email !== 'string' ||
      !inputs.email.match(/\S+@\S+\.\S+/)
    ) {
      handleErrors('Vui lòng nhập Email hợp lệ', 'email');
    }

    if (!inputs.password) {
      handleErrors('Vui lòng nhập mật khẩu', 'password');
    } else if (inputs.password.length < 6) {
      handleErrors('Mật khẩu phải có ít nhất 6 ký tự', 'password');
    }

    if (!inputs.confirmPassword) {
      handleErrors('Vui lòng nhập lại mật khẩu', 'confirmPassword');
    } else if (inputs.confirmPassword !== inputs.password) {
      handleErrors('Mật khẩu không trùng khớp', 'confirmPassword');
    }

    // if (!errors.email && !errors.password && !errors.confirmPassword) {
    if (inputs.email && inputs.password && inputs.confirmPassword) {
      // console.log(response);
      if (response.otpSecret) {
        // console.log(inputs.email);
        // console.log(inputs.password);

        setFirstSend(false);
        setcountdown(60);

        await AsyncStorage.setItem(otpSecretKey, response.otpSecret);
        await AsyncStorage.setItem(emailRegisterKey, inputs.email);
      }
    }
  };

  const handleVerifiedOtp = async () => {
    const otpSecret = await AsyncStorage.getItem(otpSecretKey);
    const response = await axiosPost('/auth/verify-otp', {
      // username: inputs.email,
      otp: inputOtp,
      otpSecret,
    });

    if (!inputOtp) {
      handleErrors('Vui lòng nhập mã OTP', 'inputOtp');
    } else if (inputOtp.length !== 6 || !/^\d+$/.test(inputOtp)) {
      handleErrors('Mã OTP phải là 6 số', 'inputOtp');
    } else if (response.message === 'Otp was expired or invalid') {
      handleErrors('Mã OTP đã hết hạn hoặc không hợp lệ', 'inputOtp');
    } else {
      handleErrors('', 'inputOtp'); // Reset lỗi nếu không có lỗi
      registerHandler(); // Gọi hàm đăng ký khi OTP hợp lệ
    }
  };

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
    // console.log('otpSecret: ' + otpSecret);
    Keyboard.dismiss();
    const response = await axiosPost('/auth/sign-up', {
      username: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      otp: inputOtp,
      otpSecret,
    });

    if (!inputOtp) {
      handleErrors('Vui lòng nhập mã OTP');
    } else if (inputOtp.length > 6 || inputOtp.length < 6) {
      handleErrors('Mã OTP Phải có 6 số');
    } else if (response.message === 'Otp was expired or invalid') {
      handleErrors('Otp đã hết hạn hoặc không hợp lệ');
    }
    console.log(response);
    if (response) {
      ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.signIn);
    }
  };

  return (
    <View className="flex flex-col bg-white w-full px-5 py-6">
      <View className="flex items-center justify-center mt-10">
        <Text className="text-2xl font-bold text-midnightblue">Đăng ký</Text>
      </View>
      <CustomInput
        placeholder="Nhập email đăng ký"
        label="Email"
        keyboardType="email-address"
        onChangeText={(text) => handleOnChange(text, 'email')}
        error={errors.email}
        onFocus={() => handleErrors(null, 'email')}
      />

      <CustomPassInput
        label="Mật khẩu"
        placeholder="Nhập mật khẩu đăng ký"
        onChange={(text) => handleOnChange(text, 'password')}
        error={errors.password}
        onFocus={() => handleErrors(null, 'password')}
      />

      <CustomPassInput
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu đăng ký"
        onChange={(text) => handleOnChange(text, 'confirmPassword')}
        error={errors.confirmPassword}
        onFocus={() => handleErrors(null, 'confirmPassword')}
      />

      <View>
        <TextInput
          theme={{ colors: { onSurfaceVariant: Color.neutral2 } }}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nhập mã"
          mode="outlined"
          outlineColor="transparent"
          outlineStyle={{
            backgroundColor: Color.neutral4,
            elevation: 4,
            borderRadius: 16,
          }}
          contentStyle={{ paddingHorizontal: 25 }}
          keyboardType="numeric"
          onChangeText={(text) => setInputOtp(text)}
          // onFocus={() => setErrors(null)}
        />
        {firstSend ? (
          <TouchableOpacity onPress={verifiedAccount}>
            <Text>Gửi mã</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {showBtnResendOtp === true ? (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text>Gửi lại mã</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text>Gửi lại mã ({countdown}s)</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <CustomButton title="Đăng ký" onPress={handleVerifiedOtp} />

      {/* <View style={[styles.footer, styles.titleSpaceBlock]}>
        <Text style={[styles.chaCTi, styles.ngKTypo]}>Đã có tài khoản?</Text>
        <Text style={[styles.ngK, styles.ngKTypo]} onPress={() => navigation.navigate('Login')}>
          Đăng nhập
        </Text>
      </View> */}
    </View>
  );
};

export default SignUpScreen;

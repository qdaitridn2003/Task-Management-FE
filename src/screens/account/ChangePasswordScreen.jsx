import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

import { ScreenName, emailRegisterKey } from '../../common';
import { Button, Text, TextInputWithLabel, View } from '../../components';
import { axiosPut } from '../../configs';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const emailFromStorage = await AsyncStorage.getItem(emailRegisterKey);
      setInputs((prevInputs) => ({ ...prevInputs, email: emailFromStorage }));
    };

    getEmailFromStorage();
  }, []);

  const verifiedPassword = async () => {
    if (!inputs.password) {
      ToastAndroid('Vui lòng nhập mật khẩu', ToastAndroid.SHORT);
    } else if (inputs.password.length < 6) {
      ToastAndroid('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.SHORT);
    }

    if (!inputs.confirmPassword) {
      ToastAndroid('Vui lòng nhập lại mật khẩu', ToastAndroid.SHORT);
    } else if (inputs.confirmPassword !== inputs.password) {
      ToastAndroid('Mật khẩu không trùng khớp', ToastAndroid.SHORT);
    }

    const response = await axiosPut('/auth/reset-password', {
      username: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    });

    if (response) {
      ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.signIn);
    }
  };

  return (
    <View tw="mt-10">
      <TextInputWithLabel
        label="Mật khẩu cũ"
        placeholder="Nhập mật khẩu cũ"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, password: text })}
        value={inputs.password}
      />
      <TextInputWithLabel
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, password: text })}
        value={inputs.password}
      />
      <TextInputWithLabel
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, confirmPassword: text })}
        value={inputs.confirmPassword}
      />

      <Button tw="mb-4" onPress={verifiedPassword}>
        Đổi mật khẩu
      </Button>
    </View>
  );
};

export default ChangePasswordScreen;

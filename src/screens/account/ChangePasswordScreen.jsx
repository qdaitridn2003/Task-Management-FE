import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

import { ScreenName, accessTokenKey, emailRegisterKey } from '../../common';
import { Button, Text, TextInputWithLabel, View } from '../../components';
import { axiosAuthPut, axiosPut } from '../../configs';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const emailFromStorage = await AsyncStorage.getItem(emailRegisterKey);
      setInputs((prevInputs) => ({ ...prevInputs, email: emailFromStorage }));
    };

    getEmailFromStorage();
  }, []);

  const verifiedPassword = async () => {
    const token = await AsyncStorage.getItem(accessTokenKey);
    if (!inputs.oldPassword) {
      handleErrors('Vui lòng nhập mật khẩu', 'oldPassword');
    } else if (inputs.oldPassword.length < 6) {
      handleErrors('Mật khẩu phải có ít nhất 6 ký tự', 'oldPassword');
    } else {
      handleErrors('', 'oldPassword');
    }

    if (!inputs.newPassword) {
      handleErrors('Vui lòng nhập mật khẩu', 'newPassword');
    } else if (inputs.newPassword.length < 6) {
      handleErrors('Mật khẩu phải có ít nhất 6 ký tự', 'newPassword');
    } else {
      handleErrors('', 'newPassword');
    }

    if (!inputs.confirmPassword) {
      handleErrors('Vui lòng nhập lại mật khẩu', 'confirmPassword');
    } else if (inputs.confirmPassword !== inputs.newPassword) {
      handleErrors('Mật khẩu không trùng khớp', 'confirmPassword');
    } else {
      handleErrors('', 'confirmPassword');
    }

    // console.log(token);
    const response = await axiosAuthPut('/auth/change-password', token, {
      oldPassword: inputs.oldPassword,
      newPassword: inputs.newPassword,
      confirmPassword: inputs.confirmPassword,
    });

    if (response) {
      ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
      navigation.navigate(ScreenName.accountDetails);
    }
  };

  return (
    <View tw=" flex-1 mt-10">
      <TextInputWithLabel
        label="Mật khẩu cũ"
        placeholder="Nhập mật khẩu cũ"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, oldPassword: text })}
        value={inputs.oldPassword}
        error={errors.oldPassword}
      />
      <TextInputWithLabel
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, newPassword: text })}
        value={inputs.newPassword}
        error={errors.newPassword}
      />
      <TextInputWithLabel
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        onChangeText={(text) => setInputs({ ...inputs, confirmPassword: text })}
        value={inputs.confirmPassword}
        error={errors.confirmPassword}
      />

      <Button tw="mb-4" onPress={verifiedPassword}>
        Đổi mật khẩu
      </Button>
    </View>
  );
};

export default ChangePasswordScreen;

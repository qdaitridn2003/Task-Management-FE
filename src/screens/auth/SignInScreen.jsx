import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import * as yup from 'yup';

import { Color, ScreenName, accessTokenKey, authIdKey } from '../../common';
import {
  Button,
  ContainerView,
  Text,
  TextInputWithLabel,
  TouchableOpacity,
  View,
} from '../../components';
import { axiosPost } from '../../configs';
import { AuthContext } from '../../contexts';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { setIsLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Đăng nhập</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={yup.object({
              email: yup.string().email('Email không hợp lệ').required('Nhập email để đăng nhập'),
              password: yup.string().required('Nhập mật khẩu để đăng nhập'),
            })}
            onSubmit={async (values) => {
              setIsLoading(true);

              try {
                // Call your API here
                const response = await axiosPost('/auth/sign-in', {
                  username: values.email,
                  password: values.password,
                });

                console.log('API response:', response);
                if (response.message === 'Tài khoản không tồn tại') {
                  ToastAndroid.show('Email không hợp lệ', ToastAndroid.SHORT);
                } else if (response.message === 'Mật khẩu không đúng') {
                  ToastAndroid.show('Mật khẩu không đúng', ToastAndroid.SHORT);
                } else {
                  if (response) {
                    await AsyncStorage.setItem(accessTokenKey, response.accessToken);
                    setIsLogin(true);
                  } else {
                    await AsyncStorage.setItem(authIdKey, response.data.auth_id);
                    navigation.navigate('AddEmployee', { email: values.email });
                  }
                }
              } catch (error) {
                console.log('API error:', error);
              }

              setIsLoading(false);
            }}>
            {(props) => (
              <View>
                <TextInputWithLabel
                  label="Email"
                  placeholder="Địa chỉ email"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  error={props.touched.email && props.errors.email}
                />
                <TextInputWithLabel
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                  error={props.touched.password && props.errors.password}
                />

                <TouchableOpacity
                  tw="pb-3 self-end"
                  onPress={() => navigation.navigate(ScreenName.forgotPassword)}>
                  <Text tw="py-1.5 mx-5 font-medium text-base" style={{ color: Color.primary }}>
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>

                <Button tw="mb-4" onPress={props.handleSubmit} loading={isLoading}>
                  Đăng nhập
                </Button>

                {/* Seperator */}
                <View tw="flex-row items-center pb-4">
                  <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
                  <Text tw="px-2 text-base" style={{ color: Color.neutral2 }}>
                    Hoặc
                  </Text>
                  <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }} />
                </View>

                <Button
                  tw="mb-4"
                  type="secondary"
                  onPress={() => navigation.navigate(ScreenName.signUp)}>
                  Đăng ký tài khoản
                </Button>

                <Button tw="mb-4" type="secondary" onPress={() => setIsLogin(true)}>
                  Dev Login
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default SignInScreen;

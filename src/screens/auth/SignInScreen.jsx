import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  ContainerView,
  Text,
  TextInputWithLabel,
  TouchableOpacity,
  View,
} from '../../components';
import { AuthContext } from '../../contexts';
import { Color, ScreenName } from '../../common';

import { Formik } from 'formik';
import * as yup from 'yup';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const validationSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Nhập email để đăng nhập'),
  password: yup.string().required('Nhập mật khẩu để đăng nhập'),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const { setIsLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Đăng nhập</Text>

          <TextInputWithLabel label="Email" placeholder="Địa chỉ email" value="abc" error="text" />

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setIsLoading(true);
              console.log('Form submitted with values:', values);

              /* 
              >>> CALL API HERE <<<
              */

              // Simulate API call
              setTimeout(() => {
                console.log('Simulating API call...');
                console.log('API response: Success');

                setIsLogin(true);
                setIsLoading(false);
              }, 1000);
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
                  tw="pb-3"
                  onPress={() => navigation.navigate(ScreenName.forgotPassword)}>
                  <Text tw="self-end py-1.5 font-medium text-base" style={{ color: Color.primary }}>
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>

                <Button tw="mb-4" onPress={props.handleSubmit} loading={isLoading}>
                  Đăng nhập
                </Button>

                {/* Seperator */}
                <View tw="flex-row items-center pb-4">
                  <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }}></View>
                  <Text tw="px-2 text-base" style={{ color: Color.neutral2 }}>
                    Hoặc
                  </Text>
                  <View tw="flex-1 h-0.5" style={{ backgroundColor: Color.neutral3 }}></View>
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

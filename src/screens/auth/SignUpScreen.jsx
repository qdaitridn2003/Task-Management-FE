import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as yup from 'yup';

import { Color, ScreenName } from '../../common';
import { ContainerView, Text, Button, TextInputWithLabel, View } from '../../components';

const validationSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Nhập email để đăng ký'),
  password: yup.string().required('Nhập mật khẩu để đăng ký'),
  confirmPassword: yup
    .string()
    .required('Nhập mật khẩu để ký')
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp'),
});

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Đăng ký tài khoản</Text>

          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
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

                setIsLoading(false);
                // Move to Login screen
                navigation.navigate(ScreenName.signIn);
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
                <TextInputWithLabel
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry
                  onChangeText={props.handleChange('confirmPassword')}
                  onBlur={props.handleBlur('confirmPassword')}
                  value={props.values.confirmPassword}
                  error={props.touched.confirmPassword && props.errors.confirmPassword}
                />

                <View tw="flex flex-row">
                  <TextInputWithLabel label="OTP" placeholder="Nhập mã OTP" tw="w-8/12 mr-0" />
                  <Button
                    type="secondary"
                    tw="flex justify-end mb-5 ml-1"
                    onPress={() => console.log('Gửi mã')}>
                    Gủi mã
                  </Button>
                </View>

                <Button tw="mb-4" onPress={props.handleSubmit} loading={isLoading}>
                  Đăng ký
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
                  onPress={() => navigation.navigate(ScreenName.signIn)}>
                  Đăng nhập
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default SignUpScreen;

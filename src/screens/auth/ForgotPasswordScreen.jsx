import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  ContainerView,
  Image,
  SubHeaderBar,
  Text,
  TextInputWithLabel,
  View,
} from '../../components';

import { Color } from '../../common';

import { Formik } from 'formik';
import * as yup from 'yup';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const validationSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Nhập email để khôi phục'),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView>
      <SubHeaderBar tw="pb-4" onBackPress={() => navigation.goBack()} />

      <Image
        tw="mb-4 self-center"
        style={{ width: 121, height: 112 }}
        source={require('../../assets/images/ForgotPassword.png')}></Image>

      <Text tw="self-center text-2xl font-semibold pb-4">Khôi phục mật khẩu</Text>

      <Text tw="self-center text-sm p-2 pb-6 text-center" style={{ color: Color.neutral2 }}>
        Vui lòng nhập địa chỉ email của bạn để nhận được email khôi phục mật khẩu
      </Text>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              /* 
              >>> CALL API HERE <<<
              */

              console.log('Form submitted with values:', values);
            }}>
            {(props) => (
              <View>
                <TextInputWithLabel
                  placeholder="Địa chỉ email"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  error={props.touched.email && props.errors.email}
                />

                <Button tw="mb-4" onPress={props.handleSubmit}>
                  Gửi email khôi phục
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default ForgotPasswordScreen;

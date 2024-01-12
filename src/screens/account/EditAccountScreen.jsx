import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import * as yup from 'yup';

import { Color, ScreenName, accessTokenKey } from '../../common';
import { Button, ContainerView, TextInputAccount, Text, View, ScrollView } from '../../components';
import { axiosAuthGet, axiosPut } from '../../configs';

const EditAccountScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [isModalIndicator, setIsModalIndicator] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fetchData();
    }, 0);

    return () => {
      clearInterval(interval);
    };
  }, [checkData]);

  // const fetchData = async () => {
  //   const accessToken = await AsyncStorage.getItem(accessTokenKey);
  //   const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
  //   if (respone) {
  //     setIsModalIndicator(false);
  //   }

  //   if (checkData !== respone) {
  //     setCheckData(respone);
  //     const employee = respone.employee;
  //     const date = format(new Date(employee.birthDay), 'dd/MM/yyyy');
  //     const gender = employee.gender === 'male' ? 'Nam' : 'Nữ';
  //     setData({
  //       name: employee.name,
  //       birthDay: date,
  //       gender,
  //       phone: employee.phone,
  //       address: employee.address,
  //       avatar: employee.avatar,
  //     });
  //   }
  // };

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Chỉnh sửa tài khoản</Text>

          <Formik
            initialValues={{
              email: '',
              name: '',
              address: '',
              gender: '',
              phone: '',
              birthDay: '',
            }}
            onSubmit={async (values) => {
              setIsLoading(true);
              console.log('Form submitted with values:', values);

              try {
                // const token = await AsyncStorage.getItem(accessTokenKey);
                const respone = await axiosPut('/employee/update-employee-profile', {
                  email: values.email,
                  fullName: values.name,
                  birthDay: values.birthDay,
                  phone: values.phone,
                  gender: values.gender,
                  address: values.address,
                });
                console.log(respone);
                ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
                navigation.goBack();
              } catch (error) {
                console.log('API error:', error);
              }
              navigation.navigate(ScreenName.account);
            }}>
            {(props) => (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TextInputAccount
                  label="Tên"
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={data.name}
                  error={props.touched.name && props.errors.name}
                />
                <TextInputAccount
                  label="Email"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={data.email}
                  error={props.touched.email && props.errors.email}
                />
                <TextInputAccount
                  label="Ngày sinh"
                  onChangeText={props.handleChange('birthDay')}
                  onBlur={props.handleBlur('birthDay')}
                  value={data.birthDay}
                  error={props.touched.birthDay && props.errors.birthDay}
                />
                <TextInputAccount
                  label="Giới tính"
                  onChangeText={props.handleChange('gender')}
                  onBlur={props.handleBlur('gender')}
                  value={data.gender}
                  error={props.touched.gender && props.errors.gender}
                />
                <TextInputAccount
                  label="Số điện thoại"
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={data.phone}
                  error={props.touched.phone && props.errors.phone}
                />
                <TextInputAccount
                  label="Địa chỉ"
                  onChangeText={props.handleChange('address')}
                  onBlur={props.handleBlur('address')}
                  value={data.address}
                  error={props.touched.address && props.errors.address}
                />

                <Button tw="mb-4" onPress={props.handleSubmit} loading={isLoading}>
                  Xác nhận
                </Button>
              </ScrollView>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default EditAccountScreen;

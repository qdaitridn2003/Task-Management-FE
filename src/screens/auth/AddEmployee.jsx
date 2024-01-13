import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as yup from 'yup';

import { Button, ContainerView, Text, TextInputWithLabel, View } from '../../components';
import { axiosPut } from '../../configs';
import { AuthContext } from '../../contexts';

const AddEmployee = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(AuthContext);
  const [isFocus, setIsFocus] = useState(false);
  const [genderValue, setGenderValue] = useState('Nam');

  const listGender = [{ gender: 'Nam' }, { gender: 'Nữ' }];
  const changeGender = (displayValue) => {
    if (displayValue === 'Nam') return 'nam';
    if (displayValue === 'Nữ') return 'nữ';
    return 'nam';
  };

  const email = route.params?.email || '';
  const authId = route.params?.authId || '';

  useEffect(() => {
    console.log('Email from SignInScreen:', email);
    console.log('AuthId from SignInScreen:', authId);
  }, [email, authId]);

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View tw="flex-1">
          <Text tw="self-center text-2xl font-semibold py-4">Tạo nhân viên</Text>

          <Formik
            initialValues={{ name: '', phone: '', gender: '' }}
            validationSchema={yup.object({
              name: yup.string().required('Tên không được để trống'),
              phone: yup
                .string()
                .required('Số điện thoại không được để trống')
                .matches(/^\d{1,10}$/, 'Số điện thoại phải có ít hơn 10 chữ số'),
            })}
            onSubmit={async (values) => {
              setIsLoading(true);

              try {
                const response = await axiosPut('/employee/register-employee-profile', {
                  username: email,
                  authId,
                  fullName: values.name,
                  phoneNumber: values.phone,
                  gender: changeGender(values.gender),
                });

                console.log(response);
                if (response && response.employee) {
                  setIsLogin(true);
                  ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
                }
              } catch (error) {
                console.log('API error:', error);
              }

              setIsLoading(false);
            }}>
            {(props) => (
              <View>
                <TextInputWithLabel
                  label="Tên"
                  placeholder="Nguyễn Văn A"
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                  error={props.touched.name && props.errors.name}
                />
                <TextInputWithLabel
                  label="Số điện thoại"
                  placeholder="0326252558"
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                  error={props.touched.phone && props.errors.phone}
                />

                <View tw="mx-4">
                  <Text tw="mt-4 font-bold text-xl text-indigo-800">Giới tính</Text>
                </View>
                <Dropdown
                  style="mx-4 border border-gray-500 rounded px-2"
                  placeholderStyle="text-gray-600 text-xl"
                  selectedItemStyle="text-xl"
                  iconStyle="w-5 h-5 mr-1"
                  data={listGender}
                  labelField="gender"
                  valueField="gender"
                  value={genderValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setGenderValue(item.gender);
                    setIsFocus(false);
                  }}
                />

                <Button tw="mb-4 mt-8" onPress={props.handleSubmit} loading={isLoading}>
                  Tạo nhân viên
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ContainerView>
  );
};

export default AddEmployee;

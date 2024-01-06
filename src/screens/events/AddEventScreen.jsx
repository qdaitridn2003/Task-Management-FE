import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'nativewind';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  AppBar,
  Button,
  ContainerView,
  EventCard,
  FilterBar,
  IconButton,
  Image,
  LocationTextInput,
  ScrollView,
  Searchbar,
  StatusIndicator,
  SubHeaderBar,
  Text,
  TextInput,
  View,
  SingleSelector,
  Icon,
  DateTimeButton,
  TextInputWithLabel,
  DateTimePickerWithLabel,
} from '../../components';
import { Color, ScreenName } from '../../common';
import { BackHandler, ToastAndroid, TextInput as BlankTextInput } from 'react-native';
import DateTimePickerWrapper from '../../components/customs/DateTimePickerWrapper';
import { Formik } from 'formik';
import * as Yup from 'yup';

/*
  TO DO:
  - Image picker
  - Edit event
  - Loading indicator
*/

const AddEventScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  // FORM SUBMISSION
  const initialValues = {
    eventName: '',
    eventDescription: '',
    clientId: '',
    eventStart: '',
    eventEnd: '',
    location: '',
    image: '',
  };

  const validationSchema = Yup.object().shape({
    eventStart: Yup.date().required('Chưa chọn ngày bắt đầu'),
    eventEnd: Yup.date().required('Chưa chọn ngày kết thúc'),
    location: Yup.string(),
    image: Yup.string(),
    eventName: Yup.string().required('Tên sự kiện là bắt buộc'),
    eventDescription: Yup.string(),
    clientId: Yup.string(),
  });

  const onSubmit = ({ values }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

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
    }, 1000);
  };

  return (
    <ContainerView tw="px-0 ">
      <SubHeaderBar tw="px-5" title="Tạo sự kiện" onBackPress={() => navigation.goBack()} />
      <Formik
        initialValues={initialValues}
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
          }, 1000);
        }}>
        {(props) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInputWithLabel
              label="Sự kiện"
              placeholder="Tên sự kiện"
              onChangeText={props.handleChange('eventName')}
              onBlur={props.handleBlur('eventName')}
              value={props.values.eventName}
              error={props.touched.eventName && props.errors.eventName}
            />

            <TextInputWithLabel
              label="Mô tả sự kiện"
              placeholder="Mô tả sự kiện nếu có"
              onChangeText={props.handleChange('eventDescription')}
              onBlur={props.handleBlur('eventDescription')}
              value={props.values.eventDescription}
              error={props.touched.eventDescription && props.errors.eventDescription}
            />

            {/* Select Client */}
            <SingleSelector
              tw="px-5"
              onSelectClient={(clientId) => props.handleChange('clientId')(clientId)}
            />

            <View tw="mb-2 px-4">
              <Text tw="text-base font-bold ">Thời gian diễn ra</Text>
            </View>
            {/* Data Range Buttons */}
            <View tw="flex-row flex-1">
              {/* Event Start Button */}
              <DateTimePickerWithLabel
                onChange={(date) => props.handleChange('eventStart')(date)}
                type="eventStart"
                mode="date"
                buttonStyle={{ paddingRight: 0, marginRight: 2 }}
              />
              {/* Middle Icon */}
              <View tw="self-center mb-4">
                <Icon source={require('../../assets/icons/KeyboardArrowRight.png')} />
              </View>
              {/* Event End Button */}
              <DateTimePickerWithLabel
                onChange={(date) => props.handleChange('eventEnd')(date)}
                type="eventEnd"
                mode="date"
                buttonStyle={{ paddingLeft: 0, marginLeft: 2 }}
              />
            </View>

            <LocationTextInput
              tw="px-5"
              onChangeText={props.handleChange('location')}
              onBlur={props.handleBlur('location')}
              value={props.values.location}
            />

            <View tw="mb-4">
              <Text tw="text-base font-bold ">Hình ảnh</Text>
            </View>

            <Button
              tw="px-5 mb-4"
              icon="right"
              loading={isLoading}
              iconSource={require('../../assets/icons/ForwardArow.png')}
              right
              onPress={props.handleSubmit}>
              Tạo sự kiện
            </Button>
          </ScrollView>
        )}
      </Formik>
    </ContainerView>
  );
};

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  picker: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  result: {
    marginVertical: 10,
    fontSize: 16,
  },
});

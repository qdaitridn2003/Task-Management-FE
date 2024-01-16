import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  ContainerView,
  LocationTextInput,
  ScrollView,
  SubHeaderBar,
  Text,
  View,
  SingleSelector,
  Icon,
  TextInputWithLabel,
  DateTimePickerWithLabel,
  PopupModal,
  UploadImage,
} from '../../components';
import { ScreenName } from '../../common';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthPost } from '../../configs';

const AddTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [passedData, setPassedData] = useState(null);

  // FORM SUBMISSION
  const [initialValues, setInitialValues] = useState({
    taskName: '',
    taskDescription: '',
    leaderId: '',
    dateTime: '',
    dateReminder: '',
    location: '',
    status: 'upcoming',
    image: '',
  });

  // const initialValues = {
  //   taskName: '',
  //   taskDescription: '',
  //   leaderId: '',
  //   dateTime: '',
  //   reminder: '',
  //   location: '',
  //   status: 'upcoming',
  //   image: '',
  // };

  const validationSchema = Yup.object().shape({
    dateTime: Yup.date().required('Chưa chọn ngày bắt đầu'),
    reminder: Yup.date().required('Chưa chọn ngày kết thúc'),
    location: Yup.string(),
    image: Yup.string(),
    taskName: Yup.string().required('Tên công việc là bắt buộc'),
    taskDescription: Yup.string(),
    leaderId: Yup.string(),
  });

  useEffect(() => {
    // Extract passed data
    setPassedData(route.params?.passedData);

    if (route.params?.passedData) {
      setInitialValues({
        taskName: route.params?.passedData.name || '',
        taskDescription: route.params?.passedData.description || '',
        leaderId: route.params?.passedData._id || '',
        dateTime: route.params?.passedData.dateTime || '',
        reminder: route.params?.passedData.reminder || '',
        location: route.params?.passedData.location || '',
        status: route.params?.passedData.status || 'upcoming',
        image: '',
      });
    }

    console.log('Passed data:', route.params);
  }, [route.params]);

  return (
    <ContainerView tw="px-0 ">
      <SubHeaderBar
        tw="px-5"
        title={passedData ? 'Cập nhật công việc' : 'Tạo công việc'}
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('Form submitted with values:', values);

          setLoading(true);

          try {
            const apiPath = '/task/create-task';

            const accessToken = await getAccessToken();

            const data = {
              name: values.taskName,
              leaderId: values.leaderId,
              description: values.taskDescription,
              dateTime: values.dateTime,
              reminder: values.reminder,
              location: values.location,
              // Check if start day is in the past
              status: 'upcoming',
              imageUrls: values.image,
            };

            const apiResponse = await axiosAuthPost(apiPath, accessToken, data);

            console.log('Post API response:', apiResponse);

            setLoading(false);

            navigation.navigate(ScreenName.eventsList);
          } catch (error) {
            console.error('Error posting data:', error);
            setLoading(false);
          }
        }}>
        {(props) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInputWithLabel
              label="Công việc"
              placeholder="Tên công việc"
              onChangeText={props.handleChange('taskName')}
              onBlur={props.handleBlur('taskName')}
              value={props.values.taskName}
              error={props.touched.taskName && props.errors.taskName}
            />

            <TextInputWithLabel
              label="Mô tả công việc"
              placeholder="Mô tả công việc nếu có"
              onChangeText={props.handleChange('taskDescription')}
              onBlur={props.handleBlur('taskDescription')}
              value={props.values.taskDescription}
              error={props.touched.taskDescription && props.errors.taskDescription}
              multiline
            />

            {/* Select Client */}
            <SingleSelector
              tw="px-5"
              type="employee"
              onSelectProfile={(leaderId) => props.handleChange('leaderId')(leaderId)}
            />

            <DateTimePickerWithLabel
              onChange={(date) => props.handleChange('dateTime')(date)}
              label={'Thời gian diễn ra'}
              type="event"
              mode="datetime"
            />

            {/* <DateTimePickerWithLabel
                onChange={(date) => props.handleChange('dateTime')(date)}
                type="dateTime"
                mode="date"
                buttonStyle={{ paddingRight: 0, marginRight: 2 }}
              /> */}

            <DateTimePickerWithLabel
              onChange={(date) => props.handleChange('dateReminder')(date)}
              label={'Nhắc nhở'}
              type="alarm"
              mode="datetime"
            />

            {/* <DateTimePickerWithLabel
                onChange={(date) => props.handleChange('reminder')(date)}
                type="reminder"
                mode="date"
                buttonStyle={{ paddingLeft: 0, marginLeft: 2 }}
              /> */}

            <LocationTextInput
              tw="px-5"
              onChangeText={props.handleChange('location')}
              onBlur={props.handleBlur('location')}
              value={props.values.location}
            />

            <UploadImage
              label="Hình ảnh"
              tw="mb-4"
              onUploaded={(url) => props.handleChange('image')(url)}
            />

            <Button
              tw="mb-4"
              icon="right"
              loading={loading}
              iconSource={require('../../assets/icons/ForwardArow.png')}
              right
              onPress={props.handleSubmit}>
              {passedData ? 'Cập nhật công việc' : 'Tạo công việc'}
            </Button>
          </ScrollView>
        )}
      </Formik>
    </ContainerView>
  );
};

export default AddTaskScreen;

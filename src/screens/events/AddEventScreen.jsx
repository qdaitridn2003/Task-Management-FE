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
} from '../../components';
import { ScreenName } from '../../common';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthPost } from '../../configs';

const AddEventScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // FORM SUBMISSION
  const [initialValues, setInitialValues] = useState({
    eventName: '',
    eventDescription: '',
    clientId: '',
    eventStart: '',
    eventEnd: '',
    location: '',
    status: 'upcoming',
    image: '',
  });

  const validationSchema = Yup.object().shape({
    eventStart: Yup.date().required('Chưa chọn ngày bắt đầu'),
    eventEnd: Yup.date().required('Chưa chọn ngày kết thúc'),
    location: Yup.string(),
    image: Yup.string(),
    eventName: Yup.string().required('Tên sự kiện là bắt buộc'),
    eventDescription: Yup.string(),
    clientId: Yup.string(),
  });

  useEffect(() => {
    // Extract passed data
    const { passedData } = route.params;

    if (passedData) {
      setInitialValues({
        eventName: passedData.name || '',
        eventDescription: passedData.description || '',
        clientId: passedData._id || '',
        eventStart: passedData.startDateTime || '',
        eventEnd: passedData.endDateTime || '',
        location: passedData.location || '',
        status: passedData.status || 'upcoming',
        image: '',
      });
    }

    console.log('Passed data:', route.params.passedData);
  }, [route.params.passedData]);

  return (
    <ContainerView tw="px-0 ">
      <SubHeaderBar
        tw="px-5"
        title="Tạo sự kiện"
        onBackPress={() => navigation.navigate(ScreenName.eventsList, { focusScreen: true })}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('Form submitted with values:', values);

          setLoading(true);

          try {
            const apiPath = '/event/create-event';

            const accessToken = await getAccessToken();

            const data = {
              name: values.eventName,
              clientId: values.clientId,
              description: values.eventDescription,
              startDateTime: values.eventStart,
              endDateTime: values.eventEnd,
              location: values.location,
              // Check if start day is in the past
              status:
                values.eventStart && new Date(values.eventStart) <= new Date()
                  ? 'ongoing'
                  : 'upcoming',
            };

            const apiResponse = await axiosAuthPost(apiPath, accessToken, data);

            // console.log('Post API response:', apiResponse);

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
              multiline
            />

            {/* Select Client */}
            <SingleSelector
              tw="px-5"
              onSelectProfile={(clientId) => props.handleChange('clientId')(clientId)}
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

            <Button
              tw="mb-4"
              icon="right"
              loading={loading}
              iconSource={require('../../assets/icons/ForwardArow.png')}
              right
              onPress={props.handleSubmit}>
              Tạo sự kiện
            </Button>

            <PopupModal visible={loading} loading={loading} />
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

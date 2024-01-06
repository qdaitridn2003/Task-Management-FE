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
  DatetimeButton,
} from '../../components';
import { Color, ScreenName } from '../../common';
import { BackHandler, ToastAndroid, TextInput as BlankTextInput } from 'react-native';
import DateTimePickerWrapper from '../../components/customs/DateTimePickerWrapper';

const RNTextInput = styled(BlankTextInput);

const AddEventScreen = () => {
  const navigation = useNavigation();

  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    console.log('selectedClientId:', selectedClientId);
  }, [selectedClientId]);

  const handleEdit = () => {
    console.log('Edit');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  const handleDateChange = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
    // Do something with the selected date
  };

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    console.log('Selected Client:', clientId);
  };

  return (
    <ContainerView tw="px-0 ">
      <SubHeaderBar tw="px-5" title="Tạo sự kiện" onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput tw="px-5" label="Sự kiện" placeholder="Tên sự kiện" />

        <TextInput tw="px-5" label="Mô tả sự kiện" placeholder="Mô tả sự kiện nếu có" />

        <SingleSelector tw="px-5" onSelectClient={handleSelectClient} />

        <View tw="mb-4">
          <Text tw="text-base font-bold ">Thời gian diễn ra</Text>
        </View>

        {/* Data Range Buttons */}
        <View tw="flex-row flex-1">
          {/* Event Start Button */}
          <DateTimePickerWrapper onChange={handleDateChange} mode="date">
            <DatetimeButton tw="pl-5 pr-0.5 flex-1" type="eventStart" />
          </DateTimePickerWrapper>
          {/* Middle Icon */}
          <View tw="self-center mb-4">
            <Icon source={require('../../assets/icons/KeyboardArrowRight.png')} />
          </View>
          {/* Event End Button */}
          <DateTimePickerWrapper onChange={handleDateChange} mode="date">
            <DatetimeButton tw="pr-5 pl-0.5 flex-1" type="eventEnd" />
          </DateTimePickerWrapper>
        </View>

        <DatetimeButton tw="px-5" type="eventStart" value="Test Test Test Test" />
        <DatetimeButton tw="px-5" type="event" value="Test Test Test Test" />
        <DatetimeButton tw="px-5" type="alarm" />

        <DateTimePickerWrapper onChange={handleDateChange} mode="date">
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="date" onChange={handleDateChange}>
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="time" onChange={handleDateChange}>
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>

        <LocationTextInput tw="px-5" />

        <LocationTextInput tw="px-5" value="Test Test Test Test" notEditable />

        <View tw="mb-4">
          <Text tw="text-base font-bold ">Hình ảnh</Text>
        </View>

        <Button
          tw="px-5"
          icon="right"
          iconSource={require('../../assets/icons/ForwardArow.png')}
          right>
          Tạo sự kiện
        </Button>
      </ScrollView>
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

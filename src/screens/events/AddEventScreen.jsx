import React, { useEffect, useRef, useState } from 'react';
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
} from '../../components';
import { Color, ScreenName } from '../../common';
import { BackHandler, ToastAndroid } from 'react-native';
import DateTimePickerWrapper from '../../components/customs/DateTimePickerWrapper';
import SingleSelector from '../../components/customs/SingleSelector';

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
    <ContainerView>
      <SubHeaderBar title="Tạo sự kiện" onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput label="Sự kiện" placeholder="Tên sự kiện" />

        <TextInput label="Mô tả sự kiện" placeholder="Mô tả sự kiện nếu có" />

        <SingleSelector onSelectClient={handleSelectClient} />

        <View tw="mb-4">
          <Text tw="text-base font-bold ">Thời gian diễn ra</Text>
        </View>
        <DateTimePickerWrapper onChange={handleDateChange}>
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="date" onChange={handleDateChange}>
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="time" onChange={handleDateChange}>
          <Text>Datetime picker</Text>
        </DateTimePickerWrapper>

        <LocationTextInput />

        <View tw="mb-4">
          <Text tw="text-base font-bold ">Hình ảnh</Text>
        </View>

        <Button icon="right" iconSource={require('../../assets/icons/ForwardArow.png')} right>
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

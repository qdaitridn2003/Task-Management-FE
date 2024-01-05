import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  AppBar,
  Button,
  ContainerView,
  EventCard,
  FilterBar,
  IconButton,
  Image,
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

const EventDetailsScreen = () => {
  const navigation = useNavigation();

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

  return (
    <ContainerView>
      <SubHeaderBar
        onEditPress={handleEdit}
        onDeletePress={handleDelete}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView>
        <Image
          tw="aspect-video w-full rounded-2xl mb-4"
          source={{ uri: 'https://picsum.photos/700' }}
        />

        <StatusIndicator status="" tw="mb-4" />

        <TextInput label="Mô tả" notEditable />
        <TextInput label="Khách hàng" notEditable />

        <DateTimePickerWrapper onChange={handleDateChange}>
          <Text>Your Custom Trigger Component</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="date" onChange={handleDateChange}>
          <Text>Your Custom Trigger Component</Text>
        </DateTimePickerWrapper>
        <DateTimePickerWrapper mode="time" onChange={handleDateChange}>
          <Text>Your Custom Trigger Component</Text>
        </DateTimePickerWrapper>
      </ScrollView>
    </ContainerView>
  );
};

export default EventDetailsScreen;

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

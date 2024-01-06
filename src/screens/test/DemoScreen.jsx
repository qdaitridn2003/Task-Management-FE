import React, { useEffect, useState } from 'react';

import {
  AppBar,
  Button,
  ContainerView,
  DateTimePickerWithLabel,
  DateTimeButton,
  EventCard,
  Icon,
  IconButton,
  LocationTextInput,
  ScrollView,
  View,
  MainHeaderBar,
  SingleSelector,
} from '../../components';
import { Color } from '../../common';

const DemoScreen = () => {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const handleDateChange = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
  };

  useEffect(() => {
    console.log('selectedClientId:', selectedClientId);
  }, [selectedClientId]);

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);

    console.log('Selected Client:', clientId);
  };

  return (
    <ContainerView>
      {/* <AppBar /> */}
      <MainHeaderBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex-row p-4 justify-between">
          <IconButton iconSource={require('../../assets/icons/Plus.png')} />
          <IconButton type="secondary" iconSource={require('../../assets/icons/Plus.png')} />
          <IconButton type="delete" iconSource={require('../../assets/icons/DeleteOutline.png')} />
        </View>

        <EventCard status="upcoming" />
        <EventCard status="active" />

        <Button
          tw="mb-4"
          icon={'right'}
          iconSource={require('../../assets/icons/ForwardArow.png')}
          loading={false}>
          Tạo sự kiện
        </Button>

        <Button type="secondary" tw="mb-4" iconSource={require('../../assets/icons/Status.png')}>
          Tạo sự kiện
        </Button>

        <Button tw="mb-4" iconSource={require('../../assets/icons/Status.png')} loading={true}>
          Tạo sự kiện
        </Button>

        <DateTimePickerWithLabel
          onChange={handleDateChange}
          label={'Thời gian diễn ra'}
          mode="date"
        />

        <DateTimeButton tw="px-5" type="eventStart" value="Test Test Test Test" />
        <DateTimeButton tw="px-5" type="event" value="9:30 SA - 14/10/2023" />
        <DateTimeButton tw="px-5" type="alarm" />

        <LocationTextInput tw="px-5" />
        <LocationTextInput tw="px-5" value="Test Test Test Test" notEditable />

        <SingleSelector tw="px-5" onSelectClient={handleSelectClient} />

        <Icon source={require('../../assets/icons/Account.png')} color={Color.primary} />
      </ScrollView>
    </ContainerView>
  );
};

export default DemoScreen;

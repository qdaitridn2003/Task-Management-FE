import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  AppBar,
  Button,
  ContainerView,
  EventCard,
  FilterBar,
  IconButton,
  ScrollView,
  Searchbar,
  View,
} from '../../components';
import { Color, ScreenName } from '../../common';
import { Button as RNPaperButton } from 'react-native-paper';

const EventsScreen = () => {
  const navigation = useNavigation();

  const listFilter = [
    { status: 'Tất cả' },
    { status: 'Sắp tới' },
    { status: 'Hoàn thành' },
    { status: 'Đang diễn ra' },
    { status: 'Đã hủy' },
  ];

  return (
    <ContainerView tw="px-0">
      <AppBar tw="px-5" onPress={() => navigation.navigate(ScreenName.addEvent)} />

      {/* Search bar */}
      <View tw="flex-row px-5">
        <Searchbar tw="pr-2.5" />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      {/* Fillter bar */}
      <FilterBar listTab={listFilter} />

      {/* <Button size="small">test</Button> */}

      {/* Events list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventCard status="upcoming" />
        <EventCard status="active" />
      </ScrollView>
    </ContainerView>
  );
};

export default EventsScreen;

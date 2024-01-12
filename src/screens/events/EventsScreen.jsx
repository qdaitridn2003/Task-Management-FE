import React, { useEffect, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
import { BackHandler, ToastAndroid } from 'react-native';

const DoubleBackToExit = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isBackPressedOnce()) {
          BackHandler.exitApp();
          return true;
        } else {
          showToast('Nhấn lần nữa để thoát');
          return true;
        }
      });

      return () => backHandler.remove();
    }, []),
  );

  let lastBackPressed = 0;

  const isBackPressedOnce = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastBackPressed;
    lastBackPressed = currentTime;

    return timeDiff < 2000;
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return null;
};

const listFilter = [
  { status: 'Tất cả' },
  { status: 'Sắp tới' },
  { status: 'Hoàn thành' },
  { status: 'Đang diễn ra' },
  { status: 'Đã hủy' },
];

const EventsScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView tw="px-0">
      <AppBar tw="px-5" onPress={() => navigation.navigate(ScreenName.addEvent)} />

      {/* Search bar */}
      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      {/* Fillter bar */}
      <FilterBar listTab={listFilter} />

      {/* Events list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventCard status="upcoming" onPress={() => navigation.navigate(ScreenName.eventDetails)} />
        <EventCard status="active" />
      </ScrollView>

      <DoubleBackToExit navigation={navigation} />
    </ContainerView>
  );
};

export default EventsScreen;

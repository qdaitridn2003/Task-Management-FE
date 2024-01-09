import React, { useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  ContainerView,
  MainHeaderBar,
  IconButton,
  Searchbar,
  View,
  ScrollView,
  FlatList,
} from '../../components';
import { Color, ScreenName } from '../../common';
import { ClientCard } from '../../components/customs/ClientCard';

const ClientScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="clients" onPress={() => navigation.navigate(ScreenName.addClient)} />

      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      <ScrollView tw="mx-6 my-4 ">
        {/* <ClientCard name="Nguyễn thu thảo" /> */}
        <ClientCard
          name="Nguyễn thái công"
          avatar="https://i.pinimg.com/236x/ed/2d/0a/ed2d0ad782df82aa3a201baf539e0409.jpg"
        />
      </ScrollView>
    </ContainerView>
  );
};

export default ClientScreen;

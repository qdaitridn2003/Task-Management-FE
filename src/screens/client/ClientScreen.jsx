import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  ContainerView,
  MainHeaderBar,
  IconButton,
  Searchbar,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from '../../components';
import { Color, ScreenName, accessTokenKey } from '../../common';
import { ClientCard } from '../../components/customs/ClientCard';
import { asyncStorageGetItem, axiosAuthGet } from '../../configs';
import { ClientContext } from '../../contexts';

const ClientScreen = () => {
  const navigation = useNavigation();
  const { data, page, setPage, isLoading, setIsLoading, fetchData, searchText, setSearchText } =
    useContext(ClientContext);

  const loadMoreData = () => {
    setIsLoading(true);
    setPage(page + 1);
  };
  const renderLoader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size={40} color={Color} />
      </View>
    ) : null;
  };
  const handleSearch = () => {
    fetchData(1, searchText);
  };
  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="clients" onPress={() => navigation.navigate(ScreenName.addClient)} />

      <View tw="flex-row px-5">
        <Searchbar
          tw="flex-1 mr-2.5 mb-2"
          onSubmitEditing={handleSearch}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          setSearchText={setSearchText}
        />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      <FlatList
        tw="mx-6 my-4 "
        data={data}
        renderItem={({ item }) => (
          <ClientCard id={item._id} name={item.name} avatar={item.avatar} />
        )}
        keyExtractor={(item) => item._id}
        ListFooterComponent={renderLoader}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
      />
    </ContainerView>
  );
};

export default ClientScreen;

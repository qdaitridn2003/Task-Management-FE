import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { Color, ScreenName } from '../../common';
import {
  ContainerView,
  MainHeaderBar,
  IconButton,
  Searchbar,
  View,
  FlatList,
  ActivityIndicator,
  EmployeeCard,
} from '../../components';
import { ClientCard } from '../../components/customs/ClientCard';
import { EmployeeContext } from '../../contexts';

const EmployeeScreen = () => {
  const navigation = useNavigation();
  const { data, page, setPage, isLoading, setIsLoading, fetchData, searchText, setSearchText } =
    useContext(EmployeeContext);
  // console.log(page);

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
      <MainHeaderBar type="employees" rightButton={false} />

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
          <EmployeeCard id={item._id} name={item.name} avatar={item.avatar} />
        )}
        keyExtractor={(item) => item._id}
        ListFooterComponent={renderLoader}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
      />
    </ContainerView>
  );
};

export default EmployeeScreen;

import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

import { Color } from '../../common';
import {
  ContainerView,
  MainHeaderBar,
  IconButton,
  Searchbar,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  FilterBar,
} from '../../components';
import { ClientCard } from '../../components/customs/ClientCard';
import { ClientContext } from '../../contexts';

const ClientScreen = () => {
  const { data, page, setPage, isLoading, setIsLoading, fetchData, searchText, setSearchText } =
    useContext(ClientContext);
  const [isStatusDisabled, setIsStatusDisabled] = useState(false);
  // console.log(data);

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

  const listFilter = [{ status: 'Tất cả' }, { status: 'Hoạt động' }, { status: 'Đã vô hiệu hoá' }];

  const handleChangeListStatus = () => {
    if (!isStatusDisabled) {
      fetchData(1, 'disabled');
      setIsStatusDisabled(true);
    } else {
      fetchData(1, 'active');
      setIsStatusDisabled(false);
    }
  };

  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="clients" onPress={() => navigation.navigate(ScreenName.addClient)} />

      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" onChangeText={(text) => setSearchText(text)} />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>
      {/* <FilterBar listTab={listFilter} /> */}

      {data.length === 0 ? (
        <View className="flex-1 align-middle justify-center">
          <Text className="text-base text-center">Không có khách hàng nào</Text>
        </View>
      ) : (
        <FlatList
          tw="mx-6 my-4 "
          data={data}
          renderItem={({ item }) => (
            <ClientCard id={item._id} name={item.name} avatar={item.avatar} status={item.status} />
          )}
          keyExtractor={(item) => item._id}
          ListFooterComponent={(item) => {
            item.length > 6 ? renderLoader : null;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
        />
      )}
    </ContainerView>
  );
};

export default ClientScreen;

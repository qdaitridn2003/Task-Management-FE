import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

import { Color, ScreenName } from '../../common';
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
  const navigation = useNavigation();
  const { data, page, setPage, isLoading, setIsLoading, fetchData, searchText, setSearchText } =
    useContext(ClientContext);
  const [selectedFilter, setSelectedFilter] = useState('active');
  // console.log(data);

  const loadMoreData = () => {
    if (data.length > 5) {
      setIsLoading(true);
    }
    setPage(page + 1);
  };
  const renderLoader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator className="mb-2" size={40} color={Color.primary} />
      </View>
    ) : null;
  };

  const statusOptions = [
    { value: 'active', displayText: 'Hoạt động' },
    { value: 'disabled', displayText: 'Đã vô hiệu hoá' },
  ];

  const handleChangeListStatus = (value) => {
    if (value === 'active') {
      fetchData(1, 'active');
    } else {
      fetchData(1, 'disabled');
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
      <FilterBar
        options={statusOptions}
        selectedValue={selectedFilter}
        onSelect={handleChangeListStatus}
      />

      {data.length === 0 ? (
        <View className="flex-1 align-middle justify-center">
          <Text className="text-base text-center">Không có khách hàng nào</Text>
        </View>
      ) : (
        <FlatList
          tw="mx-6 "
          data={data}
          renderItem={({ item }) => (
            <ClientCard id={item._id} name={item.name} avatar={item.avatar} status={item.status} />
          )}
          keyExtractor={(item) => item._id}
          ListFooterComponent={renderLoader}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
        />
      )}
    </ContainerView>
  );
};

export default ClientScreen;

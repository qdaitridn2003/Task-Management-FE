import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

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
  FilterBar,
  Text,
} from '../../components';
import { EmployeeContext } from '../../contexts';

const EmployeeScreen = () => {
  const { data, page, setPage, isLoading, setIsLoading, fetchData, searchText, setSearchText } =
    useContext(EmployeeContext);
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
      <MainHeaderBar type="employees" rightButton={false} onPress={handleChangeListStatus} />

      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" onChangeText={(text) => setSearchText(text)} />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>
      <FilterBar listTab={listFilter} />

      {data.length === 0 ? (
        <View className="flex-1 align-middle justify-center">
          <Text className="text-base text-center">Không có nhân viên nào</Text>
        </View>
      ) : (
        <FlatList
          tw="mx-6 my-4 "
          data={data}
          renderItem={({ item }) => (
            <EmployeeCard
              id={item._id}
              name={item.name}
              avatar={item.avatar}
              status={item.status}
              role={item.role}
            />
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

export default EmployeeScreen;

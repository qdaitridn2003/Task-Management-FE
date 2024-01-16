import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  AppBar,
  ContainerView,
  EventCard,
  FilterBar,
  IconButton,
  Searchbar,
  View,
  PaperActivityIndicator,
  Text,
  Icon,
  MainHeaderBar,
} from '../../components';
import { Color, ScreenName } from '../../common';
import {
  BackHandler,
  ToastAndroid,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthGet } from '../../configs';

const TasksScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [listData, setListData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // API params
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;
  const [noMoreData, setNoMoreData] = useState(false);

  const fetchListData = async (pageNumber, searchQuery = '', status = '') => {
    // console.log('Current page number:', pageNumber);
    // console.log('Status in fecthListData:', status);

    try {
      setLoading(true);

      const apiPath = '/task/get-list-task';

      const accessToken = await getAccessToken();

      const query = {
        limit: limit,
        page: pageNumber,
        search: searchQuery,
        status: status,
      };

      // console.log('Query:', query);

      const response = await axiosAuthGet(apiPath, accessToken, query);

      const data = response.listTask;
      // console.log('Get list API response: ', data);

      if (data.length > 0) {
        setListData((previousList) => (pageNumber === 1 ? data : [...previousList, ...data]));
        setNoMoreData(false);
      } else {
        // No more data to load
        setNoMoreData(true);
      }
    } catch (error) {
      console.error('Error fetching listData:', error);
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };

  // Pull to refresh function
  const handleRefresh = () => {
    // console.log('handleRefresh called');
    // setRefreshing(true);
    setListData([]);
    setPage(1);
    setNoMoreData(false);
    fetchListData(1, searchQuery);
  };

  const handleLoadMore = () => {
    if (!loading && !refreshing && !noMoreData) {
      // console.log('handleLoadMore called');
      setPage((previousPage) => previousPage + 1);
      fetchListData(page + 1, searchQuery, selectedFilter);
    }
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    // console.log('Selected filter:', value);
    setListData([]);
    setPage(1);
    setNoMoreData(false);

    fetchListData(1, searchQuery, value);
  };

  const statusOptions = [
    { value: '', displayText: 'Tất cả' },
    { value: 'upcoming', displayText: 'Sắp tới' },
    { value: 'ongoing', displayText: 'Đang tiến hành' },
    { value: 'completed', displayText: 'Hoàn thành' },
    { value: 'cancelled', displayText: 'Đã hủy' },
  ];

  const handleClearSearch = () => {
    setSearchQuery('');
    setListData([]);
    setPage(1);
    setNoMoreData(false);
    fetchListData(1);
  };

  useEffect(() => {
    if (isFocused) {
      setListData([]);
      setPage(1);
      setNoMoreData(false);
      setSearchQuery('');
      fetchListData(1);
    }
  }, [isFocused]);

  // UI
  const renderFooter = () => {
    if (!noMoreData) {
      return (
        <View tw="flex-row mb-4 justify-center items-center">
          <PaperActivityIndicator color={Color.primary} />
          {searchQuery ? (
            <Text tw="ml-2 text-primary">Đang tìm kiếm...</Text>
          ) : (
            <Text tw="ml-2 text-primary">Đang tải...</Text>
          )}
        </View>
      );
    } else if (noMoreData) {
      return searchQuery && listData.length === 0 ? (
        <View tw="flex-row mb-4 justify-center items-center">
          <Icon source={require('../../assets/icons/QuestionMark.png')} color={Color.semanticRed} />
          <Text tw="ml-1 text-semanticRed">Không tìm thấy công việc nào với "{searchQuery}"</Text>
        </View>
      ) : (
        <View tw="flex-row mb-4 justify-center items-center">
          <Icon source={require('../../assets/icons/Check.png')} color={Color.semanticGreen} />
          <Text tw="ml-1 text-semanticGreen">Đã tải tất cả công việc</Text>
        </View>
      );
    }
    return null;
  };

  const renderCard = ({ item }) => (
    <EventCard
      type="task"
      status={item.status}
      title={item.name}
      startDate={item.dateTime}
      endDate={item.dateReminder}
      onPress={() => navigation.navigate(ScreenName.taskDetails, { passedId: item._id })}
      onContextMenuEdit={() => console.log('Edit pressed')}
      onContextMenuStatus={() => console.log('Status pressed')}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContainerView tw="px-0">
        <MainHeaderBar
          type="tasks"
          tw="-mb-1"
          onPress={() => navigation.navigate(ScreenName.addTask)}
        />

        {/* Search bar */}
        <View tw="flex-row px-5">
          <Searchbar
            tw="flex-1 mr-2.5 mb-2"
            placeholder={'Tìm kiếm công việc'}
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            onSubmitEditing={handleRefresh}
            onClear={handleClearSearch}
            returnKeyType={'search'}
          />

          <IconButton
            type="secondary"
            iconColor={Color.neutral2}
            iconSource={require('../../assets/icons/Tune.png')}
          />
        </View>

        {/* Fillter bar */}
        {/* <FilterBar listTab={listFilter} /> */}
        <FilterBar
          options={statusOptions}
          selectedValue={selectedFilter}
          onSelect={handleFilterSelect}
        />

        {/* Card list */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listData}
          keyExtractor={(item) => item._id}
          renderItem={(props) => renderCard({ ...props, navigation })}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default TasksScreen;

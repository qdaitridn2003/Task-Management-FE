import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  AppBar,
  ContainerView,
  EventCard,
  FilterBar,
  IconButton,
  Searchbar,
  View,
  ActivityIndicator,
  PaperActivityIndicator,
  Text,
  Icon,
} from '../../components';
import { Color, ScreenName } from '../../common';
import {
  BackHandler,
  ToastAndroid,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthGet } from '../../configs';

const DoubleBackToExit = () => {
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

const EventsScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [listData, setListData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // API params
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8;
  const [noMoreData, setNoMoreData] = useState(false);

  const fetchListData = async (pageNumber, searchQuery = '', status = '') => {
    // console.log('Current page number:', pageNumber);
    // console.log('Status in fecthListData:', status);

    try {
      setLoading(true);

      const apiPath = '/event/get-list-event';

      const accessToken = await getAccessToken();

      const query = {
        limit: limit,
        page: pageNumber,
        search: searchQuery,
        status: status,
      };

      // console.log('Query:', query);

      const response = await axiosAuthGet(apiPath, accessToken, query);

      const data = response.listEvent;
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
    { value: 'ongoing', displayText: 'Đang diễn ra' },
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
      // setListData([]);
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
          <Text tw="ml-1 text-semanticRed">Không tìm thấy sự kiện nào với "{searchQuery}"</Text>
        </View>
      ) : (
        <View tw="flex-row mb-4 justify-center items-center">
          <Icon source={require('../../assets/icons/Check.png')} color={Color.semanticGreen} />
          <Text tw="ml-1 text-semanticGreen">Đã tải tất cả sự kiện</Text>
        </View>
      );
    }
    return null;
  };

  const renderCard = ({ item }) => (
    <EventCard
      status={item.status}
      title={item.name}
      startDate={item.startDateTime}
      endDate={item.endDateTime}
      imageSource={item.images && item.images.length > 0 ? { uri: item.images[0] } : null}
      onPress={() => navigation.navigate(ScreenName.eventDetails, { passedId: item._id })}
      onContextMenuEdit={() => console.log('Edit pressed')}
      onContextMenuStatus={() => console.log('Status pressed')}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContainerView tw="px-0">
        <AppBar tw="px-5" onPress={() => navigation.navigate(ScreenName.addEvent)} />
        {/* Search bar */}
        <View tw="flex-row px-5">
          <Searchbar
            tw="flex-1 mr-2.5 mb-2"
            placeholder={'Tìm kiếm sự kiện'}
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

        <DoubleBackToExit navigation={navigation} />
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default EventsScreen;

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  AppBar,
  Button,
  ContainerView,
  DateTimePickerWithLabel,
  EventCard,
  FilterBar,
  Icon,
  IconButton,
  Image,
  LocationTextInput,
  ScrollView,
  Searchbar,
  SingleProfileTextInput,
  StatusIndicator,
  SubHeaderBar,
  Text,
  TextInput,
  TextInputWithLabel,
  View,
  ChangeStatusModal,
  PopupModal,
} from '../../components';
import { Color, ScreenName } from '../../common';
import { BackHandler, ToastAndroid } from 'react-native';
import DateTimePickerWrapper from '../../components/customs/DateTimePickerWrapper';
import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthGet, axiosAuthPut } from '../../configs';

const EventDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const [detailsData, setDetailsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  // Change status
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Params
  const [itemId, setItemId] = useState(null);

  const fetchDetails = async (itemId) => {
    try {
      setLoading(true);

      const apiPath = `/event/get-detail-event/${itemId}`;

      const accessToken = await getAccessToken();

      const response = await axiosAuthGet(apiPath, accessToken);

      const data = response.event;
      console.log('Details API response: ', data);

      setDetailsData(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  handleStatusSelection = async (status, itemId) => {
    console.log('Item id in handleStatusSelection: ', itemId);
    setSelectedStatus(status);
    console.log('Selected status:', status);

    try {
      setChangeStatusLoading(true);

      const apiPath = `/event/update-event/${itemId}`;

      const accessToken = await getAccessToken();

      const data = {
        status: status,
      };

      const response = await axiosAuthPut(apiPath, accessToken, data);

      // const data = response.event;
      // console.log('Details API response: ', data);

      // setDetailsData(data);

      setModalVisible(false);
      setChangeStatusLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setModalVisible(false);
      setChangeStatusLoading(false);
    }
  };

  const handleEdit = () => {
    console.log('Edit');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  useEffect(() => {
    setItemId(route.params.passedId);
    console.log('Item ID:', route.params.passedId);

    fetchDetails(route.params.passedId);
  }, [route.params.itemId]);

  return (
    <ContainerView>
      <SubHeaderBar
        tw="px-5"
        onEditPress={() => {
          navigation.navigate(ScreenName.addEvent, { passedData: detailsData });
        }}
        onDeletePress={handleDelete}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView>
        {detailsData?.images?.length > 0 && (
          <View tw="flex-1 px-5 mb-4">
            <Image
              tw="flex-1 aspect-video 2-full rounded-2xl"
              resizeMode="cover"
              source={{ uri: detailsData?.images[0] }}
            />
          </View>
        )}

        <StatusIndicator status={detailsData?.status ?? ''} size="big" tw="mb-4 mx-5" />

        <Text tw="text-2xl font-bold mx-5 mb-4">{detailsData?.name}</Text>

        <TextInputWithLabel
          label="Mô tả"
          placeholder={detailsData?.description ?? 'Không có'}
          value={detailsData?.description ?? ''}
          notEditable
        />

        {/* Select profile */}
        {detailsData?.client?.images?.length > 0 ? (
          <SingleProfileTextInput
            value={detailsData?.client?.name ?? ''}
            notEditable
            source={{ uri: detailsData?.client?.images[0] }}
            onPress={() => {
              console.log('onPress');
            }}
          />
        ) : (
          <SingleProfileTextInput
            value={detailsData?.client?.name ?? ''}
            notEditable
            onPress={() => {
              console.log('onPress');
            }}
          />
        )}

        <View tw="mb-2 px-4">
          <Text tw="text-base font-bold ">Thời gian diễn ra</Text>
        </View>
        {/* Data Range Buttons */}
        <View tw="flex-row flex-1">
          {/* Event Start Button */}
          <DateTimePickerWithLabel
            value={detailsData?.startDateTime}
            type="eventStart"
            mode="date"
            notEditable
            buttonStyle={{ paddingRight: 0, marginRight: 2 }}
          />
          {/* Middle Icon */}
          <View tw="self-center mb-4">
            <Icon source={require('../../assets/icons/KeyboardArrowRight.png')} />
          </View>
          {/* Event End Button */}
          <DateTimePickerWithLabel
            value={detailsData?.endDateTime}
            type="eventEnd"
            mode="date"
            notEditable
            buttonStyle={{ paddingLeft: 0, marginLeft: 2 }}
          />
        </View>

        <LocationTextInput tw="px-5" value={detailsData?.location ?? 'Không có'} notEditable />

        <Button
          tw="mb-4"
          loading={loading}
          iconSource={require('../../assets/icons/Status.png')}
          onPress={() => setModalVisible(true)}>
          Thay đổi trạng thái
        </Button>
      </ScrollView>

      <ChangeStatusModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(status) => handleStatusSelection(status, itemId)}
        type="event"
        loading={changeStatusLoading}
      />

      <PopupModal visible={loading} loading={loading} />
    </ContainerView>
  );
};

export default EventDetailsScreen;

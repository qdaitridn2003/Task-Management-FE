import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  ContainerView,
  DateTimePickerWithLabel,
  Icon,
  Image,
  LocationTextInput,
  ScrollView,
  SingleProfileTextInput,
  StatusIndicator,
  SubHeaderBar,
  Text,
  TextInputWithLabel,
  View,
  ChangeStatusModal,
  PopupModal,
  PaperActivityIndicator,
} from '../../components';
import { ScreenName } from '../../common';
import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthGet, axiosAuthPut } from '../../configs';

const TaskDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const [detailsData, setDetailsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  // Change status
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Params
  const [itemId, setItemId] = useState(null);

  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const fetchDetails = async (itemId) => {
    try {
      setLoading(true);

      const apiPath = `/task/get-detail-task/${itemId}`;

      const accessToken = await getAccessToken();

      const response = await axiosAuthGet(apiPath, accessToken);

      const data = response.task;
      console.log('Details API response: ', data);

      setDetailsData(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  handleStatusSelection = async (status, itemId) => {
    // console.log('Item id in handleStatusSelection: ', itemId);
    setSelectedStatus(status);
    console.log('Selected status:', status);

    try {
      setChangeStatusLoading(true);

      const apiPath = `/task/update-task/${itemId}`;

      const accessToken = await getAccessToken();

      const data = {
        status: status,
      };

      const response = await axiosAuthPut(apiPath, accessToken, data);

      setModalVisible(false);
      setChangeStatusLoading(false);

      if (!isConfirmModalVisible) {
        fetchDetails(detailsData._id);
      } else {
        navigation.navigate(ScreenName.tasksList);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setModalVisible(false);
      setChangeStatusLoading(false);
    }
  };

  const handleDelete = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    handleStatusSelection('cancelled', itemId);
    setConfirmModalVisible(false);
  };

  useEffect(() => {
    setItemId(route.params.passedId);
    console.log('Item ID:', route.params.passedId);

    fetchDetails(route.params.passedId);
  }, [route.params.itemId]);

  return (
    <ContainerView>
      {loading ? (
        <PaperActivityIndicator size="40" tw="flex-1" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SubHeaderBar
            tw="px-5"
            onEditPress={() => {
              navigation.navigate(ScreenName.addTask, { passedData: detailsData });
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
              multiline
              placeholder={detailsData?.description ?? 'Không có'}
              value={detailsData?.description ?? ''}
              notEditable
            />

            {/* Select profile */}
            {detailsData?.leader?.images?.length > 0 ? (
              <SingleProfileTextInput
                type="employee"
                value={detailsData?.leader?.name ?? ''}
                notEditable
                source={{ uri: detailsData?.leader?.images[0] }}
                onPress={() => {
                  console.log('onPress');
                }}
              />
            ) : (
              <SingleProfileTextInput
                type="employee"
                value={detailsData?.leader?.name ?? ''}
                notEditable
                onPress={() => {
                  console.log('onPress');
                }}
              />
            )}

            <DateTimePickerWithLabel
              label={'Thời gian diễn ra'}
              value={detailsData?.dateTime}
              type="event"
              mode="datetime"
              notEditable
            />

            <DateTimePickerWithLabel
              label={'Nhắc nhở'}
              value={detailsData?.dateReminder}
              type="alarm"
              mode="datetime"
              notEditable
            />

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
            type="task"
            loading={changeStatusLoading}
          />
        </ScrollView>
      )}

      <PopupModal
        visible={isConfirmModalVisible}
        title={`Bạn có chắc muốn ${
          detailsData?.status === 'completed' ? 'xóa' : 'hủy'
        } \ncông việc?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModalVisible(false)}
      />
    </ContainerView>
  );
};

export default TaskDetailsScreen;

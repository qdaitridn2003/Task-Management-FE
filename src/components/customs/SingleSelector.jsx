import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Image, PaperActivityIndicator, FlatList } from './TailwindComponent';
import { Icon } from './CustomIcon';
import { Color } from '../../common';
import { Searchbar } from './Searchbar';
import { getAccessToken } from '../../utilities/getAccessToken';
import { axiosAuthGet } from '../../configs';

// SingleSelector
const CustomSingleSelector = ({
  type = 'client',
  onSelectProfile,
  initialSelectedProfile,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // API params
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [noMoreData, setNoMoreData] = useState(false);

  const [profilesList, setProfilesList] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectorType, setSelectorType] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const fetchProfilesData = async (pageNumber, searchQuery = '') => {
    console.log('Current page number:', pageNumber);

    try {
      const apiPath = type === 'client' ? '/client/get-list-client' : '/employee/get-employee-list';

      const accessToken = await getAccessToken();

      const query = {
        limit: limit,
        page: pageNumber,
        search: searchQuery,
      };

      console.log('Query:', query);

      const response = await axiosAuthGet(apiPath, accessToken, query);

      const data = type === 'client' ? response.listClient : response.listEmployee;
      // console.log('Profiles list API response: ', data);

      if (data.length > 0) {
        setProfilesList((previousProfiles) =>
          pageNumber === 1 ? data : [...previousProfiles, ...data],
        );
        setNoMoreData(false);
      } else {
        // No more data to load
        setNoMoreData(true);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && !noMoreData) {
      console.log('handleLoadMore called');
      setPage((previousPage) => previousPage + 1);
      fetchProfilesData(page + 1, searchQuery);
    }
  };

  const handleSearch = async () => {
    setProfilesList([]);
    setPage(1);
    setNoMoreData(false);
    fetchProfilesData(1, searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setProfilesList([]);
    setPage(1);
    setNoMoreData(false);
    fetchProfilesData(1);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    closeModal();

    // Pass id to parent component
    onSelectProfile(profile._id);
    console.log('Profile id passed:', profile._id);
  };

  useEffect(() => {
    // console.log('SingleProfileSelector: useEffect ran!');

    if (initialSelectedProfile) {
      setSelectedProfile(initialSelectedProfile);
    }

    if (modalVisible) {
      setSelectorType(type);
      setPage(1);
      setNoMoreData(false);
      setSearchQuery('');
      fetchProfilesData(1, searchQuery);
    }
  }, [modalVisible, initialSelectedProfile]);

  const renderFooter = () => {
    if (!noMoreData) {
      return (
        <View tw="flex-row justify-center items-center">
          <PaperActivityIndicator color={Color.primary} />
          {searchQuery ? (
            <Text tw="ml-2 text-primary">Đang tìm kiếm...</Text>
          ) : (
            <Text tw="ml-2 text-primary">Đang tải...</Text>
          )}
        </View>
      );
    } else if (noMoreData) {
      return searchQuery && profilesList.length === 0 ? (
        <View tw="flex-row justify-center items-center">
          <Icon source={require('../../assets/icons/QuestionMark.png')} color={Color.semanticRed} />
          <Text tw="ml-1 text-semanticRed">
            Không tìm thấy {selectorType === 'client' ? 'khách hàng' : 'nhân viên'}
          </Text>
        </View>
      ) : (
        <View tw="flex-row justify-center items-center">
          <Icon source={require('../../assets/icons/Check.png')} color={Color.semanticGreen} />
          <Text tw="ml-1 text-semanticGreen">
            Đã tải tất cả {selectorType === 'client' ? 'khách hàng' : 'nhân viên'}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View tw="mb-4" style={style}>
      <Text tw="text-base font-bold mb-2 ">
        {type === 'client' ? 'Khách hàng' : 'Trưởng nhóm công việc'}
      </Text>
      <View tw="elevation rounded-2xl overflow-hidden h-12 justify-center">
        <TouchableOpacity onPress={openModal}>
          <View tw="flex-row items-center">
            {selectedProfile?.avatar ? (
              <Image
                source={{ uri: selectedProfile.avatar }}
                loadingIndicatorSource={require('../../assets/images/AddAvatar.jpeg')}
                tw="h-6 w-6 rounded-full mr-2 ml-4"
              />
            ) : (
              <View tw="ml-4 mr-2 rounded-full overflow-hidden">
                <Icon source={require('../../assets/images/AddAvatar.jpeg')} />
              </View>
            )}

            {/* Display selected profile name or default text */}
            <Text
              tw="text-base flex-1"
              style={{ color: selectedProfile ? Color.neutral1 : Color.neutral2 }}>
              {selectedProfile
                ? selectedProfile.name
                : type === 'client'
                  ? 'Khách hàng'
                  : 'Trưởng nhóm công việc'}
            </Text>

            {/* Right Icon */}
            <View tw="ml-2 mr-4">
              <Icon source={require('../../assets/icons/Edit.png')} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          onRequestClose={closeModal}
          onDismiss={closeModal}
          transparent>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  {/* Search Bar */}
                  <Searchbar
                    placeholder={'Tìm kiếm'}
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                    onClear={handleClearSearch}
                    returnKeyType={'search'}
                  />

                  {/* Loading Indicator */}
                  {loading && <PaperActivityIndicator size={40} />}
                  {/* Profile List */}
                  {!loading && (
                    <FlatList
                      // Filter list based on status
                      data={profilesList.filter((profile) => profile.status === 'active')}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item) => item._id}
                      onEndReached={handleLoadMore}
                      onEndReachedThreshold={0.1}
                      ListFooterComponent={renderFooter}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleProfileSelect(item)}>
                          <View tw="flex-row items-center pb-2">
                            {/* Avatar */}
                            {item?.avatar ? (
                              <Image
                                source={{ uri: item.avatar }}
                                tw="h-12 w-12 rounded-full mr-2"
                              />
                            ) : (
                              <Image
                                source={require('../../assets/images/AddAvatar.jpeg')}
                                tw="h-12 w-12 rounded-full mr-2"
                              />
                            )}

                            {/* Name */}
                            <Text tw="text-base">{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                    // </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export const SingleSelector = styled(CustomSingleSelector);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    elevation: 3,
    height: 300,
  },
});

import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Image, PaperActivityIndicator, FlatList } from './TailwindComponent';
import { Icon } from './CustomIcon';
import { Color } from '../../common';
import { Searchbar } from './Searchbar';

const mockClientList = [
  { id: '1', name: 'Nguyễn Văn A', avatar: 'https://picsum.photos/200' },
  { id: '2', name: 'Nguyễn Văn B', avatar: 'https://picsum.photos/200' },
  { id: '3', name: 'Nguyễn Văn C', avatar: 'https://picsum.photos/200' },
  { id: '4', name: 'Nguyễn Văn D', avatar: 'https://picsum.photos/200' },
  { id: '5', name: 'Nguyễn Văn E', avatar: 'https://picsum.photos/200' },
  { id: '6', name: 'Nguyễn Văn F', avatar: 'https://picsum.photos/200' },
  // Add more clients as needed
];

const mockSearchResults = [
  { id: '7', name: 'Lê Thị G', avatar: 'https://picsum.photos/200' },
  { id: '8', name: 'Lê Thị H', avatar: 'https://picsum.photos/200' },
  // Add more search results as needed
];

// SingleSelector
const CustomSingleSelector = ({ onSelectClient, style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const initialApiCall = async () => {
    setLoading(true);
    try {
      /*
        API CALL HERE
      */

      console.log('Simulating API call...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setClientList(mockClientList);
    } catch (error) {
      console.error('API call error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect ran!');
    if (modalVisible) {
      initialApiCall();
    }
  }, [modalVisible]);

  const handleSearch = async () => {
    console.log('handleSearch ran!');
    // Triggered when the user hits enter after typing in the search bar
    setLoading(true);
    try {
      /*
        API CALL HERE
      */

      console.log('Simulating API call...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setClientList(mockSearchResults);
    } catch (error) {
      console.error('Search API call error:', error);
    } finally {
      setLoading(false);
    }

    // Test
    console.log('Simulating search API call with search text:', searchText);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    closeModal();

    // Pass id to parent component
    onSelectClient(client.id);
  };

  return (
    <View tw="mb-4" style={style}>
      <Text tw="text-base font-bold mb-2 ">Khách hàng</Text>
      <View tw="elevation rounded-2xl overflow-hidden h-12 justify-center">
        <TouchableOpacity onPress={openModal}>
          <View tw="flex-row items-center">
            {selectedClient ? (
              <Image source={{ uri: selectedClient.avatar }} tw="h-6 w-6 rounded-full mr-2 ml-4" />
            ) : (
              <View tw="ml-4 mr-2">
                <Icon
                  source={require('../../assets/icons/GroupOutline.png')}
                  color={Color.neutral2}
                />
              </View>
            )}

            {/* Display selected client name or default text */}
            <Text
              tw="text-base flex-1"
              style={{ color: selectedClient ? Color.neutral1 : Color.neutral2 }}>
              {selectedClient ? selectedClient.name : 'Chọn khách hàng'}
            </Text>

            {/* Right Icon */}
            <View tw="ml-2 mr-4">
              <Icon source={require('../../assets/icons/Edit.png')} color={Color.neutral2} />
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
                  <Searchbar onSubmitEditing={handleSearch} />

                  {/* Loading Indicator */}
                  {loading && <PaperActivityIndicator size={40} />}
                  {/* Client List */}
                  {!loading && (
                    <FlatList
                      data={clientList}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleClientSelect(item)}>
                          <View tw="flex-row items-center pb-2">
                            {/* Avatar */}
                            <Image source={{ uri: item.avatar }} tw="h-12 w-12 rounded-full mr-2" />

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
    borderRadius: 16,
    elevation: 3,
    height: 300,
  },
});

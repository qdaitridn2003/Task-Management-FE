import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  ActivityIndicator,
  ContainerView,
  FlatList,
  IconButton,
  MainHeaderBar,
  Searchbar,
  Text,
  TagCard,
  View,
} from '../../components';
import { Color, ScreenName, accessTokenKey } from '../../common';
import { asyncStorageGetItem, axiosAuthGet, axiosGet } from '../../configs';
import { TagContext } from '../../contexts';

const TagScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { page, setPage } = useContext(TagContext);

  useEffect(() => {
    (async () => {
      const token = await asyncStorageGetItem(accessTokenKey);
      const respone = await axiosAuthGet('/tag/get-tag-list', token, { limt: 10, page });
      const listTag = respone.listTag;

      if (listTag.length > 0) {
        if (page === 1) {
          setData(listTag);
        } else {
          setData([...data, ...listTag]);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    })();
  }, [page]);

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
  return (
    <ContainerView tw="px-0">
      <MainHeaderBar type="tag" onPress={() => navigation.navigate(ScreenName.addTag)} />
      <View tw="flex-row px-5">
        <Searchbar tw="flex-1 mr-2.5 mb-2" onChangeText={(text) => setSearchText(text)} />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      {data.length === 0 ? (
        <View className="flex-1 align-middle justify-center">
          <Text className="text-base text-center">Không có thẻ nào</Text>
        </View>
      ) : (
        <FlatList
          tw="mx-6 my-4 "
          data={data}
          renderItem={({ item }) => (
            <TagCard id={item._id} name={item.name} description={item.description} />
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

export default TagScreen;

import React, { useContext } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Card } from 'react-native-paper';
import { styled } from 'nativewind';

import { View, Text, Image, Pressable } from './TailwindComponent';
import { Color, accessTokenKey } from '../../common';
import { Icon } from './CustomIcon';
import { asyncStorageGetItem, axiosAuthDel } from '../../configs';
import { TagContext } from '../../contexts';

const RNPaperCard = ({ description, name, id }) => {
  const { page, setPage } = useContext(TagContext);
  const handleDeleteTag = async () => {
    // console.log(id);
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthDel(`/tag/delete-tag/${id}`, token, {});
    // console.log(response);
    if (response.message === 'Không thể xoá thẻ này') {
      ToastAndroid.show(response.message, ToastAndroid.LONG);
    } else {
      setPage(1);
      ToastAndroid.show('Xoá thành công', ToastAndroid.LONG);
    }
  };
  return (
    <View className="p-0.5 mb-4">
      <Card style={styles.CardStyle}>
        <View className="flex flex-row">
          <Text className="ml-4 text-base font-semibold">Tên thẻ: </Text>
          <Text className="ml-1 text-base font-normal">{name}</Text>
        </View>
        <View className="flex flex-row">
          <Text className="ml-4 text-base font-semibold">Mô tả: </Text>
          <Text className="ml-1 text-base font-normal">{description}</Text>
        </View>
        <Pressable style={styles.icon} onPress={handleDeleteTag}>
          <Icon
            color={Color.semanticRed}
            size={30}
            source={require('../../assets/icons/DeleteOutline.png')}
          />
        </Pressable>
      </Card>
    </View>
  );
};

export const TagCard = styled(RNPaperCard, 'pb-4 px-5');

const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: Color.neutral4,

    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 5,
    padding: 5,
  },
});

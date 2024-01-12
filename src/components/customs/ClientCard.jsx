import { styled } from 'nativewind';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { View, Text, Image, Pressable } from './TailwindComponent';
import { useNavigation } from '@react-navigation/native';

import { Color, ScreenName } from '../../common';
import { ClientContext } from '../../contexts';

const RNPaperCard = ({ name, avatar, id, onPress, onLongPress }) => {
  const navigation = useNavigation();
  const { clientId, setClientId } = useContext(ClientContext);

  const handleClickItem = () => {
    // console.log(id);
    setClientId(id);
    navigation.navigate(ScreenName.clientDetails);
  };
  return (
    <Pressable onPress={handleClickItem}>
      <View tw="p-0.5 mb-4">
        <Card onPress={onPress} onLongPress={onLongPress} style={styles.CardStyle}>
          <View tw="flex flex-row ">
            <Image
              tw="w-14 h-14 rounded-full"
              source={avatar ? { uri: avatar } : require('../../assets/images/AddAvatar.jpeg')}
            />
            <Text tw="ml-4 mt-3 text-base font-semibold">{name}</Text>
          </View>
        </Card>
      </View>
    </Pressable>
  );
};

export const ClientCard = styled(RNPaperCard, 'pb-4 px-5');

const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: Color.neutral4,

    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
});

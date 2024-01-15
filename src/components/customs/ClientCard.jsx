import { styled } from 'nativewind';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Image, Pressable } from './TailwindComponent';
import { Color, ScreenName } from '../../common';
import { ClientContext } from '../../contexts';

const RNPaperCard = ({ name, avatar, id, onPress, onLongPress, status }) => {
  const navigation = useNavigation();
  const { clientId, setClientId } = useContext(ClientContext);

  const handleClickItem = () => {
    setClientId(id);
    navigation.navigate(ScreenName.clientDetails);
  };

  const TextRow = ({ label, value }) => {
    let textColor = '';
    let displayText = value;

    if (value === 'active') {
      textColor = 'color-semanticGreen';
      displayText = 'Hoạt động';
    } else if (value === 'disabled') {
      textColor = 'color-semanticRed';
      displayText = 'Đã vô hiệu hóa';
    }

    return <Text tw={`ml-4 mt-1 text-base ${textColor} font-semibold`}>{displayText}</Text>;
  };
  return (
    <Pressable onPress={handleClickItem}>
      <View tw="p-0.5 mb-4">
        <Card onPress={onPress} onLongPress={onLongPress} style={styles.CardStyle}>
          <View tw="flex-1 flex-row">
            <Image
              tw="w-14 h-14 rounded-full"
              source={avatar ? { uri: avatar } : require('../../assets/images/AddAvatar.jpeg')}
            />

            <View>
              <Text tw="ml-4  text-base font-semibold">{name}</Text>
              <TextRow tw="ml-4  text-base font-semibold" value={status} />
            </View>
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

import React from 'react';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { styled } from 'nativewind';

import { Pressable, View, Image, Text } from './TailwindComponent';
import { Color, ScreenName } from '../../common';

const RNPaperCard = ({ name, avatar, id, role, onPress, onLongPress }) => {
  const navigation = useNavigation();
  const handleClickItem = () => {
    navigation.navigate(ScreenName.employeeDetails);
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
            <View tw="flex column">
              <Text tw="ml-5  text-base font-semibold">{name}</Text>
              <Text tw="ml-5 mt-1.5 text-sm font-normal">{role}</Text>
            </View>
          </View>
        </Card>
      </View>
    </Pressable>
  );
};

export const EmployeeCard = styled(RNPaperCard, 'pb-4 px-5');
const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: Color.neutral4,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
});

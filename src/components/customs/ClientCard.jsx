import { styled } from 'nativewind';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { Color } from '../../common';
import { View, Text, Image } from './TailwindComponent';
import { Icon } from './CustomIcon';

const RNPaperCard = ({ name, avatar, id, onPress, onLongPress }) => {
  return (
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
  );
};

export const ClientCard = styled(RNPaperCard, 'pb-4 px-5');

ClientCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

ClientCard.defaultProps = {
  name: 'Hoàng Nhật Tiến',
};

const styles = StyleSheet.create({
  CardStyle: {
    backgroundColor: Color.neutral4,

    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
});

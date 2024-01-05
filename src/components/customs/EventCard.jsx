import React from 'react';
import { styled } from 'nativewind';
import { ImageBackground, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { Card } from 'react-native-paper';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { Text, View } from './TailwindComponent';

const RNPaperCard = ({ status, title, startDate, endDate, onPress, onLongPress, ...props }) => {
  const statusMappings = {
    upcoming: { text: 'Sắp tới', icon: require('../../assets/icons/Alarm.png') },
    active: { text: 'Hoạt động', icon: require('../../assets/icons/DoubleArrowCircle.png') },
    completed: { text: 'Hoàn thành', icon: require('../../assets/icons/CheckCircleOutline.png') },
    canceled: { text: 'Đã hủy', icon: require('../../assets/icons/AlarmOff.png') },
  };

  const getStatusColor = () => {
    switch (status) {
      case 'upcoming':
        return Color.neutral1;
      case 'active':
        return Color.secondary;
      case 'completed':
        return Color.semanticGreen;
      case 'canceled':
        return Color.semanticRed;
      default:
        return Color.neutral2;
    }
  };

  return (
    <View {...props}>
      <Card onPress={onPress} onLongPress={onLongPress} style={styles.cardStyle}>
        <ImageBackground style={styles.imageStyle} source={{ uri: 'https://picsum.photos/700' }}>
          <View style={[styles.statusContainer, { borderColor: getStatusColor() }]}>
            <Icon source={statusMappings[status].icon} size={20} color={getStatusColor()} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {statusMappings[status].text}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.contentStyle}>
          <Text tw="text-lg font-medium pb-1">{title}</Text>

          {startDate && (
            <View tw="flex-row items-center py-1">
              <Icon
                source={require('../../assets/icons/EventStart.png')}
                size={20}
                color={Color.semanticGreen}
              />
              <Text tw="text-sm pl-1">{startDate}</Text>
            </View>
          )}

          {endDate && (
            <View tw="flex-row items-center pt-1">
              <Icon
                source={require('../../assets/icons/Event.png')}
                size={20}
                color={Color.primary}
              />
              <Text tw="text-sm pl-1">{endDate}</Text>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

export const EventCard = styled(RNPaperCard, 'pb-4 px-5');

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

EventCard.defaultProps = {
  title: 'Tên sự kiện',
  startDate: 'Thứ Hai, 01/03/2023',
  endDate: 'Thứ Bảy, 06/03/2023',
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: Color.neutral4,
    overflow: 'hidden',
  },
  statusContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    left: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    paddingLeft: 4,
    paddingRight: 2,
    fontSize: 14,
    fontWeight: '600',
  },
  contentStyle: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  imageStyle: {
    height: 140,
    width: '100%',
    resizeMode: 'cover',
  },
});

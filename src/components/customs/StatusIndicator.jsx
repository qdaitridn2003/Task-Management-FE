import React from 'react';
import { StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { Color } from '../../common';
import { Text, View } from './TailwindComponent';
import { Icon } from './CustomIcon';

const CustomStatusIndicator = ({ status, style, size }) => {
  const statusMappings = {
    upcoming: { text: 'Sắp tới', icon: require('../../assets/icons/Alarm.png') },
    ongoing: { text: 'Hoạt động', icon: require('../../assets/icons/DoubleArrowCircle.png') },
    completed: { text: 'Hoàn thành', icon: require('../../assets/icons/CheckCircleOutline.png') },
    canceled: { text: 'Đã hủy', icon: require('../../assets/icons/AlarmOff.png') },
    unknown: { text: 'Không rõ trạng thái', icon: require('../../assets/icons/QuestionMark.png') },
  };

  const getStatusColor = () => {
    switch (status) {
      case 'upcoming':
        return Color.neutral1;
      case 'ongoing':
        return Color.secondary;
      case 'completed':
        return Color.semanticGreen;
      case 'canceled':
        return Color.semanticRed;
      default:
        return Color.neutral2;
    }
  };

  const getStatusText = () => {
    return statusMappings[status]?.text || statusMappings.unknown.text;
  };

  return (
    <View
      style={[
        styles.statusContainer,
        { borderColor: getStatusColor(), borderWidth: size === 'big' ? 2 : 1.5 },
        style,
      ]}>
      <Icon
        source={statusMappings[status]?.icon || statusMappings.unknown.icon}
        size={size === 'big' ? 24 : 20}
        color={getStatusColor()}
      />
      <Text
        style={[
          styles.statusText,
          { color: getStatusColor(), fontSize: size === 'big' ? 16 : 14 },
        ]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

export const StatusIndicator = styled(CustomStatusIndicator);

const styles = StyleSheet.create({
  statusContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 90,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    paddingLeft: 4,
    paddingRight: 2,
    fontSize: 14,
    fontWeight: '600',
  },
});

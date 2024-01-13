import React, { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { View, Text, TouchableOpacity } from './TailwindComponent';
import { IconButton } from './IconButton';
import { Color } from '../../common';
import { Icon } from './CustomIcon';

const CustomMainHeaderBar = ({ type, onPress, rightButton = true, style }) => {
  const typeDataMap = {
    tasks: {
      iconSource: require('../../assets/icons/Task.png'),
      text: 'Công việc',
    },
    clients: {
      iconSource: require('../../assets/icons/GroupOutline.png'),
      text: 'Khách hàng',
    },
    employees: {
      iconSource: require('../../assets/icons/BadgeOutline.png'),
      text: 'Nhân viên',
    },
    notifications: {
      iconSource: require('../../assets/icons/NotificationsOutline.png'),
      text: 'Thông báo',
    },

    default: {
      iconSource: require('../../assets/icons/QuestionMark.png'),
      text: 'Chưa chọn type',
    },
  };

  const { iconSource, text } = typeDataMap[type] || typeDataMap.default;

  return (
    <View tw="px-5 flex-row items-center justify-between" style={style}>
      <View tw="flex-row items-center">
        <Text tw="text-2xl font-bold pr-2">{text}</Text>
        <Icon source={iconSource} size={28} />
      </View>
      <View tw="flex-row items-center">{rightButton && <IconButton onPress={onPress} />}</View>
    </View>
  );
};

export const MainHeaderBar = styled(CustomMainHeaderBar, 'pb-4');

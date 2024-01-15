import { styled } from 'nativewind';
import React from 'react';

import { Icon } from './CustomIcon';
import { IconButton } from './IconButton';
import { View, Text } from './TailwindComponent';

const CustomMainHeaderBar = ({ type, onPress, rightButton = true, style }) => {
  const typeDataMap = {
    tasks: {
      iconSource: require('../../assets/icons/Task.png'),
      text: 'Công việc',
    },
    management: {
      iconSource: require('../../assets/icons/Manager.png'),
      text: 'Quản lý',
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
    role: {
      iconSource: require('../../assets/icons/Task.png'),
      text: 'Chức vụ',
    },
    tag: {
      iconSource: require('../../assets/icons/Tag.png'),
      text: 'Thẻ công việc',
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

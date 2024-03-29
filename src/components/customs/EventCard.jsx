import React from 'react';
import { styled } from 'nativewind';
import { ImageBackground, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { Card } from 'react-native-paper';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { Text, View, PaperCard } from './TailwindComponent';
import { StatusIndicator } from './StatusIndicator';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const RNPaperCard = ({
  imageSource,
  status,
  title,
  startDate,
  endDate,
  onPress,
  onLongPress,
  onContextMenuEdit,
  onContextMenuStatus,
  type = 'event',
  style,
}) => {
  const formatDateTimeString = (dateTimeString, type) => {
    const optionsEvent = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const optionsTask = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const options = type === 'event' ? optionsEvent : optionsTask;

    const formattedDateTime = new Date(dateTimeString).toLocaleString('vi-VN', options);
    return formattedDateTime;
  };

  const firstIcon =
    type === 'event'
      ? require('../../assets/icons/EventStart.png')
      : require('../../assets/icons/Event.png');
  const secondIcon =
    type === 'event'
      ? require('../../assets/icons/Event.png')
      : require('../../assets/icons/NotificationsOutline.png');

  const firstColor = type === 'event' ? Color.semanticGreen : Color.primary;
  const secondColor = type === 'event' ? Color.primary : Color.secondary;

  return (
    <View style={style}>
      <PaperCard
        onPress={onPress}
        onLongPress={onLongPress}
        tw="bg-neutral4 mt-0.5 overflow-hidden rounded-2xl">
        {imageSource ? (
          <ImageBackground style={styles.imageStyle} source={imageSource}>
            {/* Status Indicator */}
            <StatusIndicator tw="absolute bottom-4 left-6" status={status} />
          </ImageBackground>
        ) : (
          <StatusIndicator tw="mx-5 mt-4" status={status} />
        )}

        <View tw="flex-row justify-between mx-6 my-4">
          <View>
            <Text tw="text-xl font-medium pb-1 -mt-1.5">{title}</Text>

            {startDate && (
              <View tw="flex-row items-center py-1">
                <Icon source={firstIcon} size={20} color={firstColor} />
                <Text tw="text-sm pl-1">{formatDateTimeString(startDate, type)}</Text>
              </View>
            )}

            {endDate && (
              <View tw="flex-row items-center pt-1">
                <Icon source={secondIcon} size={20} color={secondColor} />
                <Text tw="text-sm pl-1">{formatDateTimeString(endDate, type)}</Text>
              </View>
            )}
          </View>

          <View tw={imageSource ? 'self-center' : 'mt-1'}>
            <Menu>
              <MenuTrigger customStyles={styles.triggerStyles}>
                <Icon source={require('../../assets/icons/MoreVert.png')} color={Color.neutral2} />
              </MenuTrigger>

              <MenuOptions customStyles={styles.optionsStyles}>
                <MenuOption onSelect={onContextMenuEdit}>
                  <Text style={styles.popupMenuText}>Sửa</Text>
                </MenuOption>

                <MenuOption onSelect={onContextMenuStatus}>
                  <Text style={styles.popupMenuText}>Trạng thái</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </PaperCard>
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
  startDate: 'Ngày bắt đầu',
  endDate: 'Ngày kết thúc',
};

const styles = StyleSheet.create({
  contentStyle: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  imageStyle: {
    height: 140,
    width: '100%',
    resizeMode: 'cover',
  },
  optionsStyles: {
    optionsContainer: {
      paddingVertical: 12,
      paddingHorizontal: 12,
      width: 144,
      borderRadius: 16,
    },
    optionText: {},
  },
  optionStyle: {},
  popupMenuText: {
    fontSize: 16,
    paddingLeft: 4,
  },
});

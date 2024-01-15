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
  style,
}) => {
  const formatDateString = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('vi-VN', options);
    return formattedDate;
  };

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
                <Icon
                  source={require('../../assets/icons/EventStart.png')}
                  size={20}
                  color={Color.semanticGreen}
                />
                <Text tw="text-base pl-1">{formatDateString(startDate)}</Text>
              </View>
            )}

            {endDate && (
              <View tw="flex-row items-center pt-1">
                <Icon
                  source={require('../../assets/icons/Event.png')}
                  size={20}
                  color={Color.primary}
                />
                <Text tw="text-base pl-1">{formatDateString(endDate)}</Text>
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

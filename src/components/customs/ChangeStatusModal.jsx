import React from 'react';
import { Color } from '../../common';
import {
  FlatList,
  Modal,
  PaperActivityIndicator,
  PaperButton,
  Text,
  TouchableOpacity,
  View,
} from './TailwindComponent';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Icon } from './CustomIcon';

export const ChangeStatusModal = ({ visible, onClose, onSelect, type, loading }) => {
  const statusOptions =
    type === 'event'
      ? [
          {
            value: 'upcoming',
            displayText: 'Sắp tới',
            color: Color.neutral1,
            iconSource: require('../../assets/icons/Alarm.png'),
          },
          {
            value: 'ongoing',
            displayText: 'Hoạt động',
            color: Color.secondary,
            iconSource: require('../../assets/icons/DoubleArrowCircle.png'),
          },
          {
            value: 'completed',
            displayText: 'Hoàn thành',
            color: Color.semanticGreen,
            iconSource: require('../../assets/icons/CheckCircleOutline.png'),
          },
          {
            value: 'cancelled',
            displayText: 'Đã hủy',
            color: Color.semanticRed,
            iconSource: require('../../assets/icons/AlarmOff.png'),
          },
        ]
      : type === 'task'
        ? [
            {
              value: 'upcoming',
              displayText: 'Sắp tới',
              color: Color.neutral1,
              iconSource: require('../../assets/icons/Alarm.png'),
            },
            {
              value: 'ongoing',
              displayText: 'Hoạt động',
              color: Color.secondary,
              iconSource: require('../../assets/icons/DoubleArrowCircle.png'),
            },
            {
              value: 'completed',
              displayText: 'Hoàn thành',
              color: Color.semanticGreen,
              iconSource: require('../../assets/icons/CheckCircleOutline.png'),
            },
            {
              value: 'cancelled',
              displayText: 'Đã hủy',
              color: Color.semanticRed,
              iconSource: require('../../assets/icons/AlarmOff.png'),
            },
          ]
        : [];

  const renderItem = ({ item }) => (
    <PaperButton
      style={[styles.containerStyle, { borderColor: item.color }]}
      labelStyle={styles.labelStyle}
      textColor={item.color}
      contentStyle={styles.contentStyle}
      mode="outlined"
      onPress={() => onSelect(item.value)}
      icon={() => <Icon source={item.iconSource} color={item.color} />}>
      {item.displayText}
    </PaperButton>
  );

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View tw="flex-1 justify-center items-center bg-transparent">
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        </TouchableWithoutFeedback>

        <View style={styles.modalContentStyle}>
          <Text tw="text-xl font-bold mb-4 self-center">Chọn trạng thái</Text>

          <View>
            {loading && (
              <View
                tw="justify-center bg-neutral4"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: 'white',
                  zIndex: 1,
                }}>
                <PaperActivityIndicator />
              </View>
            )}

            <FlatList
              data={statusOptions}
              keyExtractor={(item) => item.value}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    borderRadius: 90,
    borderWidth: 2,
    alignSelf: 'stretch', // baseline: hug content. stretch: fill container
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  labelStyle: {
    fontSize: 16,
  },
  contentStyle: {},
  modalContentStyle: {
    backgroundColor: Color.neutral4,
    padding: 24,
    paddingBottom: 16,
    borderRadius: 20,
    width: '50%',
  },
});

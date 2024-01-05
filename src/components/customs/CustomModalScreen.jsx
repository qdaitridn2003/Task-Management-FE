import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { View, Text, TouchableOpacity } from './TailwindComponent';
import { Icon } from './CustomIcon';

export const CustomModalScreen = ({ visible, onClose, buttonData }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View tw="flex-1 justify-center items-center">
          <View tw="bg-white px-6 py-5 rounded-3xl">
            <Text tw="text-base font-medium">Quản lý</Text>
            {buttonData.map((item, index) => (
              <TouchableOpacity tw="py-2" key={index} onPress={item.onPress}>
                <Icon source={item.icon}></Icon>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

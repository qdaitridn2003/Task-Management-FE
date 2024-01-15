import { styled } from 'nativewind';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from './CustomIcon';
import { View, TextInput, TouchableOpacity } from './TailwindComponent';
import { Color } from '../../common';

const CustomSearchbar = ({
  placeholder,
  onSubmitEditing,
  value,
  onChangeText,
  returnKeyType,
  onClear,
  style,
}) => {
  const handleClear = () => {
    onClear();
    onChangeText('');
  };

  return (
    <View tw="flex-row h-12 elevation rounded-2xl mb-4 items-center" style={style}>
      <Icon
        style={{ marginLeft: 16, marginRight: 8 }}
        source={require('../../assets/icons/Search.png')}
        size={28}
        color={Color.neutral2}
      />

      <TextInput
        tw="text-base flex-1"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder={placeholder ? placeholder : 'Tìm kiếm...'}
        textColor={Color.primary}
        cursorColor={Color.primary}
        placeholderTextColor={Color.neutral2}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />

      {value !== '' && (
        <TouchableOpacity onPress={handleClear}>
          <Icon
            source={require('../../assets/icons/Close.png')}
            style={{ marginLeft: 8, marginRight: 16 }}
            size={24}
            color={Color.neutral2}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const Searchbar = styled(CustomSearchbar);

const styles = StyleSheet.create({
  iconSearch: {
    padding: 1,
    backgroundColor: '#d9dbda',
    borderRadius: 40,
    marginRight: 15,
  },
});

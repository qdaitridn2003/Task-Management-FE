import React, { useState } from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View, PaperTextInput, TouchableOpacity } from './TailwindComponent';

const CustomSearchbar = ({ placeholder, onPress, ...props }) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <View tw="flex-1" {...props}>
      <View style={styles.container}>
        <Icon source={require('../../assets/icons/Search.png')} size={28} color={Color.neutral2} />

        <PaperTextInput
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder={placeholder ? placeholder : 'Search'}
          style={styles.textInputStyle}
          textColor={Color.primary}
          cursorColor={Color.primary}
          placeholderTextColor={Color.neutral2}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={onPress}
        />

        {searchText !== '' && (
          <TouchableOpacity onPress={handleClear}>
            <Icon
              source={require('../../assets/icons/Close.png')}
              size={24}
              color={Color.neutral2}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const Searchbar = styled(CustomSearchbar);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: Color.neutral1,
    elevation: 3,
  },
  textInputStyle: {
    flex: 1,
    backgroundColor: Color.neutral4,
    fontSize: 16,
    height: 40,
  },
});

import { Entypo } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from './CustomIcon';
import { View, TextInput } from './TailwindComponent';
import { Color } from '../../common';

const CustomSearchbar = ({
  placeholder,
  onSubmitEditing,
  style,
  searchPhrase,
  setSearchPhrase,
}) => {
  const [clicked, setClicked] = useState(false);

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
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setClicked(true)}
        value={searchPhrase}
        onChangeText={setSearchPhrase}
      />

      {clicked && (
        <Entypo
          name="cross"
          size={20}
          color="black"
          style={styles.iconSearch}
          onPress={() => {
            setSearchPhrase('');
          }}
        />
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

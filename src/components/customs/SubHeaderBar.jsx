import React, { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { View, Text } from './TailwindComponent';
import { IconButton } from './IconButton';
import { Color } from '../../common';
import { TouchableOpacity } from './TailwindComponent';
import { Icon } from './CustomIcon';

const CustomSubHeaderBar = ({ onBackPress, title, onDeletePress, onEditPress, style }) => {
  return (
    <View style={style}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBackPress}>
          <Icon source={require('../../assets/icons/Back.png')} />
        </TouchableOpacity>

        {/* Title (optional) */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* Right Buttons */}
        <View style={styles.buttonsContainer}>
          {onDeletePress && (
            <IconButton
              onPress={onDeletePress}
              iconSource={require('../../assets/icons/DeleteOutline.png')}
              size={40}
              type="delete"
            />
          )}
          {onEditPress && (
            <IconButton
              onPress={onEditPress}
              iconSource={require('../../assets/icons/Edit.png')}
              size={40}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export const SubHeaderBar = styled(CustomSubHeaderBar, 'pb-4');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

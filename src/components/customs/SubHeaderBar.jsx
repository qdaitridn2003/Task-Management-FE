import React, { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from './IconButton';
import { Color } from '../../common';
import { TouchableOpacity } from './TailwindComponent';
import { Icon } from './CustomIcon';

const CustomSubHeaderBar = ({ onBackPress, title, onDeletePress, onEditPress, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      {/* Title (optional) */}
      {title && <Text style={styles.title}>{title}</Text>}

      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress}>
        <Icon source={require('../../assets/icons/Back.png')} />
      </TouchableOpacity>

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
  );
};

export const SubHeaderBar = styled(CustomSubHeaderBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.neutral4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

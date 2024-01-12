import { styled } from 'nativewind';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from './CustomIcon';
import { IconButton } from './IconButton';
import { View, Text, TouchableOpacity } from './TailwindComponent';

const CustomSubHeaderBar = ({
  backButton = true,
  onBackPress,
  title,
  onDeletePress,
  onEditPress,
  style,
}) => {
  return (
    <View style={style}>
      <View tw={backButton ? 'justify-between' : 'justify-end'} style={styles.container}>
        {/* Back Button */}
        {backButton && (
          <TouchableOpacity onPress={onBackPress}>
            <Icon source={require('../../assets/icons/Back.png')} />
          </TouchableOpacity>
        )}

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
    alignItems: 'center',
    minHeight: 40,
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

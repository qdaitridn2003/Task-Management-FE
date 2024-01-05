import PropTypes from 'prop-types';
import { styled } from 'nativewind';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton as RNPaperIconButton } from 'react-native-paper';
import { Icon } from './CustomIcon';
import { Color } from '../../common';
import { Pressable, View } from './TailwindComponent';
import { CustomIcon } from './CustomIcon';

const CustomIconButton = ({ onPress, type, iconSource, iconColor, size, ...props }) => {
  const typeMappings = {
    primary: {
      iconColor: Color.neutral4,
      buttonColor: Color.primary,
    },
    secondary: {
      iconColor: Color.neutral1,
      buttonColor: Color.neutral4,
    },
    delete: {
      iconColor: Color.neutral4,
      buttonColor: Color.semanticRed,
    },
  };

  return (
    <View {...props}>
      <Pressable
        style={[
          styles.iconButton,
          { backgroundColor: typeMappings[type].buttonColor, width: size, height: size },
        ]}
        onPress={onPress ? onPress : () => console.log('IconButton pressed!')}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}>
        <Icon source={iconSource} color={iconColor ? iconColor : typeMappings[type].iconColor} />
      </Pressable>
    </View>
  );
};

export const IconButton = styled(CustomIconButton);

CustomIconButton.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'delete']),
  iconSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
    PropTypes.number,
  ]),
  size: PropTypes.number,
};

CustomIconButton.defaultProps = {
  size: 48,
  type: 'primary',
  iconSource: require('../../assets/icons/Plus.png'),
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Color.neutral1,
    elevation: 3,
  },
});

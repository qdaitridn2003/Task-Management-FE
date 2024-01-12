import { styled } from 'nativewind';
import { PropTypes } from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNPaperButton } from 'react-native-paper';

import { Icon } from './CustomIcon';
import { View } from './TailwindComponent';
import { Color } from '../../common';

const CustomButton = ({
  type,
  size,
  icon,
  textColor,
  iconSource,
  onPress,
  loading,
  children,
  style,
}) => {
  return (
    <View style={style}>
      <RNPaperButton
        style={[styles.containerStyle, { alignSelf: size === 'small' ? 'baseline' : 'stretch' }]}
        labelStyle={styles.labelStyle}
        contentStyle={[
          styles.contentStyle,
          {
            flexDirection: icon === 'right' ? 'row-reverse' : 'row',
            height: size === 'small' ? 40 : 48,
          },
        ]}
        mode="elevated"
        loading={loading}
        textColor={textColor ? textColor : type === 'secondary' ? Color.primary : Color.neutral4}
        buttonColor={type === 'secondary' ? Color.neutral4 : Color.primary}
        icon={() =>
          iconSource && (
            <Icon
              source={iconSource}
              color={textColor ? textColor : type === 'secondary' ? Color.primary : Color.neutral4}
            />
          )
        }
        onPress={onPress ? onPress : () => console.log('CustomButton pressed!')}>
        {children}
      </RNPaperButton>
    </View>
  );
};

export const Button = styled(CustomButton, 'mb-4 mx-5');

CustomButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['small', 'medium']),
  iconSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
    PropTypes.number,
  ]),
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  type: 'primary',
  icon: 'left',
  size: 'medium',
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    borderRadius: 16,
  },
  labelStyle: {
    fontSize: 16,
  },
  contentStyle: {},
});

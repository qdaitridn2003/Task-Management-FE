import React from 'react';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button as RNPaperButton } from 'react-native-paper';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
import { View } from './TailwindComponent';

const CustomButton = ({ type, size, icon, iconSource, onPress, loading, children, ...props }) => {
  return (
    <View {...props}>
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
        textColor={type === 'secondary' ? Color.primary : Color.neutral4}
        buttonColor={type === 'secondary' ? Color.neutral4 : Color.primary}
        icon={() =>
          iconSource && (
            <Icon
              source={iconSource}
              color={type === 'secondary' ? Color.primary : Color.neutral4}
            />
          )
        }
        onPress={onPress ? onPress : () => console.log('CustomButton pressed!')}>
        {children}
      </RNPaperButton>
    </View>
  );
};

export const Button = styled(CustomButton);

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

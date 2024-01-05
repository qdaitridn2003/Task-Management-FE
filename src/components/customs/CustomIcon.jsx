import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

export const Icon = ({ source, color, size, style }) => {
  return (
    <Image
      source={source}
      style={{
        tintColor: color,
        width: size,
        height: size,
        ...style,
      }}
    />
  );
};

Icon.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
    PropTypes.number,
  ]).isRequired,
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  size: 24,
  source: require('../../assets/icons/Plus.png'),
};

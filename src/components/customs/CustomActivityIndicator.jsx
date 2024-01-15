import React from 'react';
import { styled } from 'nativewind';
import { PaperActivityIndicator } from './TailwindComponent';

const CustomActivityIndicator = ({ style }) => {
  return <PaperActivityIndicator size="40" style={style} />;
};

export const ActivityIndicator = styled(CustomActivityIndicator);

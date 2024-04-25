import React from 'react';
import {View} from 'react-native';

interface Props {
  size: number;
}

export function Spacer({size}: Props) {
  return <View style={{height: size, width: size}} />;
}

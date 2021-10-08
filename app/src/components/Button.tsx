import React from 'react';
import { ActivityIndicator } from "react-native";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 7,
    flexDirection:'row',
    justifyContent:'center'
  },
  containerOutline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },

  text: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
    margin:5
  },
  textOutline: {
    color: colors.primary,
  },
});

type ButtonProps = {
  onPress: () => void;
  children: string;
  type?: 'outline';
  isLoading?: boolean;
};

export const Button = ({
  onPress = () => { },
  children = '',
  type,
  isLoading = false,
}: ButtonProps) => {
  const containerStyles: StyleProp<ViewStyle>[] = [styles.container];
  const textStyles: StyleProp<TextStyle>[] = [styles.text];

  if (type === 'outline') {
    containerStyles.push(styles.containerOutline);
    textStyles.push(styles.textOutline);
  }

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <Text style={textStyles}>{children}</Text>
      {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
    </TouchableOpacity>
  );
};

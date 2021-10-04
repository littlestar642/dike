import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../constants/colors';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';
import { AuthStackParams } from '../navigation/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const TextDemo = () => (
  <View style={styles.container}>
    <Text type="header">This is a header</Text>
    <Text type="subheader">This is a subheader</Text>
    <Text>This is normal text</Text>
  </View>
);

type Props = {
  navigation: StackNavigationProp<AuthStackParams>;
};

export const FormDemo = ({ navigation }: Props) => {
  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  return (
    <View style={styles.container}>
      <TextInput
        label="Email Address"
        placeholder="Enter your email..."
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button onPress={() => submit(navigation)}>Sign In</Button>
    </View>
  );
};

export const ButtonDemo = () => (
  <View style={styles.container}>
    <Button
      onPress={() => {
        Alert.alert('you pressed the default button');
      }}
    >
      Default Button
    </Button>
    <Button
      type="outline"
      onPress={() => {
        Alert.alert('you pressed the outline button');
      }}
    >
      Outline Button
    </Button>
  </View>
);

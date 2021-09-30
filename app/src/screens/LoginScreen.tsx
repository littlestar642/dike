import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../constants/colors';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';

import { useLogin } from '../util/auth';
import { MainStackParams } from '../navigation/Main';

type Props = {
  navigation: StackNavigationProp<MainStackParams>;
};

const LoginScreen = ({ navigation }: Props) => {
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
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Don't have an account?
      </Text>
      <Button type="outline" onPress={() => navigation.navigate('Signup')}>
        Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

import { StackNavigationProp } from '@react-navigation/stack';
import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { MainStackParams } from '../navigation/Main';
import Firebase from './FirebaseUtils';

type ErrorType = {
  email?: string;
  password?: string;
};

export const useLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const submit = (navigation: StackNavigationProp<MainStackParams>) => {
    const nextErrors: ErrorType = {};
    if (email.length === 0) {
      nextErrors.email = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    const instance = Firebase.getInstance();
    instance.addAuthChangeListener(user => {
      if (user !== null) {
        console.log('logged in', user);
        Alert.alert('Success!', `Email: ${email} \n Password: ${password}`);
        navigation.popToTop();
      } else {
        console.log('not logged in');
      }
    });
    instance.login(email, password);

    return null;
  };

  return {
    submit,
    errors,
    email,
    setEmail,
    password,
    setPassword,
  };
};

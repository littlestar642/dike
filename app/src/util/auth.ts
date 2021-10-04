import { StackNavigationProp } from '@react-navigation/stack';
import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { AuthStackParams } from '../navigation/Main';
import Firebase from './FirebaseUtils';

type ErrorType = {
  name?: string;
  email?: string;
  number?: string;
  password?: string;
  passwordConf?: string;
};

const useSignin = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const submit = (navigation: StackNavigationProp<AuthStackParams>) => {
    const nextErrors: ErrorType = {};
    if (name.length === 0) {
      nextErrors.name = 'This field is required.';
    }
    if (email.length === 0) {
      nextErrors.email = 'This field is required.';
    }
    if (number.length === 0) {
      nextErrors.number = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    if (passwordConf.length === 0) {
      nextErrors.passwordConf = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    const instance = Firebase.getInstance();
    // instance.addAuthChangeListener(user => {
    //   if (user !== null) {
    //     console.log('logged in', user);
    //     Alert.alert('Success!', `Email: ${email} \n Password: ${password}`);
    //     navigation.popToTop();
    //   } else {
    //     console.log('not logged in');
    //   }
    // });
    instance.createUser(email, password);
    return null;
  };
  return {
    submit,
    errors,
    name,
    setName,
    email,
    setEmail,
    number,
    setNumber,
    password,
    setPassword,
    passwordConf,
    setPasswordConf,
  };
};

const useLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const submit = (navigation: StackNavigationProp<AuthStackParams>) => {
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
export { useLogin, useSignin };

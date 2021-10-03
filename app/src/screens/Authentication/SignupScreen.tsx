import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';

import { useSignin } from '../../util/auth';
import { MainStackParams } from '../../navigation/Main';

type Props = {
  navigation: StackNavigationProp<MainStackParams>;
};

const SignupScreen: React.ComponentType<Props> = (props:Props) => {
  console.log('in signup');
  return (
    <View>
      <Text>
        Signup
      </Text>
    </View>
  );
}

// const SignupScreen = ({ navigation }: Props) => {
//   const {
//     submit,
//     errors,
//     name,
//     setName,
//     email,
//     setEmail,
//     number,
//     setNumber,
//     password,
//     setPassword,
//     passwordConf,
//     setPasswordConf,
//   } = useSignin();

//   return (
//     <View style={{ flex: 1 }}>
//       <KeyboardAvoidingView behavior="position" style={styles.container}>
//         <TextInput
//           label="Name"
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={(text: string) => setName(text)}
//           errorText={errors.name}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Email Address"
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text: string) => setEmail(text)}
//           errorText={errors.email}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Phone Number"
//           placeholder="Enter your phone no."
//           value={number}
//           onChangeText={(text: string) => setNumber(text)}
//           errorText={errors.number}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Password"
//           placeholder="Enter your password"
//           value={password}
//           onChangeText={(text: string) => setPassword(text)}
//           secureTextEntry
//           errorText={errors.password}
//           autoCapitalize="none"
//         />
//         <TextInput
//           label="Confirm Password"
//           placeholder="Enter your password again"
//           value={passwordConf}
//           onChangeText={(text: string) => setPasswordConf(text)}
//           secureTextEntry
//           errorText={errors.passwordConf}
//           autoCapitalize="none"
//         />
//         <Button onPress={() => submit(navigation)}>Sign Up</Button>
//         {/* <View style={{ height: 5 }}></View> */}
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 20,
  },
});

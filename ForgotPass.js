import React from 'react';
import {Button} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';

const ForgotPass = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Text
        style={{
          fontSize: 24,
        }}>
        Forgot Password?
      </Text>
    </View>
  );
};
export default ForgotPass;

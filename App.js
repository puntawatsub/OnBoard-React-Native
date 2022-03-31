import React, {useEffect} from 'react';
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
  Linking,
  Alert,
} from 'react-native';
import obTeacher from './resources/ob-teacher.svg';
import Svg, {Defs, LinearGradient, Stop, G, Path} from 'react-native-svg';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firebase from './firebase/firebase';
import ForgotPassword from './ForgotPass';
import SafariModal from 'react-native-safari-modal';
import {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import globalData from './data/globalData';
import HomeViewController from './HomeViewController';
import * as RootNavigation from './RootNavigation';
import {navigationRef} from './RootNavigation';
import {useIsFocused} from '@react-navigation/native';
import {PointerInteractionView} from '@thefunbots/react-native-pointer-interactions';

const auth = getAuth();

const OBTeacherSVG = props => {
  return (
    <Svg
      width={300}
      height={75}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 23.57C0 11.094 10.113.98 22.589.98H51.07c12.475 0 22.588 10.114 22.588 22.59V52.05c0 12.476-10.113 22.589-22.589 22.589H22.59C10.113 74.64 0 64.527 0 52.051V23.57Z"
        fill="url(#a)"
      />
      <Path
        d="M20.128 20.673c4.156-4.209 9.711-6.313 16.666-6.313 6.954 0 12.49 2.104 16.604 6.313 4.156 4.208 6.234 9.917 6.234 17.125s-2.078 12.917-6.234 17.125c-4.115 4.209-9.65 6.313-16.604 6.313-6.955 0-12.51-2.104-16.666-6.313-4.115-4.208-6.173-9.917-6.173-17.125s2.058-12.917 6.173-17.125Zm7.715 28.063c2.14 2.5 5.124 3.75 8.95 3.75 3.828 0 6.79-1.25 8.89-3.75 2.14-2.5 3.21-6.146 3.21-10.938 0-4.792-1.07-8.438-3.21-10.938-2.1-2.5-5.062-3.75-8.89-3.75-3.826 0-6.81 1.25-8.95 3.75-2.098 2.5-3.148 6.146-3.148 10.938 0 4.792 1.05 8.438 3.148 10.938Z"
        fill="#FFF7E1"
      />
      <Path
        d="M92.986 30.86c3.52 0 6.178.863 7.974 2.586 1.797 1.686 2.695 4.436 2.695 8.25V60.89h-4.784V42.026c0-4.73-2.2-7.095-6.6-7.095-3.264 0-5.519.916-6.765 2.75-1.247 1.833-1.87 4.473-1.87 7.92v15.29h-4.84V31.41H82.7l.715 4.015h.275c.953-1.54 2.273-2.677 3.96-3.41a12.699 12.699 0 0 1 5.335-1.155ZM115.709 29.266c0 1.247-.036 2.42-.11 3.52-.036 1.063-.091 1.906-.165 2.53h.275c.844-1.247 1.999-2.292 3.465-3.135 1.467-.843 3.355-1.265 5.665-1.265 3.667 0 6.6 1.283 8.8 3.85 2.237 2.53 3.355 6.325 3.355 11.385s-1.118 8.873-3.355 11.44c-2.237 2.566-5.17 3.85-8.8 3.85-2.31 0-4.198-.422-5.665-1.266-1.466-.843-2.621-1.851-3.465-3.025h-.385l-.99 3.74h-3.465V19.091h4.84v10.175Zm8.305 5.665c-3.117 0-5.28.898-6.49 2.695-1.21 1.796-1.815 4.583-1.815 8.36v.22c0 3.63.587 6.416 1.76 8.36 1.21 1.906 3.428 2.86 6.655 2.86 2.64 0 4.602-.972 5.885-2.916 1.32-1.943 1.98-4.748 1.98-8.414 0-7.444-2.658-11.165-7.975-11.165ZM168.411 46.096c0 4.876-1.247 8.653-3.74 11.33-2.456 2.676-5.793 4.014-10.01 4.014-2.603 0-4.931-.586-6.984-1.76-2.017-1.21-3.612-2.951-4.785-5.225-1.174-2.31-1.76-5.096-1.76-8.36 0-4.876 1.228-8.634 3.685-11.274 2.456-2.64 5.793-3.96 10.009-3.96 2.677 0 5.024.605 7.04 1.815 2.054 1.173 3.649 2.896 4.785 5.17 1.173 2.236 1.76 4.986 1.76 8.25Zm-22.274 0c0 3.483.678 6.251 2.035 8.304 1.393 2.017 3.593 3.025 6.599 3.025 2.97 0 5.152-1.008 6.545-3.025 1.394-2.053 2.09-4.821 2.09-8.304 0-3.484-.696-6.215-2.09-8.195-1.393-1.98-3.593-2.97-6.6-2.97-3.006 0-5.188.99-6.544 2.97-1.357 1.98-2.035 4.711-2.035 8.195ZM185.322 30.916c3.593 0 6.251.788 7.974 2.365 1.724 1.576 2.585 4.088 2.585 7.535V60.89h-3.52l-.935-4.18h-.22c-1.283 1.614-2.639 2.805-4.069 3.575-1.394.77-3.337 1.155-5.83 1.155-2.677 0-4.895-.696-6.655-2.09-1.76-1.43-2.64-3.648-2.64-6.655 0-2.933 1.155-5.188 3.465-6.764 2.31-1.614 5.866-2.494 10.67-2.64l5.004-.165v-1.76c0-2.457-.531-4.162-1.594-5.115-1.064-.954-2.567-1.43-4.51-1.43-1.54 0-3.007.238-4.4.715a28.82 28.82 0 0 0-3.905 1.54l-1.485-3.63c1.283-.697 2.805-1.283 4.565-1.76 1.76-.514 3.593-.77 5.5-.77Zm1.43 15.73c-3.667.146-6.215.733-7.645 1.76-1.394 1.026-2.09 2.474-2.09 4.344 0 1.65.495 2.86 1.485 3.63 1.026.77 2.328 1.155 3.905 1.155 2.493 0 4.565-.678 6.215-2.035 1.65-1.393 2.474-3.52 2.474-6.38v-2.64l-4.344.166ZM216.811 30.86c.55 0 1.137.038 1.76.11.66.038 1.228.11 1.705.22l-.605 4.456a15.893 15.893 0 0 0-1.595-.275c-.55-.074-1.082-.11-1.595-.11-1.503 0-2.915.421-4.235 1.265-1.32.806-2.383 1.961-3.19 3.465-.77 1.466-1.155 3.19-1.155 5.17v15.73h-4.84V31.41h3.96l.55 5.39h.22a14.859 14.859 0 0 1 3.685-4.18c1.503-1.174 3.282-1.76 5.335-1.76ZM233.231 61.44c-3.666 0-6.6-1.265-8.8-3.795-2.2-2.566-3.299-6.38-3.299-11.44s1.099-8.873 3.299-11.44c2.237-2.602 5.189-3.904 8.855-3.904 2.274 0 4.125.421 5.555 1.265 1.467.843 2.658 1.87 3.575 3.08h.33a54.08 54.08 0 0 0-.22-2.09 31.328 31.328 0 0 1-.11-2.255V19.09h4.84v41.8h-3.905l-.715-3.96h-.22c-.88 1.246-2.053 2.31-3.52 3.19-1.466.88-3.355 1.32-5.665 1.32Zm.77-4.015c3.117 0 5.299-.843 6.545-2.53 1.283-1.723 1.925-4.308 1.925-7.755v-.88c0-3.666-.605-6.471-1.815-8.414-1.21-1.98-3.446-2.97-6.71-2.97-2.603 0-4.565 1.045-5.885 3.135-1.283 2.053-1.925 4.821-1.925 8.305 0 3.52.642 6.251 1.925 8.194 1.32 1.944 3.3 2.915 5.94 2.915Z"
        fill="#000"
      />
      <Path
        d="M256.847 10.802h-1.237V2.07h-3.067V.985h7.357V2.07h-3.053v8.73ZM262.613 3.295c.633 0 1.173.137 1.623.412.458.275.806.665 1.045 1.169.247.495.371 1.077.371 1.746v.729h-5.046c.018.834.229 1.47.632 1.91.413.432.986.647 1.719.647.467 0 .88-.041 1.237-.124.367-.091.743-.22 1.128-.385v1.06a5.408 5.408 0 0 1-1.114.357 6.02 6.02 0 0 1-1.306.123c-.697 0-1.316-.142-1.856-.426a3.03 3.03 0 0 1-1.252-1.265c-.293-.568-.44-1.26-.44-2.076 0-.807.133-1.499.399-2.076.275-.578.656-1.022 1.141-1.334.495-.312 1.068-.467 1.719-.467Zm-.014.99c-.577 0-1.035.187-1.375.563-.33.367-.527.88-.591 1.54h3.754c-.009-.623-.156-1.127-.44-1.512-.284-.394-.733-.592-1.348-.592ZM269.838 3.308c.898 0 1.563.197 1.994.591.43.395.646 1.023.646 1.884v5.019h-.88l-.234-1.045h-.055c-.321.403-.66.701-1.017.894-.349.192-.834.288-1.458.288-.669 0-1.224-.174-1.664-.522-.439-.358-.659-.912-.659-1.664 0-.733.288-1.297.866-1.691.577-.403 1.466-.623 2.667-.66l1.251-.041v-.44c0-.614-.132-1.04-.398-1.279-.266-.238-.642-.358-1.128-.358-.385 0-.751.06-1.1.18-.348.11-.674.238-.976.384l-.371-.907c.321-.174.701-.321 1.141-.44.44-.129.898-.193 1.375-.193Zm.357 3.933c-.916.036-1.553.183-1.911.44-.348.256-.522.618-.522 1.086 0 .412.123.715.371.907.257.193.582.29.976.29.624 0 1.141-.17 1.554-.51.412-.348.619-.88.619-1.595V7.2l-1.087.042ZM277.229 10.94c-.651 0-1.233-.134-1.746-.4-.504-.265-.903-.678-1.196-1.237-.285-.559-.427-1.274-.427-2.145 0-.907.152-1.645.454-2.214.303-.568.711-.985 1.224-1.25.522-.267 1.114-.4 1.774-.4.375 0 .737.042 1.086.124.348.074.632.165.852.275l-.371 1.004a7.18 7.18 0 0 0-.77-.234 3.406 3.406 0 0 0-.825-.11c-1.448 0-2.172.93-2.172 2.791 0 .89.174 1.572.522 2.05.358.467.885.7 1.581.7.404 0 .757-.04 1.059-.123.312-.083.596-.184.853-.303v1.073a3.263 3.263 0 0 1-.825.288c-.294.074-.651.11-1.073.11ZM281.608 3.418c0 .367-.023.71-.069 1.031h.083a2.28 2.28 0 0 1 .962-.852 3.116 3.116 0 0 1 1.334-.289c.898 0 1.572.216 2.021.646.449.422.674 1.105.674 2.05v4.798h-1.196V6.086c0-1.183-.55-1.774-1.65-1.774-.825 0-1.394.234-1.705.701-.303.459-.454 1.119-.454 1.98v3.809h-1.21V.352h1.21v3.066ZM291.263 3.295c.632 0 1.173.137 1.622.412.458.275.807.665 1.045 1.169.247.495.371 1.077.371 1.746v.729h-5.046c.018.834.229 1.47.633 1.91.412.432.985.647 1.718.647.468 0 .88-.041 1.238-.124.366-.091.742-.22 1.127-.385v1.06a5.408 5.408 0 0 1-1.114.357 6.014 6.014 0 0 1-1.306.123c-.696 0-1.315-.142-1.856-.426a3.023 3.023 0 0 1-1.251-1.265c-.294-.568-.44-1.26-.44-2.076 0-.807.133-1.499.399-2.076.275-.578.655-1.022 1.141-1.334.495-.312 1.068-.467 1.719-.467Zm-.014.99c-.578 0-1.036.187-1.375.563-.33.367-.527.88-.591 1.54h3.753c-.009-.623-.156-1.127-.44-1.512-.284-.394-.733-.592-1.347-.592ZM299.134 3.295c.137 0 .284.009.44.027.165.01.307.027.426.055l-.151 1.114a4.006 4.006 0 0 0-.798-.097c-.376 0-.729.106-1.059.317-.33.201-.595.49-.797.866-.193.367-.289.797-.289 1.292v3.933h-1.21v-7.37h.99l.138 1.347h.055c.238-.403.545-.751.921-1.045.376-.293.82-.44 1.334-.44Z"
        fill="#F59209"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={18.415}
          y1={-4.019}
          x2={78.443}
          y2={98.09}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F2DB06" />
          <Stop offset={1} stopColor="#F8520B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

const Login = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    checkLoggedIn();
  }, [navigation]);

  const checkLoggedIn = () => {
    setTimeout(function () {
      const currentUser = auth.currentUser;
      if (currentUser != null) {
        globalData.useruuid = currentUser.uid;
        globalData.userEmail = currentUser.email;
        navigation.navigate('Home');
      } else {
        console.log('User is not logged in');
      }
    }, 1000);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordChangeHandler = e => {
    setPassword(e);
  };

  const emailChangeHandler = e => {
    setEmail(e);
  };

  const onLoginPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        globalData.useruuid = user.uid;
        globalData.userEmail = user.email;
        navigation.navigate('Home');
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Sign In Error', `${errorMessage}`, [
          {text: 'Dismiss', onPress: () => console.log('Dismiss Pressed')},
        ]);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%', height: '100%'}}
      behavior={Platform.OS === 'ios' ? 'height' : ''}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <StatusBar hidden={true}></StatusBar>
        <OBTeacherSVG
          style={{
            marginBottom: 35,
          }}></OBTeacherSVG>
        <TextInput
          style={{
            width: 500,
            borderWidth: 1,
            height: 48,
            borderRadius: 100,
            marginBottom: 20,
            textAlign: 'center',
          }}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={e => {
            emailChangeHandler(e);
          }}
          value={email}></TextInput>
        <TextInput
          style={{
            width: 500,
            borderWidth: 1,
            height: 48,
            borderRadius: 100,
            marginBottom: 20,
            textAlign: 'center',
          }}
          placeholder="Password"
          secureTextEntry
          onChangeText={e => {
            passwordChangeHandler(e);
          }}
          value={password}></TextInput>
        <PointerInteractionView
          pointerMode="highlight"
          style={{
            width: 500,
            height: 48,
            borderRadius: 100,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              width: 500,
              height: 48,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F59209',
              borderColor: '#F59209',
            }}
            onPress={() => {
              onLoginPressed();
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Login</Text>
          </TouchableOpacity>
        </PointerInteractionView>
        <PointerInteractionView
          pointerMode="highlight"
          style={{
            marginTop: 20,
            width: 160,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              SafariModal.openURL(
                'https://teacher-onboardapp.web.app/auth/signup',
              )
            }>
            <Text style={{color: '#F59209'}}>Alternatively, Sign Up</Text>
          </TouchableOpacity>
        </PointerInteractionView>

        <PointerInteractionView
          style={{
            marginTop: 6,
            width: 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={{color: '#919191'}}>Forgot Password?</Text>
          </TouchableOpacity>
        </PointerInteractionView>
      </View>
    </KeyboardAvoidingView>
  );
};

const ForgotPass = () => {
  return <ForgotPassword></ForgotPassword>;
};

const HomeView = ({navigation}) => {
  return <HomeViewController navigation={navigation}></HomeViewController>;
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Forgot Password" component={ForgotPass} />
        <Stack.Screen
          name="Home"
          options={{headerShown: false, gestureEnabled: false}}
          component={HomeView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React, { useState } from 'react';
import {
  Button,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"
import { ModalView } from 'react-native-ios-modal';
import { TableView, Cell } from 'react-native-tableview-simple';
import globalData from './data/globalData';
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { PointerInteractionView } from '@thefunbots/react-native-pointer-interactions';


const OnBoardLogoSVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.25}
        x2={1.065}
        y2={1.318}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#f2db06" />
        <Stop offset={1} stopColor="#f8520b" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 10">
      <Path
        data-name="Rectangle 6"
        d="M0 13A13 13 0 0 1 13 0h24a13 13 0 0 1 13 13v24a13 13 0 0 1-13 13H13A13 13 0 0 1 0 37Z"
        fill="url(#a)"
      />
      <Path
        d="M13.754 13.49Q17.961 9.247 25 9.247t11.2 4.243q4.207 4.243 4.207 11.511t-4.203 11.51q-4.165 4.243-11.2 4.243t-11.25-4.243Q9.589 32.268 9.589 25t4.165-11.51Zm5.207 18.862A7.536 7.536 0 0 0 25 34.873a7.411 7.411 0 0 0 6-2.521q2.166-2.521 2.166-7.352t-2.168-7.353a7.411 7.411 0 0 0-6-2.521 7.536 7.536 0 0 0-6.037 2.521q-2.124 2.521-2.124 7.352t2.124 7.353Z"
        fill="#fff7e1"
      />
    </G>
  </Svg>
)
const UserCircle = (props) => {
  return (
      <Svg
      width={45}
      height={45}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.5 22.5c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18ZM27 15.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-4.5 9c-4.54 0-8.451 2.689-10.23 6.56A13.47 13.47 0 0 0 22.5 36a13.47 13.47 0 0 0 10.229-4.69 11.252 11.252 0 0 0-10.23-6.56Z"
        fill="#333"
      />
    </Svg>
  )
}

const HomeViewController = props => {

  const [modalVisible, setModalVisible] = useState(false);

  const logOutPressed = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      globalData.userEmail = ''
      globalData.useruuid = ''
      this.isModalOpen.setVisibility(false)
      props.navigation.goBack()

    }).catch((error) => {
      // An error happened.
        Alert.alert(
          "Alert",
          `${error}`,
          [
            
            { text: "Dismiss", onPress: () => console.log("Dismiss Pressed") }
          ]
        )
    });
  }
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  return (
    <View style={{  backgroundColor: '#FFFFFF', width: '100%', height: '100%' }}>
      <ModalView ref={r => this.isModalOpen = r} isModalBGBlurred={false} isModalBGTransparent={false} >
        <View style={{ width: '100%', height: '100%', backgroundColor: '#f3f2f8' }}>
          <View style={{ height: 55, backgroundColor: '#F8F6F8', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5, borderColor: '#C0BFBF' }}>
            <Text style={{ textAlign: 'center', fontSize: 16, }}>User Settings</Text>
            
            <PointerInteractionView  style={{ marginLeft: 5, alignSelf: 'flex-start', position: 'absolute', height: 45, alignItems: 'center', justifyContent: 'center', width: 70 }} pointerMode="highlight">
              <TouchableOpacity onPress={() => {this.isModalOpen.setVisibility(false)}}><Text style={{ color: '#007AFF', fontSize: 17, }}>Close</Text></TouchableOpacity>
            </PointerInteractionView>
            
            
          </View>
          <ScrollView style={{ width: '100%', height: '100%' }}>
              <TableView style={{ marginTop: 20, }}>
                <Cell
                  title={`${globalData.userEmail}`}
                />
                <Cell
                  title={'Log Out'}
                  onPress={() => {logOutPressed()}}
                  titleTextColor={'red'}
                />
              </TableView>
            </ScrollView>
        </View>
          
      </ModalView>
      <View style={{ paddingLeft: 25, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15, paddingBottom: 18, }}>
        <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <OnBoardLogoSVG style={{ marginTop: 15, }}></OnBoardLogoSVG>
        </View>
        <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <PointerInteractionView pointerMode="highlight" style={{ borderRadius: 60, width: 55, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <TouchableOpacity onPress={() => {this.isModalOpen.setVisibility(true)}}>
              <View>
                <UserCircle></UserCircle>
              </View>
            </TouchableOpacity>
          </PointerInteractionView>
        </View>
        
        
      </View>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        
        <View style={{ width: '100%', height: '100%', marginTop: 30, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>
          <PointerInteractionView pointerMode="hover" style={{ width: 250, marginHorizontal: 45, height: 190, borderRadius: 18, marginBottom: 40 }}>
            <TouchableOpacity style={{ borderWidth: 1, width: 250, height: 190, borderRadius: 18, backgroundColor: '#FDE0B8', }}>
              <Text style={{ fontSize: 24, marginTop: 120, marginLeft: 140, position: 'absolute' }}>Algebra</Text>
              <Text style={{ fontSize: 16, marginTop: 150, marginLeft: 195, position: 'absolute' }}>4/8</Text>
            </TouchableOpacity>
          </PointerInteractionView>

        </View>
        <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {console.log('refresh'); onRefresh()}}
              style={{ position: 'relative' }}
        />
        
      </ScrollView>
    </View>
  );
};

export default HomeViewController;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
// import ZegoUIKitPrebuiltCall, {
//   ONE_ON_ONE_VIDEO_CALL_CONFIG,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitPrebuiltVideoConference from '@zegocloud/zego-uikit-prebuilt-video-conference-rn'
import { ZegoLayoutMode } from '@zegocloud/zego-uikit-rn'
import axios from 'axios';
import {ZegoStreamEvent} from 'zego-express-engine-reactnative';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const stack = createNativeStackNavigator();

function App({navigation}): JSX.Element {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState('');
  const twilioRef = useRef(null);
  console.log(status);
  const randomUserId = String(Math.floor(Math.random() * 100000));

  const callScreen = ({navigation}) => {
    return (
      <View style={{flex:1}}>
        <ZegoUIKitPrebuiltVideoConference
                appID={444653460}
                appSign={'2868d145eb84c0faea600e32548d9213bc8b214ab82ab91b8f8541fa0c6accf2'}
                userID={randomUserId} // userID can be something like a phone number or the user id on your own user system. 
                userName={'user_' +randomUserId}
                conferenceID={'123'} // conferenceID can be any unique string. 

                config={{
                    onLeave: () => { 
                      axios.get('https://rtc-api.zego.im/?Action=CloseRoom&RoomId=123')
                      navigation.navigate('home') 
                    },
                    layout:{
                      mode: ZegoLayoutMode.gallery,
                  }
                }}
            />
      </View>
    );
  };

  const connectCall = ({navigation}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Call" onPress={() => navigation.navigate('call')} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="home" component={connectCall} />
        <stack.Screen name="call" component={callScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


 import React from 'react';
 import { useState } from 'react';
 import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
 
 import AppleHealthKit, {
   HealthKitPermissions,
 } from 'react-native-health'

 import HeartRateInfo from './components/HeartRateInfo'
 import StepsInfo from './components/StepsInfo'
 import RestingHeartRateInfo from './components/RestingHeartRateInfo'
 
 import styles from './App.style.js';


import { NavigationContainer } from '@react-navigation/native';


import { createNativeStackNavigator } from '@react-navigation/native-stack';


import RNExitApp from 'react-native-exit-app';

import SetDate from './components/SetDate';


const Separator = () => {
  return (
  <View style={styles.separator}>
  </View>
  )
}




 const HomeScreen = ({route, navigation}) => {
   return (
    <SafeAreaView style={styles.container}>
    <View>
    <Separator/>
    <Name name={route.params.name}/>
    <Separator/>
    <Separator/>
    <Button onPress={() => navigation.navigate('Asetukset')}
    title="Asetukset" color="#f194ff"/>
    <Separator/>
    <Button onPress={() => navigation.navigate('Syke ja askeleet')}
    title="Syke ja askeleet"/>
    <Separator/>
    <Button onPress={() => RNExitApp.exitApp()}
    title="Sulje sovellus" color="#ff4d4d"/>
    </View>
    </SafeAreaView>
   )
 }

 



 const HeartAndStepsScreen = ({route}) => {
    
  const [date, setDate] = useState(new Date());
  let startingDate = date
  startingDate.setHours(0,0,0,0)
  let endingDate = new Date(startingDate);
  endingDate.setDate(endingDate.getDate() + 1)
  endingDate.setHours(0,0,0,0)

  let HeartRateOptions = {
  
      
    startDate: startingDate.toISOString(),
    endDate: endingDate.toISOString()
    
      
    }

   return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={{flexGrow : 1}}>
    <View style={styles.scrollViewContainer}> 
    <Separator/>
    <Text style={styles.baseText}>
    Syke ja askeleet
    </Text>
    <Separator/>
    <SetDate date={date} setDate={setDate}/>
    <HeartRateInfo permissionGranted={route.params.permissionGranted} date={date} options={HeartRateOptions} />
    <Separator/>
    <RestingHeartRateInfo permissionGranted={route.params.permissionGranted} date={date} options={HeartRateOptions}/>
    <Separator/>
    <Separator/>
    <StepsInfo permissionGranted={route.params.permissionGranted} date={date}/>
    </View>
    </ScrollView>
    </View>
   )
 }

 //I name is set returns greeting and if not not returns only the greeting
 const Name = (props) => {
  const name = props.name
  if (name == "") {
   return ( 
    <Text style={styles.welcome}>
    Hei
    </Text>
   )
  }
  else {
    return (
      <Text style={styles.welcome}>
    Hei, {name}
    </Text>
    )
  }

 }

 const SettingsScreen = ({navigation}) => {
  const [name, setName] = useState("");


   return (
    <SafeAreaView style={styles.container}>
    <View style= {styles.settingsViewContainer}>
    <Separator/>
    <Text style={styles.settingsText}>
     Aseta nimesi (valinnainen)
   </Text>
   <Separator/>
   <TextInput
        onChangeText={setName}
        value={name}
        placeholder="Nimesi"
        style={styles.nameInput}
      />
      <Separator/>
      <Button onPress={() => saveName({name, navigation})}
    title="Tallenna"/>
   </View>
   </SafeAreaView>
   )
}



const saveName = ({name, navigation}) => {
  navigation.navigate('Koti', {
    name: name
  });
}
 
 
 const App = () => {

  const Stack = createNativeStackNavigator();
  const [permissionGranted, setPermissionGranted] = useState(false);

   
 
 /* Permission options */
 const permissions = {
   permissions: {
     read: [AppleHealthKit.Constants.Permissions.HeartRate, AppleHealthKit.Constants.Permissions.Steps, 
      AppleHealthKit.Constants.Permissions.StepCount, 
      AppleHealthKit.Constants.Permissions.RestingHeartRate]  
   },
 } as HealthKitPermissions
 
 AppleHealthKit.initHealthKit(permissions, (error: string) => {
   /* Called after we receive a response from the system */
 
   if (error) {
     console.log('[ERROR] Cannot grant permissions!')
   }
   setPermissionGranted(true)
   /* Can now read or write to HealthKit */
 
 
 })

 
 
 
 return (
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Koti" component={HomeScreen} initialParams={{name: ""}}/>
  <Stack.Screen name="Asetukset" component={SettingsScreen} />
  <Stack.Screen name="Syke ja askeleet" component={HeartAndStepsScreen} initialParams={{permissionGranted: permissionGranted}}/>
  </Stack.Navigator>  

  </NavigationContainer>

 )

};


export default App;



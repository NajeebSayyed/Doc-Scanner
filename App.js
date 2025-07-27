import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ScannerScreen from './screens/ScannerScreen'
import SaveOptionsScreen from './screens/SaveOptionsScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Scanner'>
        <Stack.Screen name='Scanner' component={ScannerScreen} options={{headerShown:false}} />
        <Stack.Screen name='SaveOptions' component={SaveOptionsScreen} options={{title:'Save Document'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
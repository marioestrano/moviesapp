import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { Navigation } from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { FadeScreen } from './src/screens/FadeScreen';
import { GradientProvider } from './src/context/GradienContext';


const AppState = ({children}: any) => {
  return (
    <GradientProvider>
      {children }
    </GradientProvider>
  )
} 

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer>
     <AppState>

      <Navigation/>
      {/* <FadeScreen/> */}
      
     </AppState>
    </NavigationContainer>
   </GestureHandlerRootView>
  )
}




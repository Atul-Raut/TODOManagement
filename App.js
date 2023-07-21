import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ExternalStackNavigator } from "./components/common/navigator/ExternalStackNavigator";
export default function App({ navigation }) {
  // Added navigations
  //We can add more navigations here
  return (
      <NavigationContainer>
        <ExternalStackNavigator/>
      </NavigationContainer>
  );
}

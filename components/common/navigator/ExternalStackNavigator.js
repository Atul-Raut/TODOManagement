import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Assignment from "../Assignment";

//Created stack Navigator for non authintication pages
const Stack = createStackNavigator();

const ExternalStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* By landing page navigation */}
        <Stack.Screen
            name="TODO List"
            component={Assignment}
          />
          {/* Add new screen which wants to navigate from Stack navigator */}
    </Stack.Navigator>
  );
}

export { ExternalStackNavigator };
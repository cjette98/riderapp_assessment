import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsNavigator} from './BottomNavigation';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

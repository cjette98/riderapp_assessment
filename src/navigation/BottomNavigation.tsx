import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Requests from '../screens/Requests';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="th-list" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

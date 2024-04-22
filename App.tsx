import React from 'react';
import {AppNavigator} from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {usePermissions} from './src/hooks/usePermissions';

function App() {
  usePermissions();

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;

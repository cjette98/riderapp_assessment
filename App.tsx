import React from 'react';
import {AppNavigator} from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {usePermissions} from './src/hooks/usePermissions';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  usePermissions();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;

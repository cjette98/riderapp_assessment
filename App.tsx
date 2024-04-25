import React from 'react';
import {AppNavigator} from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {usePermissions} from './src/hooks/usePermissions';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {store} from './store';
import {Provider} from 'react-redux';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

const queryClient = new QueryClient();

function App() {
  usePermissions();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <SafeAreaView edges={['top', 'bottom']} style={{flex: 1}}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

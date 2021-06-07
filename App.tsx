/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import AppNavigation from './src/AppNavigation';
import store from "./src/redux/store";
import {connect, Provider} from 'react-redux';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export const orangeColor = '#E7421B';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <QueryClientProvider client={queryClient}>
      <AppNavigation />
        </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;

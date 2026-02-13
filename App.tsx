import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import NavigationStack, { RNStackParamList } from './src/navigation/NavigationStack';
import bridgeUtils from './src/bridge/bridgeUtils';
import './src/i18n/config';

interface InitialProps {
  userId?: string;
  authToken?: string;
  userName?: string;
}

function App(initialProps?: InitialProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [initialParams, setInitialParams] = useState<
    RNStackParamList['DashboardScreen'] | undefined
  >();

  useEffect(() => {
    if (initialProps?.userId && initialProps?.authToken) {
      setInitialParams({
        userId: initialProps.userId,
        authToken: initialProps.authToken,
        userName: initialProps.userName,
      });
    }

    const unsubscribeNativeEvent = bridgeUtils.onNativeEvent(
      'user_authenticated',
      (data) => {
        setInitialParams({
          userId: data.userId,
          authToken: data.authToken,
          userName: data.userName,
        });
      }
    );

    return () => {
      unsubscribeNativeEvent();
    };
  }, [initialProps]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationStack initialParams={initialParams} />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

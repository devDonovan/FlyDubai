import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';

export type RNStackParamList = {
  DashboardScreen: {
    userId: string;
    authToken: string;
    userName?: string;
  };
  ProfileScreen: undefined;
  TransactionsScreen: undefined;
};

const Stack = createNativeStackNavigator<RNStackParamList>();

interface NavigationStackProps {
  initialParams?: RNStackParamList['DashboardScreen'];
}

const NavigationStack: React.FC<NavigationStackProps> = ({
  initialParams,
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide React Navigation header - we use native header instead
          animationEnabled: true,
        }}
        initialRouteName="DashboardScreen"
      >
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          initialParams={initialParams}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="TransactionsScreen"
          component={TransactionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;

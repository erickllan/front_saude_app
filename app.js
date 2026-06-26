import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/homescreen';
import HistoricoScreen from './src/screens/historicoscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Unidades de Saúde" component={HomeScreen} />
        <Stack.Screen name="Histórico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
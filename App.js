// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Quiz from './Quiz';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Quiz" component={Quiz} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
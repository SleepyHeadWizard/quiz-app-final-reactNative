// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Quiz from './Quiz';
import Login from './login';
import AddQuestion from './AddQuestion';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Quiz" component={Quiz} />
                <Stack.Screen name="AddQuestion" component={AddQuestion} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MyPannel from '../pages/MyPannel'
import Profile from '../pages/Profile'

const App = createStackNavigator()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#155799',
      },
      cardStyle: {
        backgroundColor: '#155799',
      },
    }}
  >
    <App.Screen name="MyPannel" component={MyPannel} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
)

export default AppRoutes

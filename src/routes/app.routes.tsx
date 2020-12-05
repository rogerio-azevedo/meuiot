import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MyPannel from '../pages/MyPannel'

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
  </App.Navigator>
)

export default AppRoutes

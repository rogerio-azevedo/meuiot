import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
// <Auth.Navigator
//   screenOptions={{
//     headerShown: false,
//     headerTintColor: '#fff',
//     headerStyle: {
//       backgroundColor: '#155799',
//     },
//     cardStyle: {
//       backgroundColor: '#155799',
//     },
//   }}
// >
//   <Auth.Screen name="SignIn" component={SignIn} />
//   <Auth.Screen name="SignUp" component={SignUp} />
// </Auth.Navigator>

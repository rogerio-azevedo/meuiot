import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Text, Button } from 'react-native'
import { useAuth } from '../../hooks/auth'

import Background from '../../components/Background'
import { Container } from './styles'

const Profile: React.FC = () => {
  const navigation = useNavigation()
  const { signOut } = useAuth()

  return (
    <Background>
      <Container>
        <Text>Meu Perfil</Text>
        <Button
          title="Voltar"
          onPress={() => navigation.navigate('MyPannel')}
        />
        <Button title="Sair" onPress={signOut} />
      </Container>
    </Background>
  )
}

export default Profile

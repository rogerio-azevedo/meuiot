import React from 'react'
import { Image } from 'react-native'

import logoIgm from '../../assets/logo.png'

import { Container } from './styles'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoIgm} />
    </Container>
  )
}

export default SignIn

import React from 'react'
import { Image } from 'react-native'

import logoIgm from '../../assets/logo.png'

import Background from '../../components/Background'

import * as Styles from './styles'

const SignIn: React.FC = () => {
  return (
    <Background>
      <Styles.Container>
        <Styles.Title>Faça seu login</Styles.Title>
        <Image source={logoIgm} />
      </Styles.Container>
    </Background>
  )
}

export default SignIn

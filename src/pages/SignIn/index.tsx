import React from 'react'
import { Image, Text } from 'react-native'

import logoIgm from '../../assets/logo.png'

import * as Styles from './styles'

const SignIn: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Title>Faça seu login</Styles.Title>
      <Image source={logoIgm} />
    </Styles.Container>
  )
}

export default SignIn

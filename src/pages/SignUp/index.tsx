import React, { useCallback, useRef } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErrors'

import Background from '../../components/Background'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

import api from '../../services/api'

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  LogoImage,
} from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo 6 dígitos'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/users', data)

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode acessar o Meu IOT',
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro na autenticação',
          'Não foi possivel fazer o login, Verifique seu email/senha',
        )
      }
    },
    [navigation],
  )

  return (
    <>
      <Background>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <LogoImage source={logoImg} />
              <View>
                <Title>Crie a sua conta</Title>
              </View>

              <Form
                ref={formRef}
                onSubmit={handleSignUp}
                style={{ width: '100%' }}
              >
                <Input
                  autoCapitalize="words"
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus()
                  }}
                />

                <Input
                  ref={emailInputRef}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  name="email"
                  icon="mail"
                  placeholder="Email"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                  }}
                />

                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  textContentType="newPassword"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm()
                  }}
                />
                <Button
                  onPress={() => {
                    formRef.current?.submitForm()
                  }}
                >
                  Entrar
                </Button>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>

        <BackToSignIn onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#159957" />
          <BackToSignInText>Voltar para o logon</BackToSignInText>
        </BackToSignIn>
      </Background>
    </>
  )
}

export default SignUp

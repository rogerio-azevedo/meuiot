import React, { useCallback, useRef } from 'react'
import * as RN from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationErrors'

import Background from '../../components/Background'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

import * as Styles from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<RN.TextInput>(null)
  const navigation = useNavigation()

  const { signIn, user } = useAuth()

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)

          return
        }

        RN.Alert.alert(
          'Erro na autenticação',
          'Não foi possivel fazer o login, Verifique seu email/senha',
        )
      }
    },
    [signIn],
  )

  return (
    <>
      <Background>
        <RN.KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={RN.Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <RN.ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Styles.Container>
              <Styles.LogoContainer>
                <Styles.LogoImage source={logoImg} />
              </Styles.LogoContainer>

              <RN.View>
                <Styles.Title>Faça seu Logon</Styles.Title>
              </RN.View>

              <Form
                ref={formRef}
                onSubmit={handleSignIn}
                style={{ width: '100%' }}
              >
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
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
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  secureTextEntry
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

              <Styles.ForgotPassword
                onPress={() => {
                  console.log('forgot')
                }}
              >
                <Styles.ForgotPasswordText>
                  Esqueci minha senha
                </Styles.ForgotPasswordText>
              </Styles.ForgotPassword>
            </Styles.Container>
          </RN.ScrollView>
        </RN.KeyboardAvoidingView>

        <Styles.CreateAccountButton
          onPress={() => navigation.navigate('SignUp')}
        >
          <Icon name="log-in" size={20} color="#159957" />
          <Styles.CreateAccountButtonText>
            Criar uma conta
          </Styles.CreateAccountButtonText>
        </Styles.CreateAccountButton>
      </Background>
    </>
  )
}

export default SignIn

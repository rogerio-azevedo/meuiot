import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { Dimensions } from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../services/api'

import Background from '../../components/Background'
import * as Styles from './styles'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

type ItemCamera = { url: string }

type SwitchState = {
  cliente: number
  type: string
  device: number
  state: boolean
}

type ColorProps = {
  id: number
  color: string
}

const MyPannel: React.FC = () => {
  const navigation = useNavigation()

  const [entries, setEntries] = useState<ItemCamera[]>([])
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [temperature, setTemperature] = useState<number>(0)
  const [weather, setWeather] = useState<string>('')
  const [city, setCity] = useState<string>('')

  const [devices, setDevices] = useState([])
  const [swhState, setSwtState] = useState<SwitchState>({} as SwitchState)
  const [bcolor, setBcolor] = useState<ColorProps>({ id: 0, color: '#aaa' })

  useEffect(() => {
    const itens = [
      {
        url:
          'rtsp://monitor:!M0n1t0r@peantonio.ddns.net:8081/cam/realmonitor?channel=1&subtype=0',
      },
      {
        url:
          'rtsp://monitor:!M0n1t0r@peantonio.ddns.net:8082/cam/realmonitor?channel=1&subtype=0',
      },
      {
        url:
          'rtsp://monitor:!M0n1t0r@peantonio.ddns.net:8083/cam/realmonitor?channel=1&subtype=0',
      },
    ]

    setEntries(itens)

    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=Cuiaba&units=metric&lang=pt_br&appid=71d4c83f961e0eb2906183eea1ee6a04',
      )
      .then(response => {
        setTemperature(response.data?.main?.temp)
        setWeather(response.data?.weather[0]?.description)
        setCity(response.data?.name)
      })
  }, [])

  useEffect(() => {
    api
      .get('painel', {
        params: {
          cliente: 2,
          typ: swhState.type,
          dev: swhState.device,
          ste: swhState.state,
        },
      })
      .then(response => {
        setDevices(response.data?.devices)
      })
  }, [swhState])

  const renderItem = ({ item, index }: any): any => {
    return (
      <Styles.CameraContainer>
        <Styles.PlayerContainer
          source={{
            initType: 2,
            hwDecoderEnabled: 1,
            hwDecoderForced: 1,
            uri: item.url,
            initOptions: [
              '--no-audio',
              '--rtsp-tcp',
              '--network-caching=150',
              '--rtsp-caching=150',
              '--no-stats',
              '--tcp-caching=150',
              '--realrtsp-caching=150',
            ],
          }}
          autoplay
          autoAspectRatio
          resizeMode="cover"
          isLive
          autoReloadLive
        />
      </Styles.CameraContainer>
    )
  }

  const handleSwitch = clicked => {
    if (clicked.type === 'mom' && !clicked.state === true) {
      setBcolor({ id: clicked.id, color: '#159957' })
      setTimeout(() => {
        setBcolor({ id: clicked.id, color: '#aaa' })
      }, 600)
    }

    const swtc = {
      device: clicked.id,
      type: clicked.type,
      state: clicked.type === 'mom' ? true : !clicked.state,
    }

    setSwtState(swtc)
  }

  const resolveColor = (item): any => {
    if (item.type === 'mom' && item.id === bcolor.id) {
      return bcolor.color
    }
    if (item.type === 'ret' && item.state) {
      return '#34ac0d'
    }
    return '#aaa'
  }

  const resolveIcon = (item): any => {
    if (item.type === 'mom' && item.id === bcolor.id) {
      return bcolor.color
    }
    if (item.type === 'ret' && item.state) {
      return '#34ac0d'
    }
    return '#aaa'
  }

  return (
    <Background>
      <Styles.Container>
        <Styles.HeaderContainer>
          <Styles.MenuContainer>
            <IconMaterial name="text-short" size={35} color="#fff" />
          </Styles.MenuContainer>
          <Styles.AvatarContainer
            onPress={() => navigation.navigate('Profile')}
          >
            <IconMaterial name="account-circle" size={30} color="#155799" />
          </Styles.AvatarContainer>
        </Styles.HeaderContainer>

        <Styles.WelcomeText>Olá, Rogério Azevedo</Styles.WelcomeText>
        <Styles.TermometerText>{`Em ${city}: ${temperature}°C - ${weather}`}</Styles.TermometerText>

        <Carousel
          // ref={c => {
          //   _carousel = c
          // }}
          data={entries}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          layout="default"
          onSnapToItem={index => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            // backgroundColor: 'rgba(255, 255, 255, 0.3)',
            paddingVertical: 10,
            width: screenWidth,
          }}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 50,
            marginHorizontal: 3,
            backgroundColor: '#fff',
          }}
          inactiveDotStyle={{
            backgroundColor: '#fff',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <Styles.DeviceContainer>
          {devices.map(item => (
            <Styles.DeviceItem
              key={item.id}
              onPress={() => {
                handleSwitch(item)
              }}
            >
              <Styles.StatusContainer>
                <IconMaterial
                  name="circle"
                  size={18}
                  color={resolveColor(item)}
                />
              </Styles.StatusContainer>
              <IconMaterial
                name={item.type === 'mom' ? 'car-key' : 'bulbs-outline'}
                size={40}
                color="#155799"
                style={{ marginTop: 15 }}
              />
              <Styles.TabText>{item.name}</Styles.TabText>
            </Styles.DeviceItem>
          ))}
        </Styles.DeviceContainer>
      </Styles.Container>
    </Background>
  )
}

export default MyPannel

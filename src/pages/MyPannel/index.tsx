import React from 'react'
import { VLCPlayer } from 'react-native-vlc-media-player'

import { Button } from 'react-native'

import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

const MyPannel: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <VLCPlayer
        source={{
          initType: 2,
          hwDecoderEnabled: 1,
          hwDecoderForced: 1,
          uri:
            'rtsp://admin:8R0geri0@peantonio.ddns.net:8081/cam/realmonitor?channel=1&subtype=0',
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
        style={{ height: 400, marginTop: 30 }}
      />
      <Button title="Sair" onPress={signOut} />
    </Container>
  )
}

export default MyPannel

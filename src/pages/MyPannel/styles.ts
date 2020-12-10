import styled, { css } from 'styled-components/native'
import { VLCPlayer } from 'react-native-vlc-media-player'
import { ViewProps, Image, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

interface PageProps extends ViewProps {
  active: number
}

export const Container = styled.SafeAreaView``

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const AvatarContainer = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 70px;
  padding: 3px;
  margin-top: 20px;
  margin-right: 20px;
`

export const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
`

export const MenuContainer = styled.View`
  margin-top: 20px;
  margin-left: 20px;
`

export const WelcomeText = styled.Text`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  font-family: 'RobotoSlab-Medium';
`

export const TermometerText = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  color: #ccc;
  font-weight: 500;
`

export const DeviceContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 5,
    paddingRight: 10,
  },
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
`

export const DeviceItem = styled(RectButton)`
  width: 118px;
  height: 140px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  margin-left: 10px;
  padding: 5px;
  align-items: center;
`

export const StatusContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`

export const TabText = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  color: #333;
  text-align: center;
`

export const CameraContainer = styled.View`
  border-radius: 4px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 240px;
  padding: 8px;
`

export const PlayerContainer = styled(VLCPlayer)`
  flex: 1;
`

export const DevicesContainer = styled.View`
  width: 100%;
  height: 20px;
`

export const Pages = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`

export const Page = styled.View<PageProps>`
  width: 15px;
  height: 15px;
  margin: 5px;
  border-radius: 50px;
  background: #eee;

  ${props =>
    props.active === 1 &&
    css`
      background-color: #000;
    `}
`

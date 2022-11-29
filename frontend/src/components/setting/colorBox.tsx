import styled from "styled-components"

type SettingColorBoxProps = {
  DeviceColorPallets: string[]
  deviceColorState: string
  ButtonColorPallets: string[]
  buttonColorState: string
  changeDeviceColor: (color: string) => void
  changeButtonColor: (color: string) => void
}

const SettingColorBox = ({
  DeviceColorPallets,
  deviceColorState,
  ButtonColorPallets,
  buttonColorState,
  changeDeviceColor,
  changeButtonColor,
}: SettingColorBoxProps) => {
  return (
    <SettingColorContainer>
      <SettingTitle>기기테마</SettingTitle>
      <ThemaColor>
        {DeviceColorPallets.map((color, i) =>
          deviceColorState === color ? (
            <SelectedColorPallet bgColor={color} key={i}></SelectedColorPallet>
          ) : (
            <ColorPallet
              bgColor={color}
              key={i}
              onClick={() => changeDeviceColor(color)}
            ></ColorPallet>
          )
        )}
      </ThemaColor>
      <SettingTitle>버튼테마</SettingTitle>
      <ThemaColor>
        {ButtonColorPallets.map((color, i) =>
          buttonColorState === color ? (
            <SelectedColorPallet bgColor={color} key={i}></SelectedColorPallet>
          ) : (
            <ColorPallet
              key={i}
              bgColor={color}
              onClick={() => {
                changeButtonColor(color)
              }}
            ></ColorPallet>
          )
        )}
      </ThemaColor>
    </SettingColorContainer>
  )
}

export default SettingColorBox

const SettingColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

const SettingTitle = styled.div`
  height: 20px;
  font-size: 14px;
  margin-left: 1rem;
`
const ThemaColor = styled.div`
  width: 100%;
  height: 25px;
  font-size: 14px;
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
`
interface ColorProps {
  bgColor: string
}
const ColorPallet = styled.div<ColorProps>`
  background: ${(props) => props.bgColor};
  width: 14px;
  height: 14px;
  border: 1px solid black;
  margin-right: 8px;
  box-sizing: border-box;
`
const SelectedColorPallet = styled.div<ColorProps>`
  background: ${(props) => props.bgColor};
  width: 14px;
  height: 14px;
  border: 3px solid tomato;
  margin-right: 8px;
  box-sizing: border-box;
`

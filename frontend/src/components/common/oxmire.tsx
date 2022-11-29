import styled from "styled-components"
const { ipcRenderer } = window.require("electron")

const Oxmire = () => {
  const hideWindow = () => {
    ipcRenderer.send("HIDE_WINDOW", "hide")
  }

  const minimizeWindow = () => {
    ipcRenderer.send("MINIMIZE_WINDOW", "minimize")
  }

  return (
    <Oxframe>
      <Circle></Circle>
      <Rectangle></Rectangle>
      <MiniBtn className="link" onClick={minimizeWindow}></MiniBtn>
      <Minimize></Minimize>
      <Hide className="link" onClick={hideWindow}></Hide>
      <X1></X1>
      <X2></X2>
    </Oxframe>
  )
}
export default Oxmire
const Oxframe = styled.div`
  // pointer-events: none;
`

const Rectangle = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: 56px;
  right: 360px;
  background: #363636;
`

const MiniBtn = styled.button`
  width: 30px;
  height: 20px;
  position: absolute;
  bottom: 272px;
  right: 356px;
  z-index: 999;
  opacity: 0;
  cursor: pointer;
`

const Minimize = styled.div`
  width: 16px;
  height: 6px;
  position: absolute;
  bottom: 280px;
  right: 363px;
  background: #363636;
`

const Hide = styled.button`
  position: absolute;
  bottom: 272px;
  right: 21px;
  width: 30px;
  height: 20px;
  z-index: 999;
  opacity: 0;
  cursor: pointer;
`

const X1 = styled.div`
  width: 5px;
  height: 20px;
  transform: rotate(-45deg);
  position: absolute;
  bottom: 272px;
  right: 34px;
  background: #363636;
`
const X2 = styled.div`
  width: 5px;
  height: 20px;
  transform: rotate(45deg);
  position: absolute;
  bottom: 272px;
  right: 34px;
  background: #363636;
`
const Circle = styled.div`
  border-radius: 90px;
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: 56px;
  right: 30px;
  background: #363636;
`

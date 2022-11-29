import styled from "styled-components"
import { Link } from "react-router-dom"
import { menuOnoffState } from "store/device"
import { useRecoilState } from "recoil"
import { CommonNav } from "components/common"

const MenuPage = () => {
  type Menu = {
    [key: string]: string
  }
  const menus: Menu[] = [
    {
      title: "상태",
      icon: "images/menu/status.png",
      color: "#C3F6C0",
      link: "/status",
    },
    {
      title: "상점",
      icon: "images/menu/shop.png",
      color: "#FFAAAA",
      link: "/shop",
    },
    {
      title: "랭킹",
      icon: "images/menu/ranking.png",
      color: "#FFE8A5",
      link: "/ranking",
    },
    {
      title: "인벤토리",
      icon: "images/menu/inventory.png",
      color: "#A1C5FF",
      link: "/inventory",
    },
    {
      title: "MOTI",
      icon: "images/moti/tray_test.ico",
      color: "white",
      link: "/",
    },
    {
      title: "사료바꾸기",
      icon: "images/menu/repo.png",
      color: "#FFF2CC",
      link: "/repoEdit",
    },
    {
      title: "명예의전당",
      icon: "images/menu/grave.png",
      color: "#f7cb6a",
      link: "/graves",
    },
    {
      title: "환경설정",
      icon: "images/menu/settings.png",
      color: "#e1e3e1",
      link: "/setting",
    },
    // {
    //   title: "Github",
    //   icon: "images/git/github.png",
    //   color: "white",
    //   link: "/github",
    // },
    // {
    //   title: "BOJ",
    //   icon: "images/menu/boj.png",
    //   color: "#93ECFF",
    //   link: "/boj",
    // },
  ]

  const [toHome, setToHome] = useRecoilState(menuOnoffState)

  return (
    <Background>
      <CommonNav bgColor="#a1c5ff" pageTitle="메뉴" linkPage="/" />
      <Menus>
        {menus.map((menu, i) =>
          menu["link"] === "/" ? (
            <Link
              key={i}
              className="link"
              to={menu["link"]}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Menu onClick={() => setToHome(!toHome)} color={menu["color"]}>
                <MenuIcon src={menu["icon"]} alt="menu" />
                <MenuName>{menu["title"]}</MenuName>
              </Menu>
            </Link>
          ) : (
            <Link
              key={i}
              className="link"
              to={menu["link"]}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Menu color={menu["color"]}>
                <MenuIcon src={menu["icon"]} alt="menu" />
                <MenuName>{menu["title"]}</MenuName>
              </Menu>
            </Link>
          )
        )}
      </Menus>
    </Background>
  )
}

export default MenuPage

export const Background = styled.div`
  height: 100%;
  width: 100%;
  background: #e3eeff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Menus = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
`

const Menu = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  // background: linear-gradient(130deg, white, ${(props) => props.color});
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 52px;
  // width: 54px;
  width: 56px;
  border-radius: 8px;
  margin: 4px;
  // border: 1px solid ${(props) => props.color};
  box-shadow: 1px 3px 4px gray;
`
const MenuIcon = styled.img`
  height: 28px;
  width: 28px;
  // background: gray;
`

const MenuName = styled.div`
  margin: 0;
  font-size: 10.5px;
`

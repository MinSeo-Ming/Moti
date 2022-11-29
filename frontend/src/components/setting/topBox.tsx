import styled from "styled-components"

type SettingTopBoxProps = {
  userName: string
  setLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setWithdrawalModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingTopBox = ({
  userName,
  setLogoutModalOpen,
  setWithdrawalModalOpen,
}: SettingTopBoxProps) => {
  return (
    <TopBoxContainer>
      <VersionContainer>
        <UserName>ID : {userName}</UserName>
        <VersionTitle>버전정보</VersionTitle>
        <VersionContent>{process.env.REACT_APP_VERSION} ver</VersionContent>
      </VersionContainer>
      <LogoutContainer>
        <LogoutBtn
          onClick={() => {
            setLogoutModalOpen(true)
          }}
        >
          로그아웃
        </LogoutBtn>
        <WithdrawalBtn
          onClick={() => {
            setWithdrawalModalOpen(true)
          }}
        >
          회원탈퇴
        </WithdrawalBtn>
      </LogoutContainer>
    </TopBoxContainer>
  )
}

export default SettingTopBox

const TopBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0 0 15px;
  height: 40%;
`

const VersionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const UserName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
`

const VersionTitle = styled.div`
  margin-top: 13px;
  height: 20px;
  font-size: 14px;
`
const VersionContent = styled.div`
  width: 40%;
  height: 40px;
  font-size: 14px;
  margin-left: 2rem;
  white-space: nowrap;
`

const LogoutContainer = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LogoutBtn = styled.div`
  background: #ed6f6d;
  width: 70px;
  height: 18px;
  border: solid 1px black;
  border-radius: 3px;
  color: white;
  margin: 3px;
  padding: 6px;
  fontsize: 20px;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 5px inset;
    top: -2px;
  }
`

const WithdrawalBtn = styled.div`
  background: #999999;
  width: 70px;
  height: 18px;
  border: solid 1px black;
  border-radius: 3px;
  color: white;
  margin: 3px;
  padding: 6px;
  fontsize: 20px;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 5px inset;
    top: -2px;
  }
`

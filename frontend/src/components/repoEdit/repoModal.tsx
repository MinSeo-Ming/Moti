import styled, { keyframes } from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios"
import { NavigateFunction } from "react-router"

type gitItem = {
  name: string
  clicked: boolean
}

type RepoModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRepoAlertModalMessage: React.Dispatch<React.SetStateAction<string>>
  setRepoFiveAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RepoModal = ({
  setModalOpen,
  setRepoAlertModalMessage,
  setRepoFiveAlertModalOpen,
}: RepoModalProps) => {
  const [myRepos, setMyRepos] = useState<gitItem[]>([]) //왼쪽
  const [alRepo, setAlRepo] = useState<gitItem[]>([]) //전체
  const [motiFeed, setMotiFeed] = useState<gitItem[]>([]) //오른쪽
  const [AddchoiceSet, setAddChoiceSet] = useState<Set<string>>(new Set()) //더하기 임시
  const AddEvnt = () => {
    if (AddchoiceSet.size + motiFeed.length > 5) {
      setRepoAlertModalMessage("레포지토리 최대 개수는 5개입니다.")
      setRepoFiveAlertModalOpen(true)
      return
    } else {
      let temp: gitItem[] = [...motiFeed]
      let temp2: gitItem[] = []
      AddchoiceSet.forEach((item) => {
        temp.push({ name: item, clicked: false })
      })
      setAddChoiceSet(new Set())
      setMotiFeed(temp)
      for (let i = 0; i < myRepos.length; i++) {
        if (myRepos[i].clicked === false) {
          temp2.push({ name: myRepos[i].name, clicked: false })
        }
      }
      setMyRepos(temp2)
    }
  }
  const DelEvnt = () => {
    let temp: gitItem[] = []
    let temp2: gitItem[] = []
    for (let i = 0; i < motiFeed.length; i++) {
      if (motiFeed[i].clicked === false) {
        temp.push({ name: motiFeed[i].name, clicked: false })
      } else {
        temp2.push({ name: motiFeed[i].name, clicked: false })
      }
    }
    setMotiFeed(temp)
    setMyRepos([...myRepos, ...temp2])
  }

  useEffect(() => {
    let tempArr: gitItem[] = []
    axios
      .get("https://api.github.com/user/repos", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + window.localStorage.getItem("GitToken"),
        },
      })
      .then((res) => {
        res.data.map((item: any) => tempArr.push({ name: item.name, clicked: false }))
      })
      .then(() => {
        setAlRepo(tempArr)
      })
  }, [])
  useEffect(() => {
    axios
      .get("http://k7a704.p.ssafy.io:8080/api/v1/user/my-repositories", {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
        },
      })
      .then((res) => {
        let tempArr: gitItem[] = [] //왼쪽
        let tempSelArr: gitItem[] = [] //오른쪽
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            tempSelArr.push({ name: res.data[i], clicked: false })
          }
          for (let j = 0; j < alRepo.length; j++) {
            for (let i = 0; i < res.data.length; i++) {
              if (alRepo[j].name === res.data[i]) {
                break
              }
              if (i === res.data.length - 1) {
                tempArr.push({ name: alRepo[j].name, clicked: false })
                break
              }
            }
          }
          setMyRepos(tempArr)
          setMotiFeed(tempSelArr)
        } else setMyRepos(alRepo)
        console.log(alRepo)
        console.log(res.data)
      })
  }, [alRepo])
  const DoneEvnt = () => {
    //완료버튼
    if (motiFeed.length === 0) {
      setRepoAlertModalMessage("밥그릇 레포 1개이상 등록해주세요.")
      setRepoFiveAlertModalOpen(true)
      return 0
    } else {
      let temp: string[] = []
      for (let i = 0; i < motiFeed.length; i++) {
        temp.push(motiFeed[i].name)
      }
      axios
        .put(
          //먹이레포지정 axios
          "http://k7a704.p.ssafy.io:8080/api/v1/user/my-repositories",
          {
            repos: temp,
          },
          {
            headers: {
              Authorization: "Bearer " + window.sessionStorage.getItem("MotiToken"),
            },
          }
        )
        .then((res) => {
          console.log("정상처리")
          setModalOpen(false)
        })
    }
  }

  return (
    <Modal>
      <Head>
        <Button onClick={() => setModalOpen(false)}>
          <ButtonImg src="images/shop/close.png" alt="" />
        </Button>
      </Head>
      <Body>
        <RepoBody>
          <Repo>
            <RepoLabel>내 레포지토리</RepoLabel>
            <RepoDiv>
              {myRepos.map((item, i) => (
                <RepoList
                  key={i}
                  bgColor={item.clicked ? "#0000c0" : "white"}
                  onClick={(e) => {
                    let copieRepo = [...myRepos]
                    setMyRepos(copieRepo)
                    if (copieRepo[i].clicked) {
                      AddchoiceSet.delete(item.name)
                    } else {
                      AddchoiceSet.add(item.name)
                    }
                    copieRepo[i].clicked = !copieRepo[i].clicked
                  }}
                >
                  {item.name.length > 12 ? (
                    <RepoName clicked={item.clicked}>{item.name}</RepoName>
                  ) : (
                    <RepoShortName clicked={item.clicked}>{item.name}</RepoShortName>
                  )}
                </RepoList>
              ))}
            </RepoDiv>
          </Repo>
          <ButtonDiv>
            <Arrow>→</Arrow>
            <AddButton onClick={AddEvnt}>ADD</AddButton>
            <Arrow>←</Arrow>
            <DelButton onClick={DelEvnt}>DEL</DelButton>
          </ButtonDiv>
          <Repo>
            <RepoLabel>모티 사료</RepoLabel>
            <RepoDiv>
              {motiFeed.map((item, i) => (
                <RepoList
                  key={i}
                  bgColor={item.clicked ? "#0000c0" : "white"}
                  onClick={(e) => {
                    let copieRepo = [...motiFeed]
                    copieRepo[i].clicked = !copieRepo[i].clicked
                    setMotiFeed(copieRepo)
                  }}
                >
                  {item.name.length > 12 ? (
                    <RepoName clicked={item.clicked}>{item.name}</RepoName>
                  ) : (
                    <RepoShortName clicked={item.clicked}>{item.name}</RepoShortName>
                  )}
                </RepoList>
              ))}
            </RepoDiv>
          </Repo>
        </RepoBody>
        <OkButton onClick={DoneEvnt}>
          <OkButtonImg src="images/repo/done2.png" alt="" />
        </OkButton>
      </Body>
    </Modal>
  )
}
interface BgProps {
  bgColor: string
}

interface StyleProps {
  clicked: boolean
}

const textSliding = keyframes`
0% {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
100% {
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
`

const Modal = styled.div`
  width: 300px;
  height: 250px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 37%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: white;
  border: 3px solid black;
  // border-radius: 8px;
`

const Head = styled.div`
  width: 98%;
  height: 10%;
  margin: 2px auto 7px auto;
  display: flex;
  justify-content: end;
  align-items: center;
  background: #0000c0;
`

const Button = styled.button`
  // width: 20%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  &: hover {
    color: grey;
  }
  cursor: pointer;
  margin: auto 0 auto 0;
`

const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`

const RepoLabel = styled.div`
  // font-size: 17px;
  margin-bottom: 3px;
  // height: 100%;
  text-align: center;
`

const Body = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`

const RepoBody = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: start;
`

const Repo = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const RepoDiv = styled.div`
  width: 100%;
  height: 100%;
  border: solid 3px;
  align-text: center;
  overflow: auto;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`

const RepoList = styled.div<BgProps>`
  width: 100%;
  height: 17%;
  background-color: ${(props) => props.bgColor};
  font-size: 17px;
  border-bottom: solid 2px black;
  display: flex;
  align-items: center;
  overflow: hidden;
  animation-play-state: paused;
  &:hover {
    background: #0000c0;
  }
  &:hover div {
    color: white;
`

const RepoName = styled.div<StyleProps>`
  flex: 0 0 auto;
  white-space: nowrap;
  margin-left: 4px;
  color: ${(props) => (!props.clicked ? "black" : "white")};
  &:hover {
    animation: ${textSliding} 4s linear infinite;
    transition: 0.1s;
    color: white;
  }
`

const RepoShortName = styled.div<StyleProps>`
  flex: 0 0 auto;
  white-space: nowrap;
  margin-left: 4px;
  color: ${(props) => (!props.clicked ? "black" : "white")};
  &:hover {
    color: white;
  }
`

const ButtonDiv = styled.div`
  width: 15%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Arrow = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: -3px;
  margin-top: 4px;
`

const AddButton = styled.button`
  width: 70%;
  height: 15%;
  background: #34a853;
  border-radius: 5px;
  border: none;
  margin-bottom: 5%;
  text-align: center;
  &: hover {
    opacity: 80%;
  }
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 3px;
`

const DelButton = styled.button`
  width: 70%;
  height: 15%;
  background: #ea4335;
  border-radius: 5px;
  border: none;
  &: hover {
    opacity: 80%;
  }
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 3px;
`

const OkButton = styled.button`
  width: 20%;
  height: 10%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: none;
  margin-top: 10px;
  margin-right: 5%;
  &:hover {
    opacity: 80%;
  }
`

const OkButtonImg = styled.img`
  width: 70px;
  height: 30px;
`

export default RepoModal

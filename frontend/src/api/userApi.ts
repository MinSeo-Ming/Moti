import axios from "axios"

export let request = axios.prototype

export const userAPI = {
  //
  //Get Git Server Access Token
  getGitToken: async (deviceID: string) => {
    const GitTokenURL = `https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_CLIENT_ID}&device_code=${deviceID}&grant_type=urn:ietf:params:oauth:grant-type:device_code`
    return await axios
      .post(GitTokenURL, null, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(async (response) => {
        const git_access_token = response.data.access_token
        await window.localStorage.setItem("GitToken", git_access_token)
        return git_access_token
      })
      .catch((error) => {
        console.log(error)
      })
  },
  //
  //Get Moti Server Access Token with Git Access Token
  getMotiToken: async (gitAccessToken: string | null) => {
    const MotiTokenURL = `http://k7a704.p.ssafy.io:8080/api/v1/auth/github`
    const data = {
      accessToken: gitAccessToken,
    }
    return await axios
      .post(MotiTokenURL, data, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        const moti_access_token = response.data.accessToken
        window.sessionStorage.setItem("MotiToken", moti_access_token)
        request = axios.create({
          baseURL: "http://k7a704.p.ssafy.io:8080/api/v1",
          headers: {
            Authorization: "Bearer " + response.data.accessToken,
          },
        })
        return response.status
      })
      .catch((error) => {
        console.log(error)
        return error.response.status
      })
  },
  //
  //회원 탈퇴
  deleteMotiUser: async () => {
    return await request.delete(`/user`)
  },
  //
  //사용자 설정 git repo 조회
  getMotiRepoList: async () => {
    return await request.get(`/user/my-repositories`)
  },
  //
  //사용자 설정 git repo 수정/생성
  modifyMotiRepoList: async (repos: string[]) => {
    return await request.put(`/user/my-repositories`, { repos })
  },
  //
  // 사용자 기기, 버튼 색상 조회
  getUserColor: async () => {
    return await request.get(`/user/color`)
  },
  //
  // 사용자 기기 버튼 색상 정보 수정
  modifyUserColor: async (data: DeviceColorType) => {
    return await request.put(`/user/color`, data)
  },
  //
  // 사용자 ID 조회
  getUserID: async () => {
    return await request.get(`/user/my-account`)
  },
}

type DeviceColorType = {
  deviceColor: string
  buttonColor: string
}

import { request } from "./userApi"

export const motiAPI = {
  //
  //랭킹
  getRanking: async () => {
    return await request.get(`/moti/ranking`)
  },
  //
  //모티 전체 정보
  getMoti: async () => {
    return await request.get(`/moti`)
  },
  //
  //모티 생성
  createMoti: async (moti_name: string) => {
    return await request
      .post(`/moti`, { moti_name })
      .then((res: ResponseType) => {
        console.log(res)
      })
  },
  //
  //모티 정보 화면 조회
  getMotiInfo: async () => {
    return await request.get(`/moti/info`)
  },
  //
  //모티 이미지 조회
  getMotiImage: async () => {
    return await request.get(`/moti/image`)
  },
  //
  //모티 씻기기, 놀아주기
  addMotiAction: async () => {
    return await request.post(`/moti/closeness`).then((res: ResponseType) => {
      console.log(res)
    })
  },
  //
  //모티 밥주기
  addMotiBobEvent: async () => {
    return await request.post(`/moti/food`).then((res: ResponseType) => {
      console.log(res)
    })
  },
  //
  //죽은 모티 목록 조회
  getDeadMotiList: async () => {
    return await request.get(`/moti/graves`)
  },
  //
  //오늘 밥 줬는 지 확인
  getWhetherFed: async () => {
    return await request.get(`/moti/fed-today`)
  },
  //
  //사용자 계정 정보 조회
  getUserInfo: async () => {
    return await request
      .post(`/moti/user/my-account`)
      .then((res: ResponseType) => {
        console.log(res)
      })
  },
}

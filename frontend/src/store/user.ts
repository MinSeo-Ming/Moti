import { atom } from "recoil"

export const coinState = atom({
  key: "coinState",
  default: 0,
})

export const motiTokenState = atom({
  key: "motiTokenState",
  default: "",
})

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
})

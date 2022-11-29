import { atom } from "recoil"
export const deviceColor = atom({
  key: "deviceColor", // unique ID (with respect to other atoms/selectors)
  default: "#5A6078", // default value (aka initial value)
})
export const menuOnoffState = atom({
  key: "menuOnoffState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
export const buttonColor = atom({
  key: "buttonColor", // unique ID (with respect to other atoms/selectors)
  default: "#FBBC05", // default value (aka initial value)
})
export const ishomeState = atom({
  key: "isHomeState",
  default: false,
})

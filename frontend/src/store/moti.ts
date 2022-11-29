import { atom } from "recoil"
export const motiState = atom({
  key: "motiState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
})
export const motiimgState = atom({
  key: "motiimgState", // unique ID (with respect to other atoms/selectors)
  default: {
    default: "",
    shower: "",
    hungry: "",
    playing: "",
    eatting: "",
  }, // default value (aka initial value)
})
export const motiLastFeedState = atom({
  key: "motiLastFeedState",
  default: new Date("2000-01-01"),
})
export const motiExistState = atom({
  key: "motiExistState",
  default: false,
})

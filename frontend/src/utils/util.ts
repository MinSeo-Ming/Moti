export const utilAPI = {
  //
  //랭킹
  getToday: () => {
    var date = new Date()
    var year = date.getFullYear()
    var month = ("0" + (1 + date.getMonth())).slice(-2)
    var day = ("0" + date.getDate()).slice(-2)
    let a = year + month + day
    return Number(a)
  },
}

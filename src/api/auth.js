// 将请求回来的token进行本地存储
// 方便以后减少代码量
// USER_KEY 有短横线_必须都是大写
const USER_KEY = 'token'
// 1.设置值token
export const setUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}
// 2.取出值token
export const getUser = () => {
  JSON.parse(window.localStorage.getItem(USER_KEY))
}
// 3.移除值token
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}

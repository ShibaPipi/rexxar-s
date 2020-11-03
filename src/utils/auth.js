import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const NameKey = 'User-Name'
const AvatarKey = 'User-Avatar'
const IntroductionKey = 'User-Introduction'

const whiteList = ['home', 'index', 'login', '401', '404', 'posts', 'posts.show']

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function getIntroduction() {
  return Cookies.get(IntroductionKey)
}

export function setInfo(name, introduction) {
  Cookies.set(NameKey, name)
  Cookies.set(IntroductionKey, introduction)
}

export function removeInfo() {
  Cookies.remove(NameKey)
  Cookies.remove(IntroductionKey)
}

export function getAvatar() {
  return Cookies.get(AvatarKey)
}

export function setAvatar(avatar) {
  Cookies.set(AvatarKey, avatar)
}

export function removeAvatar() {
  Cookies.remove(AvatarKey)
}

export function needLogin(routeName) {
  return whiteList.indexOf(routeName) === -1
}

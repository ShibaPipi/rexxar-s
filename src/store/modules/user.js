import { login, logout } from '@/api/user'
import { getInfo } from '@/api/my'
import {
  getToken,
  setToken,
  removeToken,
  setInfo,
  getName,
  getAvatar,
  setAvatar,
  getIntroduction,
  removeInfo
} from '@/utils/auth'

const state = {
  token: getToken(),
  name: getName(),
  avatar: getAvatar(),
  introduction: getIntroduction(),
  loginFormVisible: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_LOGINFORMVISIBLE: (state, loginFormVisible) => {
    state.loginFormVisible = loginFormVisible
  }
}

const actions = {
  async login({ commit }, { name, password }) {
    const res = await login({ name: name.trim(), password })
    if (res.code === 200) {
      const { data: { token, user: { name, avatar_src, introduction }}} = res
      commit('SET_TOKEN', token)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar_src)
      commit('SET_INTRODUCTION', introduction)
      setToken(token)
      setInfo(name, introduction)
      setAvatar(avatar_src)
    }
    return res
  },

  async getInfo({ commit }) {
    const {
      data: {
        name, avatar_src, introduction
      }
    } = await getInfo()

    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar_src)
    commit('SET_INTRODUCTION', introduction)
    setInfo(name, introduction)
    setAvatar(avatar_src)
  },

  // user logout
  async logout({ commit }) {
    await logout()
    commit('SET_TOKEN', '')
    removeToken()
    removeInfo()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeInfo()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

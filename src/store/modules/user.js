import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  async login({ commit }, { name, password }) {
    const res = await login({ name: name.trim(), password })

    if (res.status === 'error') {
      return res
    }
    const { data: { token }} = res
    commit('SET_TOKEN', token)
    setToken(token)
  },

  async getInfo({ commit }) {
    const {
      data: {
        name, avatar, introduction
      }
    } = await getInfo()

    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
    commit('SET_INTRODUCTION', introduction)
  },

  // user logout
  async logout({ commit }) {
    await logout()
    commit('SET_TOKEN', '')
    removeToken()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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

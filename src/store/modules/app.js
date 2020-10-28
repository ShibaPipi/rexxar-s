import { getLanguage } from '@/lang'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(),
  spanLoading: false
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  TOGGLE_SPAN_LOADING: (state, spanLoading) => {
    state.spanLoading = spanLoading
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

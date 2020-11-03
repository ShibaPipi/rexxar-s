import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    store.commit('app/TOGGLE_SPAN_LOADING', true) // open SpanLoading
    // do something before request is sent
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    store.commit('app/TOGGLE_SPAN_LOADING', false) // close SpanLoading
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
/**
 * If you want to get http information such as headers or status
 * Please return  response => response
 * Determine the request status by custom code
 * Here is just an example
 * You can also judge the status by HTTP Status Code
 */
service.interceptors.response.use(
  response => {
    store.commit('app/TOGGLE_SPAN_LOADING', false) // close SpanLoading
    // Refresh token silently, no sense of continuation of login status.
    const token = response.headers.authorization
    if (token !== undefined) {
      store.commit('user/SET_TOKEN', token)
      setToken(token)
    }

    return response.data
  },
  error => {
    store.commit('app/TOGGLE_SPAN_LOADING', false) // close SpanLoading
    // Refresh token silently, no sense of continuation of login status.
    const token = error.response.headers.authorization
    if (token !== undefined) {
      store.commit('user/SET_TOKEN', token)
      setToken(token)
    }
    console.log(error.response.data)
    const { code, message } = error.response.data
    switch (code) {
      case 422:
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        break
      case 400:
        Message.error({
          message,
          duration: 3 * 1000
        })
        break
      default:
        break
    }
    return error.response.data
  }
)

export default service

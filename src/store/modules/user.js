import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  dislay_name: '',
  merchant_name: '',
  mobile_number: '',
  is_active: null,
  department_name: '',
  permissions: [],
  role: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DISPLAY_NAME: (state, display_name) => {
    state.display_name = display_name
  },
  SET_MERCHANT_NAME: (state, merchant_name) => {
    state.merchant_name = merchant_name
  },
  SET_MOBILE_NUMBER: (state, mobile_number) => {
    state.mobile_number = mobile_number
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_DEPARTMENT_NAME: (state, department_name) => {
    state.department_name = department_name
  },
  SET_IS_ACTIVE: (state, is_active) => {
    state.is_active = is_active
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile_number, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile_number: mobile_number, password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log('start getInfo')
      getInfo().then(response => {
        console.log('####### getInfo #######', response)
        commit('SET_ROLE', response.role)
        commit('SET_DISPLAY_NAME', response.dislay_name)
        commit('SET_MOBILE_NUMBER', response.mobile_number)
        commit('SET_MERCHANT_NAME', response.merchant_name)
        commit('SET_DEPARTMENT_NAME', response.department_name)
        commit('SET_PERMISSIONS', response.permissions)
        commit('SET_IS_ACTIVE', response.is_active)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    }).then(console.log('### get info log ###', this.state))
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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

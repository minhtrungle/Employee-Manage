import Vue from 'vue'

import Vuex from "vuex"

import router from '../router/routers'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        userProfile: {},
        isAuthenticated: false,

    },
    mutations: {
        setUserProfile(state, val, authState) {
            state.isAuthenticated = !state.isAuthenticated
            state.userProfile = val
        }

    },
    actions: {

    },
    modules: {

    }
})
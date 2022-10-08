import Vue from 'vue'

import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        userProfile: {},
        isAuthenticated: false,

    },
    mutations: {
        setUserProfile(state, val) {
            state.isAuthenticated = !state.isAuthenticated
            state.userProfile = val
        }

    },
    actions: {

    },
    modules: {

    }
})
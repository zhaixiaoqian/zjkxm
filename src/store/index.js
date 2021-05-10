import Vuex from 'vuex'
import Vue from 'vue'

// import app from './modules/app'
import user from './modules/user'
import tab from './modules/tab'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        // app,
        user,
        tab
    }
})
export default store;
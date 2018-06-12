import popup from './modules/popup'
import server from './modules/server'
// Vue.use(Vuex)
//import Vuex from 'vuex';

const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   modules: {
//     popup
//   },
//   strict: debug
// })

export default {
    modules: {
        popup,
        server
    },
    strict: debug
};
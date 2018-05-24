import popup from './modules/popup'

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
        popup
    },
    strict: debug
};
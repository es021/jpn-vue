
// initial state
// shape: [{ id, quantity }]

import { STORE_ADMIN, WASPUrl } from '../../config/app-config';

function updateStoreAuth(state) {
    localStorage.setItem(STORE_ADMIN, JSON.stringify(state));
}

function getStoreAdmin() {
    var state = {
        wasOnline: true,
        db2Online: true,
        pingInterval: 30000,
        pingTimeout: 2000,
        WASPUrl: WASPUrl,
        overrideOffline: false,
        overrideAuth: false,
    };
    try {
        var store = JSON.parse(localStorage.getItem(STORE_ADMIN));
        if (store == null || typeof store === "undefined") {
            updateStoreAuth(state);
            return state;
        } else {
            return store;
        }
    } catch (err) {
        console.log("getStoreAdmin", err);
        return state;
    }

    return state;
}

const state = getStoreAdmin();

// getters
const getters = {
    serverState: state => state,
    isAppOnline: (state) => () => {
        var log = "isAppOnline";
        var ret = state.wasOnline && state.db2Online;
        if (state.overrideOffline) {
            log += " | overrideOffline";
            ret = false;
        }

        log += " | " + ret;
        //console.log(log);
        return ret;
    }
    // isOpen: state => state.isOpen,
    // title: state => state.title,
    // content: state => state.content,

    //   cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //       const product = rootState.products.all.find(product => product.id === id)
    //       return {
    //         title: product.title,
    //         price: product.price,
    //         quantity
    //       }
    //     })
    //   },

    //   cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //       return total + product.price * product.quantity
    //     }, 0)
    //   }
}

// actions
const actions = {
    // openPopup({ commit, state }, { title, content }) {
    //     commit('openPopup', { title, content });
    // }
    // checkout({ commit, state }, products) {
    //     const savedCartItems = [...state.added]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },

    // addProductToCart({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.added.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('decrementProductInventory', { id: product.id })
    //     }
}


// mutations
const mutations = {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // },
    updateWasStatus(state, { online }) {
        state.wasOnline = online;
    },
    updateDb2Status(state, { online }) {
        state.db2Online = online;
    },
    // updateOverrideOffline(state, { status }) {
    //     state.overrideOffline = status;
    //     updateStoreAuth(state);
    // },
    // updateOverrideAuth(state, { status }) {
    //     state.overrideAuth = status;
    //     updateStoreAuth(state);
    // },
    updateOverrideServerState(state, { newState }) {
        for (var i in newState) {
            state[i] = newState[i];
        }
        updateStoreAuth(state);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
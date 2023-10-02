import Vue from "vue";
import Vuex from "vuex";

const ADDRESS_LIST = "addressList";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPendingGetAddresses: false,
    isPendingSetAddress: false,
    addressList: [],
  },

  mutations: {
    setAddresses(state, addresses) {
      state.addressList = addresses;
    },

    setStatusGetAddresses(state, status) {
      state.isPendingGetAddresses = status;
    },

    setStatusSetAddress(state, status) {
      state.isPendingSetAddress = status;
    },
  },

  actions: {
    getAddresses({ commit }) {
      commit("setStatusGetAddresses", true);

      setTimeout(() => {
        commit("setStatusGetAddresses", false);
        const data = JSON.parse(localStorage.getItem(ADDRESS_LIST)) || [];
        commit("setAddresses", data);
      }, 2000);
    },

    async setAddress({ commit, state }, { coords }) {
      commit("setStatusSetAddress", true);
      const address = await fetch(
        `https://geocode.maps.co/reverse?lat=${coords.lat}&lon=${coords.lng}`
      ).then((res) => res.json());

      if (address.error) {
        commit("setStatusSetAddress", false);
        alert(address.error);
      } else {
        const item = {
          id: state.addressList.length + 1,
          coords,
          address: address.display_name,
        };

        const newList = [...state.addressList, item];

        setTimeout(() => {
          commit("setStatusSetAddress", false);
          localStorage.setItem(ADDRESS_LIST, JSON.stringify(newList));
          commit("setAddresses", newList);
        }, 2000);
      }
    },
  },
});

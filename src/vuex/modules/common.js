const state = {
  modules: [],
  menus: [],
  dictionary: {},
  userName: null
}
const mutations = {
  setModules(state, modules) {
    state.modules = modules;
  },
  setMenus(state, menus) {
    state.menus = menus;
  },
  setUserName(state, userName) {
    state.userName = userName;
    localStorage.setItem("username", userName);
  },
  setDictionary(state, dictionary) {
    state.dictionary = dictionary;
  },
  clearMenus(state) {
    state.menus = [];
  },
  clearVuex(state) {
    state.modules = [];
    state.menus = [];
    state.userName = null;
    state.dictionary = null;
  },
}

const getters = {
  getModules: state => state.modules,
  getMenus: state => state.menus,
  getUserName: state => state.userName || localStorage.getItem('username'),
  getDictionary: state => state.dictionary
}

const actions = {

}

export default {
  state,
  mutations,
  getters,
  actions
}

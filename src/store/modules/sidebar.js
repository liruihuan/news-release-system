
const state = {
  sidebar: {
    opened: true,
  },
 
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
  
  },
  AUTO_SIDEBAR:(state,parameter)=>{
    state.sidebar.opened = parameter
  }

 
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  autoSideBar({commit},parameter){
    commit("AUTO_SIDEBAR",parameter)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

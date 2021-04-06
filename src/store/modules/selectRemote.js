import storage from 'store'
import {CommonRequestSelectData} from '@/api/SelectRemote'

const product = {
  name: "select-remote",
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    SET_LIST: (state, list) => {
      state.list = list
    },
  },
  actions: {
    SelectData({ commit },method,type,params=null){
      console.log("params",method,type,params);
      return new Promise((resolve, reject) => {
        CommonRequestSelectData(method,type,params).then(response=>{
          //保存数据
          commit('SET_LIST',response)
          resolve(response)
        }).catch(error=>{
          reject(error)
        });
      });
    },

  }
}

export default product



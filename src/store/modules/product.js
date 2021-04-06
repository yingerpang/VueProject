import storage from 'store'
import {getProductList,
        delProductByIds,
        productAdd,
        productUpdate,
        productDetail,
        productSupplier} from '@/api/product'

const product = {
  name: "product",
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
      PRODUCTLIST({ commit },params=null){
        return new Promise((resolve, reject) => {
          getProductList(params).then(response=>{
            //保存数据
            commit('SET_LIST',response)
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
        });
      },

      delProduct({ commit },params=null){
        return new Promise((resolve, reject) => {
          delProductByIds(params).then(response=>{
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
        });
      },

      addProduct({ commit },params=null){
        return new Promise((resolve, reject) => {
          productAdd(params).then(response=>{
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
      })
    },

      updateProduct({ commit },params=null){
        return new Promise((resolve, reject) => {
          productUpdate(params).then(response=>{
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
        })
      },

      detailProduct({ commit },params=null){
        return new Promise((resolve, reject) => {
          productDetail(params).then(response=>{
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
       })
      },
      supplierProduct({ commit },params=null){
        return new Promise((resolve, reject) => {
          productSupplier(params).then(response=>{
            resolve(response)
          }).catch(error=>{
            reject(error)
          });
        })
      },
  }
}

export default product



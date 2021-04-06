import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let modules={}

const requireAllModules = require.context("./", true, /\.js$/)


//获取modules下所有以.js结尾的文件  也可以使用  import 一个个引入
requireAllModules.keys().forEach(key => {
    let module = requireAllModules(key).default
  if (module && module.name && module.namespaced) {
        modules[module.name] = module
    }
})

//注册所有模块
export default new Vuex.Store({
    modules: modules,
    state: {

    },
    mutations: {

    },
    actions: {

    },
    strict: process.env.NODE_ENV !== "production"
})

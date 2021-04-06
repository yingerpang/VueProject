# vueproject

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

```
1、全局安装vue  npm install -g vue  |  cnpm install -g vue
2、安装@form-create/ant-design-vue、ant-design-vue  根据package.json安装依赖
3、main.js：项目入口文件，项目中所有的页面都会加载main.js,所以main.js的三个作用：
  3.1：实例化vue
  3.2：放置项目中经常会用到的插件和CSS样式
  3.3：
4、App.vue：根组件，模板就是组件App.vue中的template中的内容，所有页面都是在App.vue下进行切换的，可以理解为所有的路由也是App.vue的子组件
5、src/router：路由配置 ，所有通过地址栏能够访问的页面必须在router中进行注册
  {
    path: '/',  路由地址
    name: 'Home',路由名称
    component: () => import('../pages')  页面路径
  },
6、pages：组件，页面存放的位置
7、store：存储数据和管理数据，远程获取数据、存储数据，使用Vuex.Store
8、api：接口调用
9、assets：静态文件存放
10、components：公共组件
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

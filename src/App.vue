<template>
  <div id="app">
    <a-layout>
      <a-layout class="layout-content-box">
        <a-layout-content>
          <a-layout class="bread-header">
            <a-breadcrumb>
              <a-breadcrumb-item>标题1</a-breadcrumb-item>
              <a-breadcrumb-item><a href="">标题2</a></a-breadcrumb-item>
            </a-breadcrumb>
          </a-layout>
          <div class="layout-content">
            <a-config-provider :locale="locale">
              <router-view/>
            </a-config-provider>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
/*namespace:为true时，2种调用方式：
1、this.$store.dispatch('空间名/方法名',额外参数)
2、...mapActions('空间名',['方法名1','方法名2'])
为false时 这样调用 this.$store.dispatch('action名', this.$route)，所以此时action名不能重复
*/
import { mapActions } from 'vuex'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale:zhCN
    }
  },
  methods:{
    handleClick(){
      // this.$store.dispatch('user/LOGIN',{user:'111'})
    }
  },
  created() {
    // this.$store.dispatch('user/LOGIN')
    // this.$store.dispatch('user/TOPICLIST').then(res=>{
    //   console.log("res==》",res);
    // })
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
  display: flex;
  .layout-header{
    height: 48px;
  }
  .layout-content-box{
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    .bread-header{
      background: white;
      height: 50px;
      display: flex;
      padding: 10px;
      justify-content: center;
    }
    .layout-content{
      height: calc(~"100vh - 70px");
      background: white;
      overflow:hidden;
      overflow-y: auto;
      flex: 1;
    }
  }
}
</style>

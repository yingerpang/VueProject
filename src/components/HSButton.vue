<template>
     <a-button
       :key="uniqueKey"
       :type="type"
       :icon="icon"
       :disabled="disabled"
       :size="size"
       @click="click"
       :htmlType="htmlType"
       :loading="loading"
       :shape="shape"
       :ghost="ghost">
        {{name}}
     </a-button>
</template>

<script>
export default {
  name: 'buttons',
  props: {
    //attr:
    name:{
      type:String
    },
    uniqueKey: {
      type: String,
    },
    type: {
      type: String,
      default: null
    },
    disabled:{
      type: Boolean,
    },
    htmlType:{
      type:String
    },
    loading:{
      type: Boolean,
      default:false
    },
    shape:{
      type: String,
    },
    ghost:{
      type: Boolean,
      default:false
    },
    size:{
      type: String,
    },
    icon:{
      type:String
    },
    //event
    click:{
      type: Function,
    }
  },

  methods:{
    created(){
      console.log(this)
    }
  }
}
</script>
<style lang="less" scoped>
  .button{
    display: flex;
  }
</style>

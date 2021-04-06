<template>
  <div>
      <a-input-search
        :key="uniqueKey"
        :addonAfter="addonAfter"
        :addonBefore="addonBefore"
        :defaultValue="defaultValue"
        :disabled="disabled"
        :id="id"
        :maxLength="maxLength"
        :prefix="prefix"
        :size="size"
        :suffix="suffix"
        :type="type"
        :value="value"
        :allowClear="allowClear"
        :placeholder="placeholder"
        @change="change"
        @pressEnter="pressEnter"
        :v-decorator="decorator"
      />
  </div>
</template>

<script>
export default {
  name: 'inputsearch',
  props: {
    //attr:
    uniqueKey:{},
    decorator:{},
    addonAfter:{},
    addonBefore:{},
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder:{
      type:String
    },
    disabled:{
      type: Boolean,
      default:false
    },
    id:{
      type: String,
    },
    maxLength:{
      type:Number
    },
    prefix:{},
    suffix:{},
    htmlType:{
      type:String
    },
    size:{
      type: String,
    },
    shape:{
      type: String,
    },
    ghost:{
      type: Boolean,
      default:false
    },
    type:{
      type: String,
    },
    value:{
      type:String
    },
    allowClear:{
      type: Boolean,
    },
    icon:{
      type:String
    },
    //event
    change:{
      type: Function,
    },
    pressEnter:{
      type: Function,
    }
  },
  data() {
    return {

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

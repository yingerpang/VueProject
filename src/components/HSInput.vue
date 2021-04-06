<template>
      <a-input
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

        :allowClear="allowClear"
        :placeholder="placeholder"
        :v-decorator="decorator"

      />
</template>

<script>
export default {
  name: 'HSinput',
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
    change:{},
    pressEnter:{}
  },
  data() {
    return {

    }
  },
  methods:{
    created(){
    },
    handleChange(e){
      this.value=e.target.value
      this.change(e.target.value)
    }
  }
}
</script>
<style lang="less" scoped>
  .button{
    display: flex;
  }
</style>

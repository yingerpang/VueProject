<template>
    <a-rate
      :allowClear="radio.radioStyle"
      :allowHalf="radio.value"
      :autoFocus="radio.autoFocus"
      :character="radio.checked"
      :count="radio.defaultChecked"
      :defaultValue="blur"
      :disabled="focus"
      :tooltips="tooltips"
      :value="value"
      :blur="blur"
      :change="change"
      :focus="focus"
      :hoverChange="hoverChange"
      :keydown="keydown"
      :blur="blur"
      :focus="focus"/>
</template>

<script>
export default {
  name: 'hs-rate',
  props: {
    allowClear:{
      type:Boolean
    },
    allowHalf:{
      type:Boolean
    },
    autoFocus:{
      type:Boolean
    },
    character:{
    },
    count:{
      type:Number
    },
    defaultValue:{
      type:Number
    },
    disabled:{
      type:Boolean
    },
    tooltips:{},
    value:{type:Number},
    buttonStyle:{type:"String"},
  //  event
    change:{
      type:Function
    },

    hoverChange:{
      type:Function
    },
    keydown:{
      type:Function
    },
    blur:{
      type:Function
    },
    focus:{
      type:Function
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

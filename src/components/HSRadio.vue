<template>
  <a-radio-group
    :defaultValue="radioGroup.defaultValue"
    :disabled="radioGroup.disabled"
    :name="radioGroup.name"
    :options="radioGroup.options"
    :size="radioGroup.size"
    :value="radioGroup.value"
    :buttonStyle="radioGroup.buttonStyle"
    :change="radioGroup.change"
  >
    <a-radio
      :style="radio.radioStyle"
      :value="radio.value"
      :autoFocus="radio.autoFocus"
      :checked="radio.checked"
      :defaultChecked="radio.defaultChecked"
      :blur="blur"
      :focus="focus">
      {{label}}}
    </a-radio>
  </a-radio-group>

</template>

<script>
export default {
  name: 'hs-radio',
  props: {
    radioGroup:{
      defaultValue:{
        type:any
      },
      disabled:{
        type:Boolean
      },
      name:{
        type:String
      },
      options:{
        type:String|Array
      },
      size:{
        type:String
      },
      value:{type:String},
      buttonStyle:{type:"String"},
    //  event
      change:{
        type:Function
      }
    },
    radio:{
      uniqueKey:{},
      radioStyle:{},
      label:{
        type:String
      },
      value:{
        type:String
      },
      autoFocus:{
        type:Boolean
      },
      checked:{
        type:Boolean
      },
      defaultChecked:{
        type:Boolean
      },
      // event
      blur:{
        type:Function
      },
      focus:{
        type:Function
      }
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

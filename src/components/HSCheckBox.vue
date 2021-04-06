<template>
  <a-checkbox-group
    :defaultValue="checkGroup.defaultValue"
    :disabled="checkGroup.disabled"
    :name="checkGroup.name"
    :options="checkGroup.options"
    :size="checkGroup.size"
    :value="checkGroup.value"
    :buttonStyle="checkGroup.buttonStyle"
    :change="checkGroup.change"
  >
    <a-checkbox
      :style="checkbox.radioStyle"
      :value="checkbox.value"
      :autoFocus="checkbox.autoFocus"
      :checked="checkbox.checked"
      :disabled="checkbox.disabled"
      :defaultChecked="checkbox.defaultChecked"
      :change="checkbox.change"
      :blur="blur"
      :focus="focus">
      {{label}}}
    </a-checkbox>
  <a-checkbox-group>

</template>

<script>
export default {
  name: 'hs-checkbox',
  props: {
    checkGroup:{
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
      value:{type:String},
      change:{
        type:Function
      }
    },
    checkbox:{
      uniqueKey:{},
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
      disabled:{
        type:Boolean
      },
      defaultChecked:{
        type:Boolean
      },
      // event
      change:{
        type:Function
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

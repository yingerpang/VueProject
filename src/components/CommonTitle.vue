<template>
  <div class="page-title">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['handleBack','handleSave',"title"]
}
</script>

<style lang="less" scoped>
  .page-title{
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #f4f3f3;
    padding-left: 10px;
    margin: 0 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2{
      font-weight: 400;
      position: relative;
      font-size: 16px;
      padding: 0 10px;
    }
    h2::before{
      position: absolute;
      content: "";
      width: 4px;
      height: 16px;
      background-color: #ff5722;
      left: -3px;
      top: 50%;
      margin-top: -9px;
    }
    button{
      margin-left: 10px;
    }
  }
</style>

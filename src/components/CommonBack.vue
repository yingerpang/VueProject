<template>
  <div class="page-back">
    <h2>这是标题</h2>
    <div>
      <HSButton v-if="handleSave" type="primary" @click="handleSave"> <a-icon type="plus-circle" />保存</HSButton>
      <HSButton v-if="handleBack"  @click="handleBack"> <a-icon type="left" />返回</HSButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['handleBack','handleSave']
}
</script>
<style lang="less" scoped>
  .page-back{
    height: 54px;
    line-height: 54px;
    margin: 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2{
      font-weight: 400;
      position: relative;
      font-size: 18px;
    }

    button{
      margin-left: 10px;
    }
  }
</style>

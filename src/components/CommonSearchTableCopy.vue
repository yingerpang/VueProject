<template>
  <div class="home">
        <div class="advanced-search-box" v-if="advancedSearchOption">
          <template>
              <a-form class="ant-advanced-search-form" :form="form" @submit="advancedSearchOption.handleSearch">
                <a-row :gutter="24">
                  <a-col
                      v-for="(data) in advancedSearchOption.filedsList"
                      :key="data.key"
                      :span="data.colSpan?data.colSpan:colSpan">
                    <a-form-item
                        :label="`${data.label}`"
                        :labelCol="data.labelCol?data.labelCol:labelCol"
                        :wrapperCol="data.wrapperCol?data.wrapperCol:wrapperCol">
                        <a-input
                          v-if="data.type=='input'"
                          :v-decorator="[
                            `${data.key}`,
                            {
                              rules: data.rules
                            },
                          ]"
                          :change="handleChange"
                          :placeholder="data.placeholder"/>
                      <a-select
                          v-decorator="[
                            `${data.key}`,
                          ]"
                          v-if="data.type=='select'"
                          @change="data.onChange"
                          :placeholder="data.placeholder">
                        <a-select-option

                            v-for="(option) in data.items"
                            :key="JSON.stringify(option)"
                            :value="option.value">
                          {{ option.label }}
                        </a-select-option>
                      </a-select>
                      <a-radio-group
                          v-decorator="[
                            `${data.key}`,]"
                          v-if="data.type=='radio'"
                          @change="data.onChange">
                        <a-radio v-for="(option) in data.items" :value="option.value" :key="JSON.stringify(option)">
                          {{option.label}}
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24" :style="{ textAlign: 'right' }">
                    <a-button type="primary" html-type="submit" icon="search">
                      搜索
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="advancedSearchOption.handleReset" icon="undo">
                      重置
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
          </template>
        </div>
      </div>
</template>

<script>

import { mapGetters } from 'vuex'   // 引入vuex
import HSButton from './HSButton'
import HSInputSearch from './HSInputSearch'
import HSInput from './HSInput'
export default {
  components: {
    HSButton,
    HSInput,
    HSInputSearch
  },
  props: ['searchOption','advancedSearchOption',"tableData",'loading'],
  data() {
    return {
      expandIconPosition: 'right',
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      //表格 默认样式属性
      colSpan:8,
      labelCol:{sm:6},
      wrapperCol:{sm:18},
    }
  },
  watch: {
  },
  methods: {
    // 模拟请求数据
    requestList(page,size) {
      const {onChange,params}=this.tableData
      params.page=page;
      params.size=size;
      onChange(params);
    },
    handleChange(e){
      console.log("eee",e);
    }
  },
  mounted() {
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
    ...mapGetters({
      getState: "list/getState"
    })
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields,allFields) => {
        console.log(1111);
        this.advancedSearchOption.handleChangedFields(allFields);
      },
      mapPropsToFields: () => {
        return {
          username: this.$form.createFormField({
            value: this.username,
          }),
        };
      },
      onValuesChange: (_, values) => {
        console.log(2222);
        this.values=values;
      },
    });
  },

}
</script>

<style lang="less" scoped>

.home{
  padding: 10px;
  .table-operations{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    .ant-input-search{
      width:300px;
    }
  }
  .advanced-search-box{
    margin-bottom: 10px;
    .search-header{
      display: flex;
      justify-content: space-between;
      background: #fafafa;
      align-items: center;
      height:40px;
    }
    .search-options,.search-content-form{
      padding: 20px 10px;
    }
    .ant-advanced-search-form .ant-form-item {
      display: flex;
      margin-bottom: 15px;
    }
    .ant-advanced-search-form .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
  .title{
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .btn-line{
    text-align: left;
    margin-bottom: 10px;
  }
  .com-page{
    margin: 20px 10px;
    text-align: right;
  }
  .com-table{

  }
  .ant-table-tbody{
    .ant-btn-primary{
      margin-left: 10px;
    }
  }
  .curret-conditions{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .current{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .condition-item{
      margin-right: 10px;
      .anticon-close{
        font-size: 12px;
      }
    }
  }
}
</style>

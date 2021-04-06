<template>
  <div class="home">
    <div class="table-operations" v-if='searchOption'>
      <template>
        <div v-if="!searchOption.button"></div>
        <div v-if="searchOption.button">
          <HSButtons
            v-for="(option) in searchOption.button"
            :uniqueKey="option.key"
            :type="option.type"
            :click="option.handClick"
            :icon="option.icon"
            :name="option.name" />
        </div>
      </template>
      <template v-if="searchOption.searchInput">
        <HSInputSearch
          v-for="(option) in searchOption.searchInput"
          :uniqueKey="option.key"
          class="search"
          :change="option.change"
          :pressEnter="option.pressEnter"
          :placeholder="option.placeholder" />
      </template>
    </div>
    <div class="advanced-search-box" v-if="advancedSearchOption">
      <a-collapse :expand-icon-position="expandIconPosition">
        <a-collapse-panel key="1" :forceRender=true>
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
                  <HSInput
                    v-if="data.type=='input'"
                    v-decorator="[
                            `${data.key}`,
                            {
                              rules: data.rules
                            },
                          ]"
                    :placeholder="data.placeholder"/>
                  <HSelect
                    v-decorator="[
                            `${data.key}`,
                          ]"
                    v-if="data.type=='select'"
                    @change="data.onChange"
                    :placeholder="data.placeholder">
                    <HSelectOption
                      v-for="(option) in data.items"
                      :key="option.key"
                      :value="data.setValue?option[data.setValue]:option.value">
                      {{data.setKey?option[data.setKey]:option.key }}
                    </HSelectOption>
                  </HSelect>
                  <HSDatePicker
                    v-decorator="[
                            `${data.key}`,
                          ]"
                    v-if="data.type=='datepicker'"
                    @change="data.onChange"
                    :placeholder="data.placeholder"
                  />
                  <HSRangePicker
                    v-decorator="[
                            `${data.key}`,
                          ]"
                    v-if="data.type=='rangepicker'"
                    @change="data.onChange"
                    :placeholder="data.placeholder"
                  />
                  <HSRadioGroup
                    v-decorator="[
                            `${data.key}`,]"
                    v-if="data.type=='radio'"
                    @change="data.onChange">
                    <HSRadio
                      v-for="(option) in data.items"
                      :value="data.setValue?option[data.setValue]:option.value"
                      :key="data.setKey?option[data.setKey]:option.label">
                      {{data.setKey?option[data.setKey]:option.label}}
                    </HSRadio>
                  </HSRadioGroup>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24" :style="{ textAlign: 'right' }">
                <HSButton type="primary" html-type="submit" icon="search">
                  搜索
                </HSButton>
                <HSButton :style="{ marginLeft: '8px' }" @click="advancedSearchOption.handleReset" icon="undo">
                  重置
                </HSButton>
              </a-col>
            </a-row>
          </a-form>
          <div class="curret-conditions" slot="header" >
            <div class="current">
              <div v-if="advancedSearchOption.changedFields!=null">当前选择：</div>
              <template  v-for="(current) in advancedSearchOption.changedFields">
                <HSButton
                  @click="advancedSearchOption.handleConditionClick($event,current)"
                  class="condition-item"
                  v-if="current.name&&current.value!=''"
                  :key="current.value">{{current.value}}<HSIcon type="close" />
                </HSButton>
              </template>
            </div>
            <HSButton slot="extra" type="link" :style="{height:'unset',padding:0}">高级搜索</HSButton>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <HSTable
      size="small"
      class="com-table"
      :columns="tableData.columns"
      :data-source="tableData.list"
      :pagination="false"
      :rowKey="tableData.rowKey"
      :loading="loading"
      bordered>
      <div slot="action" slot-scope="scope" >
        <slot name="action" :data="scope"></slot>
      </div>
      <div slot="pic" slot-scope="scope">
        <slot name="pic" :path="scope"></slot>
      </div>
      <div slot="putawayStatus" slot-scope="scope">
        <slot name="putawayStatus" :status="scope"></slot>
      </div>
    </HSTable>
    <HSPagination
      v-if="tableData.pagination"
      class="com-page"
      show-quick-jumper
      show-size-changer
      @change="requestList"
      @showSizeChange="requestList"
      :total="tableData.totalElements"
      :show-total="(total, range) => `${tableData.params.size}条/页, 共 ${total} 条, 分${Math.ceil(total/tableData.params.size)}页显示。`"
      :current="tableData.params.page"
      :page-size="tableData.params.size"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'   // 引入vuex
import HSButtons from './HSButton'
import HSInputSearch from './HSInputSearch'
export default {
  components: {
    HSButtons,
    HSInputSearch
  },
  props: ['searchOption','advancedSearchOption',"tableData",'loading',"initValues"],
  data() {
    return {
      expandIconPosition: 'right',
      expand: false,
      form: this.$form.createForm(this),
      //表格 默认样式属性
      colSpan:8,
      labelCol:{sm:6},
      wrapperCol:{sm:18},
      activeKey: ['1'],
    }
  },
  watch: {
    test(){
    }
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
        this.advancedSearchOption.handleChangedFields(changedFields,allFields);
      },
      mapPropsToFields: () => {
        return {

        };
      },
      onValuesChange: (_, values) => {
        this.values=values;
      },
    });
    this.$nextTick(()=>{
      this.form.setFieldsValue(this.initValues)
    })
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
    .search{
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
  .ant-form-item .ant-calendar-picker{
    width: 100%;
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

<template>
  <div class="content">
    <div class="contnet-box">
      <div>
        <CommonTitle title='维度列表'/>
        <CommonSearchTable
          ref="searchMainForm"
          :tableData="tableData"
          :loading="loading">
        </CommonSearchTable>
      </div>
      <div>
        <CommonTitle title='维度详情'/>
        <CommonSearchTable
          ref="searchItemForm"
          :searchOption="quickOperation"
          :tableData="tableData"
          :loading="loading">
          <template slot-scope="row" slot="action">
            <HSButton type="primary" size="small" ghost @click="showPopup(row,'preview')">查看</HSButton>
            <HSButton type="primary" size="small" ghost @click="showPopup(row,'edit')">编辑</HSButton>
            <HSButton type="primary" size="small" ghost @click="delFn(row)">删除</HSButton>
          </template>
        </CommonSearchTable>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content{
  height: calc(~"100vh - 70px");
  background: white;
  overflow:hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border: 10px solid #f0f2f5;
  border-bottom: none;

}
</style>
<script>
import {CommonSearchTable,CommonTitle} from "@/components";

export default {
  components:{
    CommonSearchTable,
    CommonTitle
  },
  data() {
    return {
      quickOperation:{
        searchInput:[
          {
            type:"input",
            name:"keyword",
            key:'keyword',
            placeholder:"请输入搜索的内容",
            change:this.handleInputSearch,
            pressEnter:this.handleInputSearch
          }
        ]
      },
      loading:true,
      tableData:{
        columns: [
          {
            title: '产品编码',
            dataIndex: 'id',
            key: 'id',
            width:150,
            ellipsis:true,
          },
          {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            width:150,
            ellipsis:true,
          },
          {
            title: '产品分类',
            dataIndex: 'productClass2Name',
            key: 'productClass2Name',
            width:150,
            ellipsis:true,
          },
          {
            title: '产品供应商',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width:150,
            ellipsis:true,
          },
          {
            title: '最后修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:150,
            ellipsis:true,
          },
          {
            title: '操作',
            dataIndex: '',
            key: 'action',
            width:300,
            scopedSlots: {customRender:'action'},
          }
        ],
        list: [],
        pagination:true,
        onChange:this.requestList,
        params:{
          page:1,
          size:10,
        },
        scroll:{ x: 800, y: 300 },
        totalElements:0,
        handleDelItem:this.requestList,
        rowKey:"id"
      },
      formInitValues:{auditStatus: null,supplierCode:null,productCode:null,productName:null,createTime:null,beginTime:null }
    }
  },
  watch: {
  },
  methods:{
    handleInputSearch(){

    },
    // 模拟请求数据
    requestList(params) {
      this.loading=true;
      this.$store.dispatch('product/PRODUCTLIST',params).then(res=>{
        const {data,totalElements}=res;
        const newData={
          ...this.tableData,
          list:data,
          params,
          totalElements
        }
        this.tableData = newData;
        this.loading=false;
      })
    }
  },
  mounted() {

  },
  computed: {
  },
  created() {
    const {params}=this.tableData;
    this.requestList(params);
    this.$store.dispatch('product/supplierProduct').then(res=>{
      const {data}=res;
      supplierList.push(...data)
    })
  }
}
</script>
<style lang="less">
  .contnet-box{
    display: flex;
  }
</style>


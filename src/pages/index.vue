<template>
  <div class="home-list">
    <CommonSearchTable
        ref="searchForm"
        :searchOption="searchButton"
        :advancedSearchOption="advancedSearch"
        :tableData="tableData"
        :initValues="formInitValues"
        :loading="loading">
        <template slot-scope="row" slot="action">
          <HSButton type="primary" size="small" ghost @click="showPopup(row,'preview')">查看</HSButton>
          <HSButton type="primary" size="small" ghost @click="showPopup(row,'edit')">编辑</HSButton>
          <HSButton type="primary" size="small" ghost @click="delFn(row)">删除</HSButton>
        </template>
        <span slot="pic" slot-scope="row">
          <img style="width:40px;height:40px" :src="row.path"/>
        </span>
        <span slot="putawayStatus" slot-scope="row">
          <div v-if="row.status==1">审核通过</div>
          <div v-if="row.status==0">待审核</div>
        </span>
    </CommonSearchTable>
  </div>
</template>
<script>
import {CommonSearchTable} from "@/components";
const auditStatusList=[{key:'全部',value:null},
  {key:'审核通过',value:'1'},
  {key:'待审核',value:'0'}]

const supplierList=[
  {supplierName:'全部',supplierCode:null}
]

export default {
  components: {
    CommonSearchTable,
  },
  data() {
    return {
      //快捷搜索：按钮、搜索框、包括按钮属性和事件
      searchButton:{
        button:[{
          type: "primary",
          name: "增加",
          key: 'add',
          icon: 'plus-circle',
          handClick: this.add,
          ghost:true
        }],
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

      //高级搜索：按钮、搜索框、包括按钮属性和事件
      advancedSearch:{
        filedsList:[
          {
            label:"产品编码",
            key:"productCode",
            type:'input',
            placeholder:"请输入产品编码",
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:18},
          },
          {
            label:"产品名称",
            key:"productName",
            type:'input',
            placeholder:"请输入公司产品名称",
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:18},
          },
          {
            label:"审核状态",
            key:"auditStatus",
            type:'select',
            placeholder:"请选择审核状态",
            onChange:this.handleChange,
            items:auditStatusList,
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:18},
          },
          {
            label:"供应商",
            key:"supplierCode",
            type:'radio',
            onChange:this.handleChange,
            items:supplierList,
            //radio：显示的key值，自定义
            setKey:"supplierName",
            setValue:'supplierCode',
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:18},
          },
          // {
          //   label:"时间",
          //   key:"createTime",
          //   type:'datepicker',
          //   onChange:this.handleTimeChange,
          //   colSpan:8,
          //   labelCol:{sm:6},
          //   wrapperCol:{sm:18},
          // },
          // {
          //   label:"时间范围",
          //   key:"createTime",
          //   type:'rangepicker',
          //   onChange:this.handleTimeChange,
          //   colSpan:8,
          //   labelCol:{sm:6},
          //   wrapperCol:{sm:18},
          // },
        ],

        //操作表单事件：handleReset重置、handleSearch搜索、handleConditionClick：删除当前选择项
        handleReset:this.handleReset,
        changedFields:null,
        handleSearch:this.handleSearch,
        handleChangedFields:this.handleChangedFields,
        handleConditionClick:this.handleConditionClick,
      },
      loading:true,
      //表格数据：columns：表格显示列名 list：表格数据  onChange：表格页码变化  handleDelItem：删除操作
      tableData:{
        columns: [
          {
            title: '产品编码',
            dataIndex: 'id',
            key: 'id',
            width:150
          },
          {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            width:200
          },
          {
            title: '产品分类',
            dataIndex: 'productClass2Name',
            key: 'productClass2Name',
            width:200
          },
          {
            title: '产品供应商',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width:200
          },
          {
            title: '产品图片',
            dataIndex: 'productImgUrl',
            // key: 'topicCoverPath',
            width:200,
            align:'center',
            scopedSlots: {customRender:'pic'}
          },
          {
            title: '审核状态',
            dataIndex: 'putawayStatus',
            key: 'putawayStatus',
            scopedSlots: {customRender:'putawayStatus'},
            width:100
          },
          {
            title: '最后修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:200
          },
          {
            title: '操作',
            dataIndex: '',
            key: 'action',
            width:200,
            scopedSlots: {customRender:'action'}
          }
        ],
        list: [],
        pagination:true,
        onChange:this.requestList,
        params:{
          page:1,
          size:10,
        },
        totalElements:0,
        handleDelItem:this.delFn,
        rowKey:"id"
      },
      formInitValues:{auditStatus: null,supplierCode:null,productCode:null,productName:null,createTime:null,beginTime:null }
    }
  },
  watch: {
  },
  methods: {
    handleChange(value) {
    },
    handleTimeChange(e){
      console.log("time",e);
    },
    handleConditionClick(event,current){
      const {name}=current
      event.preventDefault();
      event.stopPropagation();
      let newFields={};
      for(let obj in this.advancedSearch.changedFields){
        if(obj!=name){
          newFields[obj]=this.advancedSearch.changedFields[obj]
        }
      }
      this.advancedSearch.changedFields=newFields;
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
    },

    handleChangedFields(currentFields,allFields){
      let originalResult=null;
      for(let key in allFields){
        const {value}=allFields[key];
        if(key=="auditStatus"){
          originalResult=auditStatusList.filter((item=>{
            return item.value == value
          }))
          allFields[key].value=originalResult[0].key
        }
        if(key=="supplierCode"){
          originalResult=supplierList.filter((item=>{
            return item.supplierCode == value
          }))
          allFields[key].value=originalResult[0].supplierName
        }
      }
      this.advancedSearch.changedFields=allFields;
    },
    handleSearch(e) {
      e.preventDefault();
      const {params}=this.tableData;
      this.$refs.searchForm.form.validateFields((error, values) => {
        if(!error){
          let newParams={...params,...values,page:1}
          this.requestList(newParams)
        }
      });
    },
    handleInputSearch(e){
      const {params}=this.tableData;
      const keyWords=e.target.value
      let newParams={
        ...params,
        keyWords
      }
      this.requestList(newParams)
    },
    handleReset() {
      let values={
        auditStatus: null,
        supplierCode:null,
        productCode:null,
        productName:null
      }
      this.tableData.params={
        page:1,
        size:10
      }
      this.$refs.searchForm.form.setFieldsValue(values)
      this.advancedSearch.changedFields=null;
    },
    toggle() {
      this.expand = !this.expand;
    },
    // 新增
    add() {
      this.$router.push(`/company/list/operation/add`)
    },

    // 查看/编辑弹窗
    showPopup(data, flag) {
      const {data:{id}}=data;
      this.$router.push(`/company/list/operation/${flag}/${id}`)
    },

    // 删除
    delFn(data) {
      const {data:{id}}=data;
      const {params}=this.tableData;
      this.$confirm({
        title: '系统提示',
        content: '确定要删除该数据吗？',
        onOk: () => {
          this.$store.dispatch('product/delProduct',id).then(res=>{
            this.$notification.success({
              message: '系统提示',
              description: `删除成功`,
              onClick: () => {
                this.requestList(params);
              },
              onClose: () => {
                this.requestList(params);
              },
            });
          })
        },
      });
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

<style lang="less" scoped>
</style>

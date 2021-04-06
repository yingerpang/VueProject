<template>
    <div>
      <CommonBack :handleBack="handleBack" :handleSave="type!='preview'?handleSubmit:null"/>
      <div class="content">
        <CommonTitle title='基本信息'/>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
          <a-row :gutter="24">
            <a-col
              v-for="(data) in filedsList"
              :key="data.key"
              :span="data.colSpan">
              <a-form-item
                :label="`${data.label}`"
                :labelCol="data.labelCol"
                :wrapperCol="data.wrapperCol">
                <a-input
                  v-if="data.type=='input'"
                  :disabled="data.disabled"
                  v-decorator="[
                            `${data.key}`,
                            {
                              rules: data.rules
                            },
                          ]"
                  :placeholder="data.placeholder"/>
                <a-select
                  :disabled="data.disabled"
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
                  @change="data.onChange"
                  :disabled="data.disabled"
                >
                  <a-radio v-for="(option) in data.items" :value="option.value" :key="JSON.stringify(option)">
                    {{option.label}}
                  </a-radio>
                </a-radio-group>
                <template v-if="data.type=='upload'">
                  <a-upload
                    :disabled="data.disabled"
                    v-decorator="[
                      `${data.key}`,
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      },
                    ]"
                    action="/api/product/file/upload"
                    list-type="picture-card"
                    name="file"
                    @preview="handlePreview"
                    @change="handleChange">
                    <div v-if="fileList.length < 8">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">
                        Upload
                      </div>
                    </div>
                  </a-upload>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>

    </div>
</template>

<script>
import {CommonBack,CommonTitle} from '@/components'
import {mapGetters, mapMutations,} from "vuex";
  export default {
    components: {
      CommonTitle,
      CommonBack
    },
    name: "maintainIndex",
    data(){
      return {
        type:null,
        id:null,
        confirmDirty: false,
        autoCompleteResult: [],
        form:this.$form.createForm(this),
        filedsList:[
          {
            label:"产品编码",
            key:"productCode",
            type:'input',
            placeholder:"请输入产品编码",
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:16},
          },
          {
            label:"产品名称",
            key:"productName",
            type:'input',
            placeholder:"请输入公司产品名称",
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:16},
          },
          {
            label:"产品分类",
            key:"productClass2Name",
            type:'input',
            placeholder:"请选择产品分类",
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:16},
          },

          {
            label:"产品供应商",
            key:"supplierCode",
            type:'select',
            placeholder:"请选择产品供应商",
            items:[
              {label:'全部',value:null},
              {label:'重庆出版集团',value:'1'},
              {label:'博库网',value:'2'},
            ],
            colSpan:8,
            labelCol:{sm:6},
            wrapperCol:{sm:16},
          },
          {
            label:"产品封面",
            key:"productImgUrlList",
            type:'upload',
            placeholder:"请上传产品封面",
            colSpan:24,
            labelCol:{sm:2},
            wrapperCol:{sm:22},
          },
        ],
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }
        ],
      }
    },
    mounted() {
      const {type,id}=this.$route.params;
      this.form = this.$form.createForm(this)
      this.type= type
      this.id=id;
      if(type!='add'){
        this.$store.dispatch('product/detailProduct', {id}).then(res=>{
          console.log("res",res);
          const {data}=res;
          this.$nextTick(() => {
            this.form.setFieldsValue(data)
          })
        })
        if(type=='preview'){
          this.filedsList.map(item=>{
            item.disabled=true
          })
        }
      }
    },
    watch: {

    },
    computed: {
    },
    beforeCreate() {
      // this.form = this.$form.createForm(this, { name: 'register' });
    },
    methods:{

      handleCancel() {
        this.previewVisible = false;
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      handleChange({ fileList }) {
        this.fileList = fileList;
      },
      handleReset() {
        this.form.resetFields()
        this.advancedSearch.changedFields=null;
      },
      handleBack(){
        this.$router.back();
      },
      handleSave(){
        this.$notification.success({
          message: '系统提示',
          description: `${this.type=='add'?"新增":"数据更新"}成功`,
          onClick: () => {
            this.$router.back();
          },
          onClose: () => {
            this.$router.back();
          },
        });
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          switch (this.type){
            case "add":
              //调用接口
              // this.$store.dispatch('product/addProduct',values).then(res=>{
              //    更新成功调用提示功能
                    this.handleSave();
              // })
              break;
            case "edit":
              // this.requestUpdate({id:this.id-1, values:{...values}});
              // this.$store.dispatch('product/updateProduct',values).then(res=>{
              //   更新成功调用提示功能
                   this.handleSave();
              // })
              break;
          }
        });
      },
      normFile(e) {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      },
    }
  }
</script>

<style lang="less" scoped>
  .content{
    height: calc(~"100vh - 70px - 64px");
    background: white;
    overflow:hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border: 10px solid #f0f2f5;
    border-bottom: none;

  }
</style>

<template>
  <div class='page-content'>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="4">
        <el-input placeholder="标题"  v-model="searchParameter.title"></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="4" class="el-col2">
        <el-button @click="search">搜索</el-button>
        <el-button @click="showDialog('add')">新增</el-button>
      </el-col>
    </el-row>

    <tao-table style="margin-top: 15px" :data="roleList" :showPage="false">
      <el-table-column label="分类" prop="name"/>
      <el-table-column label="标题" prop="title"/>
      <el-table-column label="作者" prop="author"/>
      <el-table-column label="创建时间" prop="create_time"/>

      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="showDialog('edit',scope.row)">
            编辑
          </el-button>
          <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteUser(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tao-table>

    <el-dialog :title="dialogTitle" width="500px" :visible.sync="dvEdit">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form">
          <el-row style="display: flex">
            <el-input v-model="form.title" placeholder="输入标题" style="flex: 1"/>
            <el-input v-model="form.author" placeholder="作者" style="flex: 1"/>
            <el-select v-model="form.type" placeholder="请选择分类" style="width: 200px; margin-left: 10px">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-row>
          <quill-editor
            class="editor"
            ref="quillEditor"
            v-model="form.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dvEdit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <template v-if="allpage>10">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="1"
                       :page-size="10"
                       layout="total, prev, pager, next, jumper"
                       :total="allpage">
        </el-pagination>
    </template>
  </div>
</template>

<script>
  import {getArticleListApi,getArticleEditApi, getArticleDelApi} from '@/api/ArticleApi'
  import {getArticleTypeListApi} from '@/api/ArticleTypeApi'
  import { quillEditor } from 'vue-quill-editor'
  import { getUploadDataApi } from '@/api/UploadApi'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import '@/config/quill/quill.scss'
  export default {
    components: {
      quillEditor
    },
    data () {
      return {
        allpage:1,//总页数
        showItem:5,//分页显示得中间按钮个数
        current:1,//当前页
         uploadData: {},
        editorOption: {
          placeholder: ''
        },
        searchParameter: {
          title: undefined,
        },
        content: '',
        headers: {
          Authorization: ''
        },
        editorOption: {
          placeholder: ''
        },
        headers: {
          Authorization: ''
        },
        form: {
          title: '',
          cover: ''
        },
        dvEdit: false,
        dialogTitle: '',
        form: {
          username: '',
          desc: '',

        },
        props: {
          label: 'name',
          children: 'zones'
        },
        options:[],
        count: 1,
        roleList: [],
        articleTypeList:[]
      };
    },
    mounted() {
      this.getUserList();
      this.getArticleTypeList();
    },
    methods: {
      handleCurrentChange:function(index){
                this.current = index;
                getArticleTypeListApi({
                  page:index,
                }).then(res => {
                  this.roleList = res.data.data;
                  this.allpage = res.data.total;
                })
      },
      getUserList(){
        getArticleListApi(this.searchParameter).then(res => {
          this.roleList = res.data.data
        })
      },
      getArticleTypeList(){
        getArticleTypeListApi().then(res => {
          this.articleTypeList = res.data.data
           this.options =res.data.data

        })
      },
      search() {
        this.getUserList()
      },
      showDialog(type,row) {
        this.dvEdit = true
         if(type === 'edit') this.form  = row;
         if(type === 'add') this.form  = {};
        this.dialogTitle = type === 'add' ? '新增' : '编辑'
        // let then = this
        // setTimeout(()=>{
        //   let quill = then.$refs.quillEditor.quill
        //    // 监听工具栏图片点击
        //    quill.getModule('toolbar').addHandler('image', then.imgHandler)
        // },500)
      },
      onSubmit() {
       // this.dvEdit = false

        // console.log(this.$refs)
        getArticleEditApi(this.form).then(res => {
          this.roleList = res.data.data
        //   console.log(res.data)
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      onEditorBlur(quill) {

      },
      onEditorFocus(quill) {

      },
      onEditorReady(quill) {

      },
      handleNodeClick(data) {
        // console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { name: '监控中心' },
            { name: '文章管理' },
            { name: '用户管理' },
            { name: '菜单管理' },
            { name: '个性设置' },
            { name: '异常管理' },
            { name: '系统设置' },
          ]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      // upScuccess(e) {
      //   let { path } = e.data
      //   let url = '' + path
      //   let quill = this.$refs.quillEditor.quill
      //   let selection = quill.getSelection()

      //   // 获取光标的位置
      //   let cursorIndex = selection ? selection.index : 0
      //   // 插入图片到编辑器
      //   quill.insertEmbed(cursorIndex, 'image', url)
      //   // 调整光标到最后
      //   quill.setSelection(cursorIndex+1)
      // },
      deleteUser(scope) {
        this.$confirm('您确定要删除当前用户吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          getArticleDelApi({'id':scope.id}).then(res=>{
                if(res.code == 1){
                  this.getUserList()
                }
          })
        }).catch(() => {})
      }
    },
    // computed: {
    //   editor() {
    //     return this.$refs.quillEditor.quill
    //   }
    // }
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
  }
</style>

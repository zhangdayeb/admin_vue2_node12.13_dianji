<template>
  <div class="page-content">
    <div class="form">
      <el-row style="display: flex">
        <el-input v-model="form.title" placeholder="输入标题" style="flex: 1"/>
        <el-select v-model="value" placeholder="请选择分类" style="width: 200px; margin-left: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-upload v-model="form.url"
          action="http://tp.com/index.php/upload/video"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-row>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dvEdit = false">取 消</el-button>
       <el-button type="primary" @click="onSubmit">确 定</el-button>
     </span>
    </div>

  </div>



</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
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
        uploadData: {},
        content: '',
        headers: {
          Authorization: ''
        },
        editorOption: {
          placeholder: ''
        },
        form: {
          title: '',
          cover: ''
        },
        options: {},
        value: '',
        fullscreenLoading: false,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted() {

    },
    methods: {

      submit() {

      },
      beforeUpload() {

      },

      onEditorBlur(quill) {

      },
      onEditorFocus(quill) {

      },
      onEditorReady(quill) {

      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file.url)
      },
      onSubmit() {
        // console.log(file.url)
        console.log(this.form)
      },
    },
    computed: {
      editor() {
        return this.$refs.quillEditor.quill
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-content {

    .form {
      max-width: 750px;

      .editor {
        margin-top: 15px;

        .ql-editor {
          min-height: 500px;
        }
      }

      /deep/ .el-upload--picture-card {
        width: 220px;
        height: 140px;
      }
    }
  }
</style>

<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="left"
        >
          <el-form-item label="标题" prop="title">
            <el-input
              ref="name"
              v-model="form.title"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item prop="content">
            <aside>
              {{ $t('posts.create') }}
            </aside>
            <tinymce ref="content" v-model="form.content" :height="300" />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="4">
          <el-button
            size="small"
            type="primary"
            plain
            @click="preview"
          ><svg-icon icon-class="form" />预览 HTMl 结果</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            size="small"
            type="primary"
            plain
            @click="submitForm"
          >保存</el-button>
        </el-col>
      </el-row>
      <el-row v-if="showHtml">
        <div class="editor-content" v-html="content" />
      </el-row>
    </section>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { store } from '@/api/post'

export default {
  name: 'PostCreate',
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' },
        content: { required: true, message: '请输入内容', trigger: 'blur' }
      },
      showHtml: false
    }
  },
  methods: {
    preview() {
      this.showHtml = true
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.handleStore()
        } else {
          return false
        }
      })
    },
    async handleStore() {
      await store(this.form)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.$router.push({
        path: 'my/notices'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/post.scss";

  .blog-content {

    .el-row {
      margin-bottom : 30px;
    }

    .editor-content {
      margin-top: 20px;
    }

    .svg-icon {
      margin-right: 8px;
    }
  }
</style>

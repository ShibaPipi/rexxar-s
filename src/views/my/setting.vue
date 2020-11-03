<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="14">
          <el-tabs tab-position="left">
            <el-tab-pane class="tabs-pane" label="基本信息">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-position="left"
                label-width="80px"
              >
                <el-form-item
                  label="昵称"
                  prop="name"
                >
                  <el-input
                    ref="name"
                    v-model="form.name"
                    placeholder="昵称"
                    name="name"
                    type="text"
                    tabindex="1"
                  />
                </el-form-item>
                <el-form-item
                  label="自我介绍"
                  prop="introduction"
                >
                  <el-input
                    ref="introduction"
                    v-model="form.introduction"
                    placeholder="自我介绍"
                    name="introduction"
                    type="textarea"
                    tabindex="2"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" plain @click="submitForm">立即修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane class="tabs-pane" label="头像">
              <pan-thumb :image="avatar" />
              <el-button
                type="primary"
                plain
                icon="el-icon-upload"
                style="position: absolute;bottom: 15px;margin-left: 40px;"
                @click="show=true"
              >点击修改
              </el-button>
              <image-cropper
                v-show="show"
                :width="300"
                :height="300"
                :url="url"
                @close="close"
                @crop-upload-success="cropSuccess"
              />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { updateInfo } from '@/api/my'
import { setAvatar, setInfo } from '@/utils/auth'

const { mapMutations } = createNamespacedHelpers('user')

export default {
  name: 'MySetting',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      form: {
        name: '',
        introduction: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入自我介绍', trigger: 'blur' }
        ]
      },
      url: process.env.VUE_APP_BASE_API + '/my/avatar',
      show: false
    }
  },
  computed: {
    ...mapGetters(['token', 'name', 'introduction', 'avatar'])
  },
  created() {
    this.form.name = this.name
    this.form.introduction = this.introduction
  },
  activated() {

  },
  methods: {
    ...mapMutations(['SET_NAME', 'SET_INTRODUCTION', 'SET_AVATAR']),
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.handleUpdateInfo()
        }
      })
    },
    cropSuccess({ src }) {
      this.show = false
      this.SET_AVATAR(src)
      setAvatar(src)
    },
    close() {
      this.show = false
    },
    async handleUpdateInfo() {
      await updateInfo(this.form)
      this.SET_NAME(this.form.name)
      this.SET_INTRODUCTION(this.form.introduction)
      setInfo(this.form.name, this.form.introduction)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/post.scss";

.blog-content .tabs-pane {
  padding: 0 2rem;
}
</style>

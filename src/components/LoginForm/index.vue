<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
  >
    <el-form-item
      label="用户名"
      :label-width="formLabelWidth"
      prop="name"
    >
      <el-input
        v-model="loginForm.name"
        placeholder="请输入昵称"
      />
    </el-form-item>
    <el-form-item
      label="密码"
      :label-width="formLabelWidth"
      prop="password"
    >
      <el-input
        v-model="loginForm.password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item class="btn">
      <el-button
        type="primary"
        :loading="loading"
        @click="submitLoginForm"
      >提 交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { loginForm, loginRules } from '@/utils/validate'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('user')

export default {
  name: 'LoginForm',
  data() {
    return {
      loading: false,
      loginForm,
      loginRules,
      formLabelWidth: '80px'
    }
  },
  methods: {
    ...mapActions(['login', 'getInfo']),
    submitLoginForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.handleLogin()
        } else {
          return false
        }
      })
    },
    async handleLogin() {
      this.loading = true
      const res = await this.login(this.loginForm)
      this.loading = false
      res.code === 200 && this.$message({
        message: '登录成功~',
        type: 'success',
        duration: 3 * 1000
      })
    }
  }
}
</script>

<style lang="scss">
  .btn {
    text-align: center;
  }
</style>

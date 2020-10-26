<template>
  <el-header id="layout-header" height="50px">
    <div id="mainHeader">
      <div class="header-container">
        <hgroup id="heading">
          <h1><router-link to="/">{{ $t('layout.title') }}</router-link></h1>
        </hgroup>
        <nav id="nav-bar">
          <ul class="nav nav-default">
            <li><router-link class="link" to="/index">首页</router-link></li>
            <li class="divider" />
            <li><router-link class="link" to="/posts">文章</router-link></li>
            <li><router-link class="link" to="/posts/create">写文章</router-link></li>
            <li class="divider" />
            <li><router-link class="link" to="/notices">通知</router-link></li>
          </ul>
        </nav>
        <div id="tool-bar">
          <div id="userMenu">
            <ul id="userNav" class="nav nav-default">
              <template v-if="token">
                <li>
                  <el-dropdown trigger="click" @command="handleCommand">
                    <span class="dropdown-link">
                      <span class="user-name">ShibaPipi</span>
                      <i class="el-icon-caret-bottom" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>我的主页</el-dropdown-item>
                      <el-dropdown-item>个人设置</el-dropdown-item>
                      <el-dropdown-item :divided="true" command="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </template>
              <template v-else>
                <li class="guest">
                  <button @click="regFormVisible = true">去注册</button>
                </li>
                <li class="divider guest" />
                <li class="guest">
                  <button @click="loginFormVisible = true">登录</button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <el-dialog
        title="来吧，上号"
        width="400px"
        :visible.sync="loginFormVisible"
        :center="true"
      >
        <login-form />
      </el-dialog>
      <el-dialog
        title="注册之后登录，才能写文章"
        width="400px"
        :visible.sync="regFormVisible"
        :center="true"
      >
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="regRules"
        >
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="regForm.name"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            :label-width="formLabelWidth"
            prop="email"
          >
            <el-input
              v-model="regForm.email"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="regForm.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="重复密码"
            :label-width="formLabelWidth"
            prop="password_confirmation"
          >
            <el-input
              v-model="regForm.password_confirmation"
              placeholder="请再次输入密码"
              show-password
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="regLoading"
            @click="submitRegForm"
          >提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </el-header>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import { createNamespacedHelpers, mapGetters } from 'vuex'
import { validName } from '@/utils/validate'
import { register } from '@/api/user'

const { mapActions } = createNamespacedHelpers('user')

export default {
  name: 'LayoutHeader',
  components: { LoginForm },
  data() {
    const validateName = (rule, value, callback) => {
      if (!validName(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePasswordConfirmation = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginFormVisible: false,
      regLoading: false,
      regFormVisible: false,
      regForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      regRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePasswordConfirmation, trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    token: function() {
      if (this.token) {
        this.loginFormVisible = false
      }
    }
  },
  methods: {
    ...mapActions(['login', 'logout']),
    submitRegForm() {
      this.$refs['regForm'].validate(valid => {
        if (valid) {
          this.handleRegister()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async handleRegister() {
      this.regLoading = true
      const res = await register(this.regForm)
      this.regLoading = false
      let message, type
      if (res.code !== 200) {
        message = res.message
        type = 'error'
      } else {
        message = res.data
        type = 'success'
        this.regFormVisible = false
        this.loginFormVisible = true
      }
      this.$message({
        message,
        type,
        duration: 3 * 1000
      })
    },
    async handleLogout() {
      await this.logout()
      this.$message({
        message: '退出成功',
        type: 'success',
        duration: 3 * 1000
      })
      this.$router.go(0)
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.handleLogout()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  #layout-header {
    padding: 0;
  }

  #mainHeader {
    background: $themeHead linear-gradient(-90deg, $themeTail 0, $themeHead 100%);
    background-color: $themeHead;
    border-top-color: $themeTail;
    height: 50px;
    color: #fff;

    .header-container {
      position: relative;
      max-width: 1800px;
      padding: 0;

      ol, ul {
        margin-top: 0;
        margin-bottom: 10px;
      }
    }

    .header-container::before,
    .header-container::after,
    .nav::before,
    .nav::after,
    #userMenu::before,
    #userMenu::after,
    #userNav::before,
    #userNav::after {
      display: table;
      content: " ";
    }
  }

  #heading {
    position: absolute;
    top: 10px;
    left: 20px;

    h1 {
      float: left;
      max-width: 250px;
      margin: 0;
      overflow: hidden;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      text-overflow: ellipsis;
      white-space: nowrap;

      a {
        color: inherit;
        text-decoration: inherit;
      }
    }
  }

  #nav-bar {
    margin: 0 auto;
    font-size: 15px;
    text-align: center;

    .nav {
      display: inline-block;
    }
  }

  #tool-bar {
    position: absolute;
    top: 12px;
    right: 20px;
    font-size: 12px;
    color: #fff;
  }

  #userNav {
    float: right;
    margin: 0 -6px 0 10px;

    .dropdown-link {
      cursor: pointer;
      border-radius: 4px;
      padding: 2px 6px;
      margin-left: 3px;
      line-height: 20px;
      color: #fff;
      opacity: .9;

      .user-name {
        display: inline-block;
        vertical-align: middle;
        max-width: 100px;
        overflow: hidden;
        font-size: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .guest {
      top: -12px;
      font-size: 15px;
    }
  }

  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    .divider {
      display: block;
      width: 2px;
      height: 20px;
      margin: 15px;
      background: rgba(255,255,255,.4)
    }
  }

  .nav-default > li {
    float: left;
  }

  .nav > li {
    position: relative;
    display: block;
  }

  .nav > li > a {
    position: relative;
    display: block;
    padding: 8px 15px;
    color: #3c4353;
    padding: 10px 15px;
    line-height: 30px;
    color: #fff;
    border-radius: 0;
    opacity: .9;
  }

  .nav > li > button {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 8px 15px;
    background: transparent;
    padding: 10px 15px;
    line-height: 30px;
    color: #fff;
    border: none;
    border-radius: 0;
    opacity: .9;
  }

  .nav > li > button:focus {
    outline: none;
  }

  .el-dropdown-menu {
    width: fit-content;
  }
</style>

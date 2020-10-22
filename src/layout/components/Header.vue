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
            <li><router-link class="link" to="">写文章</router-link></li>
            <li class="divider" />
            <li><router-link class="link" to="">通知</router-link></li>
          </ul>
        </nav>
        <div id="tool-bar">
          <div id="userMenu">
            <ul id="userNav" class="nav nav-default">
              <template v-if="token">
                <li>
                  <el-dropdown trigger="click">
                    <span class="dropdown-link">
                      <span class="user-name">ShibaPipi</span>
                      <i class="el-icon-caret-bottom" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>我的主页</el-dropdown-item>
                      <el-dropdown-item>个人设置</el-dropdown-item>
                      <el-dropdown-item :divided="true"><span @click="handleLogout">登出</span></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </template>
              <template v-else>
                <li class="guest">
                  <button @click="LoginFormVisible = true">登录</button>
                </li>
                <li class="divider guest" />
                <li class="guest"><router-link class="link" to="">去注册</router-link></li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <el-dialog
        title="登 录"
        width="30%"
        :visible.sync="LoginFormVisible"
        :show-close="false"
        :center="true"
      >
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
        >
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="loginForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loginLoading"
            @click="submitForm"
          >提 交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="收货地址" :visible.sync="RegFormVisible">
        <el-form :model="regForm">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="regForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="regForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RegFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-header>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex'
import { validName } from '@/utils/validate'
import { Message } from 'element-ui'

const { mapActions } = createNamespacedHelpers('user')

export default {
  name: 'LayoutHeader',
  data() {
    const validateName = (rule, value, callback) => {
      if (!validName(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginLoading: false,
      LoginFormVisible: false,
      RegFormVisible: false,
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      regForm: {
        name: '',
        password: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.handleLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleLogin() {
      this.loginLoading = true
      const res = await this.login(this.loginForm)
      this.loginLoading = false
      if (res.message) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      if (this.token) {
        this.LoginFormVisible = false
      }
    },
    handleLogout() {
      this.logout()
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
</style>

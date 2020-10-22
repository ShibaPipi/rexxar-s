<template>
  <div>
    <layout-header />
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
    <theme-switcher />
    <el-tooltip placement="top" content="Back To Top">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
    <layout-footer />
  </div>
</template>

<script>
import LayoutHeader from './components/Header'
import LayoutFooter from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Layout',
  components: { LayoutHeader, ThemeSwitcher, BackToTop, LayoutFooter },
  data() {
    return {
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '5px',
        bottom: '20px',
        width: '22px',
        height: '22px',
        'border-radius': '3px',
        'line-height': '22px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#d0344e'// 按钮的背景颜色 The background color of the button
      }
    }
  }
}
</script>

<style lang="scss">
  #layout-header, #layout-header + .main-wrapper {
    min-width: 960px;
  }
</style>

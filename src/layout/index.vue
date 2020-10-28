<template>
  <div>
    <layout-header />
    <transition name="rexxar-fade">
      <keep-alive>
        <span-loading v-if="spanLoading" position="fixed" />
        <router-view />
      </keep-alive>
    </transition>
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
import SpanLoading from '@/components/SpanLoading'
import { mapGetters, createNamespacedHelpers } from 'vuex'

const { mapMutations } = createNamespacedHelpers('app')

export default {
  name: 'Layout',
  components: { SpanLoading, LayoutHeader, ThemeSwitcher, BackToTop, LayoutFooter },
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
  },
  computed: {
    ...mapGetters(['spanLoading'])
  },
  methods: {
    ...mapMutations(['TOGGLE_SPAN_LOADING'])
  }
}
</script>

<style lang="scss">
  #layout-header, #layout-header + .main-wrapper {
    min-width: 750px;
  }

  .rexxar-fade-enter-active, .rexxar-fade-leave-active {
    transition: opacity .3s;
  }

  .rexxar-fade-enter, .rexxar-fade-leave-to {
    opacity: 0;
  }
</style>

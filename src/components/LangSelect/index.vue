<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import i18n from '@/lang'
import { createNamespacedHelpers, mapGetters } from 'vuex'

const { mapActions } = createNamespacedHelpers('app')

export default {
  name: 'LangSelect',
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    ...mapActions(['setLanguage']),
    handleSetLanguage(lang) {
      i18n.locale = lang
      this.setLanguage(lang)
      this.$message({
        message: i18n.t('lang.switch'),
        type: 'success'
      })
    }
  }
}
</script>

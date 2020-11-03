<template>
  <el-avatar :size="size" :src="src" :style="'margin-right: ' + space + 'px;'">
    <img :alt="name" :src="alt">
  </el-avatar>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    size: {
      type: Number,
      default: 36
    },
    name: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    space: {
      type: Number,
      default: 10
    },
    alt: {
      type: String,
      default: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    }
  }
}
</script>

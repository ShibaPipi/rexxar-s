<template>
  <div class="no-data">
    <span><svg-icon :icon-class="iconName" class="item icon" /></span>
    <span class="item">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    iconName: {
      type: String,
      default: 'no-data'
    },
    text: {
      type: String,
      default: 'e，暂无数据...'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 15rem;

  .item {
    margin: .5rem 0;
  }

  .icon {
    font-size: 4rem;
  }
}
</style>

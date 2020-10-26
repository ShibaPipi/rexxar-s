<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <aside>
        {{ $t('posts.create') }}
      </aside>
      <div>
        <tinymce v-model="content" :height="300" />
      </div>
      <div class="editor-content" v-html="content" />
    </section></div>
  </section>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'PostCreate',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/post.scss";

  .editor-content {
    margin-top: 20px;
  }
</style>

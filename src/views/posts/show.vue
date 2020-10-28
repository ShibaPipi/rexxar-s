<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <div class="blog-post-container rexxar-fade-in">
        <header class="blog-post-header">
          <h2 class="title mb-2">{{ post.title }}</h2>
          <div class="meta mb-3">
            <span class="date divide">Published {{ post.published_at }}</span>
            <span class="like divide">{{ post.likes_count }} likes</span>
            <span class="comment">
              <router-link to="#">{{ post.comments_count }} comments</router-link>
            </span>
          </div>
        </header>
        <div class="blog-post-body" v-html="post.content" />
      </div>
    </section>
  </div>
</template>

<script>
import { show } from '@/api/post'

export default {
  name: 'PostShow',
  data() {
    return {
      loading: false,
      id: '',
      post: null
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  activated() {
    if (this.id !== this.$route.params.id) {
      this.id = this.$route.params.id
      this.getData()
    }
  },
  methods: {
    async getData() {
      this.loading = true
      const { data } = await show(this.id)
      this.post = data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/post.scss";

  .mb-2, .my-2 {
    margin-bottom: .5rem !important;
  }

  .mb-3, .my-3 {
    margin-bottom: 1rem !important;
  }

  .blog-content {

    .blog-post-container {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;

      .blog-post-header {

        .title {
          font-weight: bold;
          font-size: 2rem;
        }
        .meta {
          color: #8f8f8f;
          font-size: 0.8125rem;

          span {
            display: inline-block;

            a {
              color: #8f8f8f;
            }
          }

          .divide:after {
            content: "";
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #8f8f8f;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            position: relative;
            top: -3px;
          }
        }
      }
    }
  }
</style>

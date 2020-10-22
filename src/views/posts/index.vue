<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <span-loading v-if="listLoading" />
      <div v-else class="post-list rexxar-fade-in">
        <div
          v-for="post in list"
          :key="post.id"
          class="item"
        >
          <div class="media">
            <div class="media-body">
              <h3 class="blog-title">
                <router-link to="#">{{ post.title }}</router-link>
              </h3>
              <div class="meta">
                <span class="date">Published {{ post.published_at }}</span>
                <span class="time">5 min read</span>
                <span class="comment"><a href="#">{{ post.comments_count }} comments</a></span>
              </div>
              <div class="intro">{{ post.content }}</div>
              <router-link to="#" class="more-link">Read more →</router-link>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>

<script>
import SpanLoading from '@/components/SpanLoading'
import { fetchList } from '@/api/post'

export default {
  name: 'Posts',
  components: { SpanLoading },
  data() {
    return {
      listLoading: false,
      list: [],
      page: 1,
      total: 0,
      searchForm: {
        keyword: ''
      }
    }
  },
  watch: {
    page: function() {
      this.getList()
    }
  },
  created() {
    this.page = this.$route.params.page || 1
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data, current_page, total } = (await fetchList(this.page)).data
      this.list = data
      this.page = current_page
      this.total = total
      this.listLoading = false
    },
    handleCurrentChange(val) {
      this.page = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/post.scss";
</style>

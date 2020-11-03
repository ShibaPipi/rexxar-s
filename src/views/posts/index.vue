<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row
        type="flex"
        justify="center"
        class="post-list rexxar-fade-in"
      >
        <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="14">
          <template v-if="list">
            <post-box
              v-for="post in list"
              :key="post.id"
              :post-id="post.id"
              :title="post.title"
              :published-at="post.published_at"
              :comments-count="post.comments_count"
              :content-limit="post.content_limit"
              :user="post.user"
            />
          </template>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
            :current-page="page"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { fetchList } from '@/api/post'
import PostBox from '@/components/PostBox'

export default {
  name: 'Posts',
  components: { PostBox },
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

.blog-content .post-list {
  max-width: 820px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>

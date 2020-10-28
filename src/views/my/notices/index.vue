<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row
        type="flex"
        justify="center"
        class="rexxar-fade-in"
      >
        <el-col :span="16">
          <el-timeline>
            <el-timeline-item
              v-for="notice in list"
              :key="notice.id"
              class="rexxar-fade-in"
              :timestamp="notice.created_at"
              placement="top"
            >
              <el-card>
                <h4>{{ notice.title }}</h4>
                <p>{{ notice.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button
            type="text"
            size="small"
            class="load-more-btn"
            :disabled="disabled"
            :loading="loading"
            @click="getList"
          >{{ loadMoreBtnText }}</el-button>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { fetchNoticeList } from '@/api/my'

export default {
  name: 'MyNotices',
  data() {
    return {
      loading: false,
      listLoading: false,
      list: [],
      page: 1,
      noMore: false,
      loadMoreBtnText: '加载更多...'
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      if (this.page === 1) {
        this.listLoading = true
      } else {
        this.loading = true
      }
      const { data } = (await fetchNoticeList(this.page)).data
      if (data.length === 0) {
        this.noMore = true
        this.loadMoreBtnText = '没有更多了^_^'
      } else {
        this.list = this.list.concat(data)
        this.page += 1
      }
      this.loading = false
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/post.scss";
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .blog-content {
    .load-more-btn {
      margin: 0 auto;
      font-size: 14px;
      color: $themeTail;
    }
  }
</style>

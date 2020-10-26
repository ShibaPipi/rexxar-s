<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <span-loading v-if="listLoading" />
      <el-row
        v-else
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
      <el-row type="flex">
        <el-col>
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
import SpanLoading from '@/components/SpanLoading'
import { fetchList } from '@/api/notice'

export default {
  name: 'Notices',
  components: { SpanLoading },
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
      const { data } = (await fetchList(this.page)).data
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

  .el-col {
    .load-more-btn {
      margin: 0 auto;
      font-size: 14px;
      color: $themeTail;
    }
  }
</style>

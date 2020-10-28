<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <div class="post-list rexxar-fade-in">
        <div
          v-for="post in list"
          :key="post.id"
          class="item"
        >
          <div class="media">
            <div class="media-body">
              <h3 class="blog-title">
                <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
              </h3>
              <div class="meta">
                <span class="date divide">发布于 {{ post.published_at }}</span>
                <span class="author divide">BY {{ post.user.name }}</span>
                <span class="time divide">5 min read</span>
                <span class="comment"><router-link to="">{{ post.comments_count }} comments</router-link></span>
              </div>
              <div class="intro">{{ post.content_limit }}</div>
              <router-link :to="'/posts/' + post.id" class="more-link">Read more →</router-link>
            </div>
          </div>
        </div>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page="page"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { fetchList } from '@/api/post'

export default {
  name: 'Posts',
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

  .blog-content {
    .post-list {
            max-width: 820px;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;

            .item {
                margin-bottom: 3rem;

                .media {
                    display: flex;
                    align-items: flex-start;

                    .media-body {
                        flex: 1;

                        .blog-title {
                            font-size: 1.275rem;
                            margin-bottom: .25rem;

                            a {
                                color: #292929;
                            }
                        }

                        .meta {
                            color: #8f8f8f;
                            font-size: 0.8125rem;
                            margin-bottom: .25rem;

                            span {
                                display: inline-block;

                                a {
                                    color: #292929;
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

                        .intro {
                            font-size: .875rem;;
                        }

                        .more-link {
                            font-size: .8125rem;
                        }
                    }
                }
            }
        }
  }
</style>

<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="14">
          <author-box
            :name="name"
            :avatar="avatar"
            :introduction="introduction"
            :posts-count="posts_count"
            :followers-count="followers_count"
            :stars-count="stars_count"
            :self="true"
            border="border-left"
          />
          <el-tabs
            v-model="activeName"
            class="author-tab"
            @tab-click="handleClick"
          >
            <el-tab-pane label="文章" name="posts">
              <template v-if="postList.length">
                <post-box
                  v-for="post in postList"
                  :key="post.id"
                  :post-id="post.id"
                  :title="post.title"
                  :published-at="post.published_at"
                  :comments-count="post.comments_count"
                  :content-limit="post.content_limit"
                  :user="post.user"
                />
              </template>
              <no-data v-else />
            </el-tab-pane>
            <el-tab-pane label="关注" name="follows">
              <template v-if="followerList.length">
                <author-box
                  v-for="follower in followerList"
                  :key="follower.id"
                  :name="follower.name"
                  :avatar="follower.avatar_src"
                  :introduction="follower.introduction"
                  :posts-count="follower.posts_count"
                  :followers-count="follower.followers_count"
                  :stars-count="follower.stars_count"
                  :self="true"
                  border="border-bottom"
                />
              </template>
              <no-data v-else />
            </el-tab-pane>
            <el-tab-pane label="粉丝" name="followers">
              <template v-if="starList.length">
                <author-box
                  v-for="star in starList"
                  :key="star.id"
                  :name="star.name"
                  :avatar="star.avatar_src"
                  :introduction="star.introduction"
                  :posts-count="star.posts_count"
                  :followers-count="star.followers_count"
                  :stars-count="star.stars_count"
                  :self="true"
                  border="border-bottom"
                />
              </template>
              <no-data v-else />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import AuthorBox from '@/components/AuthorBox'
import PostBox from '@/components/PostBox'
import NoData from '@/components/Nodata'
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/my'

export default {
  name: 'MyInfo',
  components: { AuthorBox, PostBox, NoData },
  data() {
    return {
      activeName: 'posts',
      posts_count: 0,
      followers_count: 0,
      stars_count: 0,
      postList: [],
      followerList: [],
      starList: []
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'introduction'])
  },
  created() {
    this.getInfo()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    async getInfo() {
      const {
        data: {
          posts_count,
          followers_count,
          stars_count,
          posts,
          followers,
          stars
        }
      } = await getInfo()
      this.posts_count = posts_count
      this.followers_count = followers_count
      this.stars_count = stars_count
      this.postList = posts
      this.followerList = followers
      this.starList = stars
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/post.scss";

.blog-content {

  .author-tab {
    margin: 1.25rem 0;
    padding: 2rem;
  }
}
</style>

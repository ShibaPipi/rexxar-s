<template>
  <div class="main-wrapper">
    <section class="blog-content">
      <el-row class="rexxar-fade-in" type="flex" justify="center">
        <el-col :xs="22" :sm="18" :md="16" :lg="12" :xl="12" class="blog-post">
          <article>
            <div class="post-header">
              <h1 class="post-title">{{ title }}</h1>
              <div class="post-byline">
                <avatar
                  :size="36"
                  :src="user.avatar"
                  :name="user.name"
                  :space="8"
                />
                <span class="divide">
                  <router-link to="">{{ user.name }}</router-link>
                </span>
                <span class="divide">{{ published_at }}</span>
                <span class="divide"><svg-icon icon-class="like" /> {{ likes_count }}</span>
                <span>
                  <router-link to="#comments"><svg-icon icon-class="comment" /> {{ comments_count }}</router-link>
                </span>
              </div>
            </div>
            <div class="post-content" v-html="content" />
            <author-box
              :name="user.name"
              :avatar="user.avatar"
              :introduction="user.introduction"
              border="border"
            />
            <div class="post-meta">
              <div class="post-categories">
                <span class="label">Topics</span>
                <router-link to="">Social Media</router-link>
              </div>
              <div class="post-tags">
                <ul>
                  <li>
                    <router-link to="">blogging</router-link>
                  </li>
                  <li>
                    <router-link to="">social media</router-link>
                  </li>
                  <li>
                    <router-link to="">twitter</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <section class="comments">
            <div id="comments" class="comments-number">
              <h2>{{ comments_count }} Comments </h2>
            </div>
            <ol class="comment-list">
              <li
                v-for="comment in comments"
                :key="comment.id"
                class="comment even thread-even depth-1"
              >
                <article class="comment">
                  <div class="comment-author">
                    <img
                      alt="Shibapipi"
                      src="@/assets/logo.jpg"
                      width="36"
                      height="36"
                    >
                    <span class="author-name">{{ comment.user.name }}</span>
                  </div>
                  <div class="comment-content">
                    <p>{{ comment.content }}</p>
                  </div>
                  <!-- <div class="comment-footer">
                    <a class="comment-reply-link" href="">Reply</a>
                  </div> -->
                </article>
                <!-- <ul class="children">
                  <li class="comment">
                    <article class="comment">
                      <div class="comment-author">
                        <img alt="Shibapipi" src="" class="avatar photo" loading="lazy">
                        <span class="author-name"><a href="" class="url">Shibapipi</a></span>
                      </div>
                      <div class="comment-content">
                        <p>A comment's comment.</p>
                      </div>
                      <div class="comment-footer">
                        <a rel="nofollow" class="comment-reply-link" href="">Reply</a>
                      </div>
                    </article>
                  </li>
                </ul> -->
              </li>
            </ol>
            <div class="comment-respond">
              <div class="comment-reply-title">发表评论</div>
              <form action="" method="post" class="comment-form" novalidate="">
                <p class="comment-form-comment">
                  <label for="comments">
                    <textarea name="comment" cols="45" rows="8" maxlength="65525" required="required" />
                  </label>
                </p>
                <p class="form-submit">
                  <input name="submit" type="submit" class="submit" value="评论">
                </p>
              </form>
            </div>
          </section>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { show } from '@/api/post'
import AuthorBox from '@/components/AuthorBox'
import Avatar from '@/components/Avatar'

export default {
  name: 'PostShow',
  components: { AuthorBox, Avatar },
  data() {
    return {
      id: '',
      title: '',
      content: '',
      published_at: '',
      likes_count: 0,
      comments_count: 0,
      comments: [],
      user: {}
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
      const {
        data: {
          title,
          content,
          published_at,
          likes_count,
          comments_count,
          comments,
          user
        }
      } = await show(this.id)
      this.title = title
      this.content = content
      this.published_at = published_at
      this.likes_count = likes_count
      this.comments_count = comments_count
      this.comments = comments
      this.user = user
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/post.scss";

.blog-content {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  h1, h2, .comment-reply-title, h3, .archive-header h1,
  .search-header h1, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: 700;
  }

  h2, .comment-reply-title, .site-title, .social-media-icons, .header-box .title {
    font-size: 1.3125rem;
    line-height: 1.15;
  }

  ul ul, ol ol, ul ol, ol ul, li li {
    font-size: 1rem;
  }

  ul, ol {
    font-size: 1rem;
    padding: 0;
    margin: 1.5em;
  }

  a {
    color: #262626;
  }

  a:link, a:visited {
    color: #262626;
  }

  textarea {
    width: 100%;
    font-size: 1em;
    font-family: poppins, sans-serif;
    padding: 8px 12px;
    color: #262626;
    border: solid 1px #e0e0e0;
    border-radius: 4px;
    background: #fff;
    -webkit-appearance: none;
  }

  .post-content, .post-meta, .comments, .widget-area-after-post {
    font-size: 1.3125rem;
    line-height: 1.81;
    padding: 0 5.5%;
  }

  .divide:after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8f8f8f;
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    position: relative;
    top: -3px;
  }

  .blog-post {
    margin-top: 1.5rem;
    margin-bottom: 3rem;

    .post-header {
      text-align: center;

      .post-title {
        font-size: 2.375rem;
        line-height: 1.342;
      }

      .post-byline {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.125rem;
        line-height: 1.333;
        margin: 24px 0;

        img {
          border-radius: 50%;
          margin: 0 12px 0 0;
          height: 36px;
          width: 36px;
        }

        a {
          margin-right: 6px;
        }
      }
    }
  }

  .post-categories, .post-tags {
    margin: 24px 0;
  }

  .post-categories {
    font-size: 18px;
    line-height: 1.56;

    a {
      margin-left: 24px;
    }

    .label {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .02rem;
    }
  }

  .post-tags {
    margin: 24px 0;

    ul {
      list-style: none;
      margin: 0;
    }

    li {
      display: inline-block;
    }

    a {
      display: inline-block;
      font-size: 16px;
      line-height: 1.5;
      padding: 6px 12px;
      border: solid 1px #e0e0e0;
      border-radius: 4px;
      text-decoration: none;
      margin: 0 8px 8px 0;
      transition: color .2s, border-color .2s;
    }
  }

  .comments {
    margin-top: 3rem;

    .comments-number {
      margin-bottom: 3rem;
    }

    .comment-list {
      list-style: none;
      margin: 1.5em 0;

      ul {
        list-style: none;
        margin: 2.25rem 0 0;
        border-left: solid 2px #ededed;
        margin-top: 3rem;
        padding-left: 1.5rem;
      }

      li {
        margin-bottom: 3rem;
      }

      .comment-author {
        display: flex;
        align-items: center;

        img {
          border-radius: 50%;
          margin-right: 12px;
        }
      }

      .comment-footer .comment-reply-link {
        display: inline-block;
        font-size: 16px;
        line-height: 1.5;
        padding: 6px 12px;
        border: solid 1px #e0e0e0;
        border-radius: 4px;
        text-decoration: none;
        transition: color .2s, border-color .2s;
      }
    }

    .comment-respond {
      margin-top: 1.5rem;

      input[type=submit], button {
        font-size: .875em;
        line-height: 1.714;
        font-family: poppins, sans-serif;
        font-weight: 700;
        padding: 9px 18px;
        color: #fff;
        background: #262626;
        border: none;
        border-radius: 4px;
        -webkit-appearance: none;
      }
    }
  }
}
</style>

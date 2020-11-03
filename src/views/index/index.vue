<template>
  <div class="index-main-wrapper">
    <!-- <section class="blog-head">
      <div class="head-container">
        <h2 class="blog-heading">DevBlog - A Blog Template Made For Developers</h2>
        <div class="intro">Welcome to my blog. Subscribe and get my latest blog post in your inbox.</div>
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          class="search-form"
        >
          <el-form-item class="form-input">
            <el-input
              ref="keyword"
              v-model="searchForm.keyword"
              placeholder="关键字"
              name="keyword"
              class="form-group"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btn btn-primary"
              @click="onSubmit"
            >Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section> -->
    <section class="blog-content">
      <el-row
        :gutter="30"
        class="rexxar-fade-in"
        type="flex"
        justify="center"
      >
        <el-col :xs="22" :sm="14" :md="14" :lg="12" :xl="10">
          <el-row>
            <el-carousel
              :interval="5000"
              height="350px"
            >
              <el-carousel-item v-for="banner in bannerList" :key="banner">
                <el-image :src="banner" fit="cover">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </el-carousel-item>
            </el-carousel>
          </el-row>
          <el-row>
            <div
              v-for="post in postList"
              :key="post.id"
              class="single-blog-post"
            >
              <div class="post-meta-box">
                <ul class="author-meta">
                  <li
                    v-for="topic in post.topics"
                    :key="topic.id"
                    class="tag"
                  >
                    <router-link to="">{{ topic.name }}</router-link>
                  </li>
                  <li class="date">发布于 {{ post.published_at }}</li>
                  <li class="author">By {{ post.user.name }}</li>
                </ul>
                <h4 class="post-title"><router-link :to="'/posts/' + post.id">{{ post.title }}</router-link></h4>
                <ul class="share-meta">
                  <li>
                    <router-link to=""><i class="el-icon-chat-round icon" />Comments ({{ post.comments_count }})</router-link>
                  </li>
                  <li>
                    <router-link to=""><i class="el-icon-star-off icon" />Likes ({{ post.likes_count }})</router-link>
                  </li>
                  <li>
                    <el-tooltip class="item" effect="dark" content="Share it" placement="right">
                      <button><i class="el-icon-share icon" />Share</button>
                    </el-tooltip>
                  </li>
                </ul>
                <p>{{ post.content_limit }}</p>
                <router-link :to="'/posts/' + post.id" class="more-link">Read more →</router-link>
              </div>
            </div>
          </el-row>

        </el-col>
        <el-col :xs="0" :sm="7" :md="7" :lg="6" :xl="5">
          <div class="sidebar-box bg-box about-me">
            <h6 class="sidebar-title">about me</h6>
            <img src="@/assets/index/founder.jpg" alt="founder image">
            <p>Hi，我是 Shibapipi。在享受编程的同时，更要热爱生活...</p>
          </div>
          <div class="sidebar-box bg-box sidebar-categories">
            <h6 class="sidebar-title">topics</h6>
            <ul>
              <li
                v-for="topic in topicList"
                :key="topic.id"
              ><router-link to="">{{ topic.name }}</router-link></li>
            </ul>
          </div>
          <div class="sidebar-box bg-box sidebar-trending-post">
            <h6 class="sidebar-title">Founder's Post</h6>
            <div
              v-for="founderPost in founderPostList"
              :key="founderPost.id"
              class="single-trending-post clearfix"
            >
              <div class="post">
                <h6>
                  <router-link :to="'/posts/' + founderPost.id">
                    {{ founderPost.title }}
                  </router-link>
                </h6>
                <ul>
                  <li
                    v-for="topic in founderPost.topics"
                    :key="topic.topic_id"
                    class="tag"
                  >
                    <router-link to="">{{ topic.name }}</router-link>
                  </li>
                  <li class="date">{{ founderPost.published_at }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="sidebar-box bg-box sidebar-categories">
            <h6 class="sidebar-title">aphorism</h6>
            <ul>
              <li
                v-for="aphorism in aphorismList"
                :key="aphorism"
              ><router-link to="">{{ aphorism }}</router-link></li>
            </ul>
          </div>
          <div class="sidebar-box bg-box sidebar-tags">
            <h6 class="sidebar-title">Keyword</h6>
            <ul class="clearfix">
              <li
                v-for="keyword in keywordList"
                :key="keyword"
              ><router-link to="">{{ keyword }}</router-link></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { fetch } from '@/api'

export default {
  name: 'Posts',
  data() {
    return {
      loading: false,
      bannerList: [],
      postList: [],
      topicList: [],
      founderPostList: [],
      aphorismList: [],
      keywordList: [],
      searchForm: {
        keyword: ''
      }
    }
  },
  watch: {
    loading: function(val) {
      this.loadingDisplay = val === false ? 'none' : 'block'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const { data: { banners, posts, topics, founderPosts, aphorism, keyword }} = await fetch()
      this.bannerList = banners
      this.postList = posts
      this.topicList = topics
      this.founderPostList = founderPosts
      this.aphorismList = aphorism
      this.keywordList = keyword
      this.loading = false
    },
    onSubmit() {
      this.$message('现在还不能搜索')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .index-main-wrapper {
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
    color: #5e5e5e;
    font-size: 14px;
    position: relative;
    background: #f9f9f9;

    a {
      text-decoration: none;
      display: inline-block;
      color: #5e5e5e;
    }

    h1, h2, h3, h4, h5, h6, p, a, li {
      transition: all .3s ease-in-out;
      -webkit-transition: all .3s ease-in-out;
      -moz-transition: all .3s ease-in-out;
      -o-transition: all .3s ease-in-out;
    }

    h1, h2, h3, h4, h5, h6, p, ul {
      margin: 0;
      padding: 0;
    }

    h2, h3, h4, h5, h6 {
      color: #1b222d;
      font-weight: normal;
    }

    h4 {
      font-size: 20px;
      font-weight: 600;
    }

    h6 {
      font-size: 13px;
      font-weight: 700;
    }

    ul {
      list-style-type: none;
    }

    button {
      border: none;
      outline: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      display: block;
      padding: 0;
      cursor: pointer;
    }

    p {
      line-height: 28px;
    }

    a:hover, a:focus, a:visited {
      text-decoration: none;
      outline: none;
    }

    a:hover {
      color: $themeHead;
    }

    .btn {
      display: inline-block;
      color: #292929;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      background-color: transparent;
      height: 2.75rem;
      border: 1px solid transparent;
      line-height: 1.5;
      border-radius: .25rem;
      font-weight: bold;
      padding: .375rem 1rem;
      transition: all 0.4s ease-in-out;
    }

    .btn-primary {
      color: #fff;
      background-color: $themeHead;
      border-color: $themeTail;
    }

    .blog-head {
      background: #fafafa;
      padding-top: 3rem;
      text-align: center;

      .head-container {

        .blog-heading {
          color: $themeTail;
          font-size: 2rem;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: .5rem;
        }

        .intro {
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
        }

        .search-form {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
          align-items: center;
          padding-top: 1rem;

          .form-input {
            display: flex;
            flex: 0 0 auto;
            flex-flow: row wrap;
            align-items: center;
            margin-right: 0;

            .form-group {
              display: inline-block;
              width: 360px;
              vertical-align: middle;
              border-color: #c2c2c2;
              margin-right: .25rem;

              .el-input__inner {
                height: 2.75rem;
              }
            }
          }
        }
      }
    }

    .blog-content {
      position: relative;
      min-height: 350px;
      margin-top: 3rem;
      padding: 0 1.5rem;

      .single-blog-post {
        margin-bottom: 40px;

        .post-meta-box {
          padding: 40px 22px 45px 35px;
          background: #fff;
          box-shadow: 0px 11px 9px 0px rgba(0, 0, 0, 0.02);

          p {
            padding: 25px 0;
          }

          .author-meta {
            margin: 0 -5px;

            li {
              display: inline-block;
              padding: 0 5px;
              line-height: 25px;
            }

            .tag {

              a {
                background: $themeTail;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #fff;
                padding: 0 12px;
              }
            }

            .date, .author {
              color: $themeHead;
              text-transform: uppercase;
              font-size: 13px;
              cursor: pointer;
            }

            .date:hover, .author:hover {
              color: $themeHead;
            }
          }

          .post-title {

            a {
              text-transform: uppercase;
              margin: 25px 0 15px 0;
            }
          }

          .share-meta {
            margin: 0 -15px;

            li {
              display: inline-block;
              padding: 0 15px;
              font-size: 13px;
              position: relative;

              a {
                color: $themeHead;
                text-transform: uppercase;
                font-weight: 600;
                font-size: 10px;
                letter-spacing: 1.5px;
              }

              a:hover {
                color: $themeHead;
              }

              button {
                color: $themeHead;
                text-transform: uppercase;
                font-weight: 600;
                font-size: 10px;
                letter-spacing: 1.5px;
                background: transparent;
              }

              button:hover {
                color: $themeHead;
              }

              .icon {
                font-size: 12px;
                margin-right: 4px;
                font-weight: normal;
              }

            }
          }

          .more-link {
            color: $themeHead;
            font-size: 13px;
            font-weight: bold;
          }

          .more-link:hover {
            color: $themeHead;
          }
        }
      }

      .sidebar-box {
        padding: 30px 40px 40px 40px;
        margin-bottom: 40px;

        .sidebar-title {
          text-transform: uppercase;
          position: relative;
          letter-spacing: 0.8px;
          padding-left: 20px;
          margin-bottom: 30px;
        }

        .sidebar-title:before {
          background: $themeHead;
          content: '';
          width: 6px;
          height: 6px;
          position: absolute;
          left: 0;
          bottom: 5px;
        }
      }

      .bg-box {
        background: #fff;
        box-shadow: 0px 11px 9px 0px rgba(0, 0, 0, 0.02);
      }

      .about-me {

        img {
          max-width: 100%;
          display: block;
        }

        p {
          font-size: 13px;
          line-height: 24px;
          padding-top: 25px;
        }
      }

      .sidebar-categories {

        ul li {

          a {
            line-height: 42px;
            display: block;
            color: $themeTail;
            border-bottom: 1px solid #f7f7f7;
          }

          a:hover {
            color: $themeHead;
          }
        }
      }

      .single-trending-post {
        margin-bottom: 20px;

        .post {

          h6 a {
            font-weight: 600;
            line-height: 16px;
            color: $themeTail;
            margin: 0 0 8px 0;
          }

          ul {

            li {
              display: inline-block;
              line-height: 15px;
            }

            .tag a {
              background: $themeTail;
              text-transform: uppercase;
              color: #fff;
              padding: 0 10px;
              font-size: 10px;
              margin-right: 5px;
            }
          }
        }
      }

      .sidebar-tags ul {
        margin: 0 -4px;

        li {
          float: left;
          padding: 0 4px;
          margin-bottom: 8px;

           a {
            line-height: 30px;
            font-size: 12px;
            text-transform: uppercase;
            color: #868686;
            letter-spacing: 0.8px;
            padding: 0 15px;
            border: 1px solid rgba(0,0,0,0.06);
          }
        }
      }
    }
  }
</style>

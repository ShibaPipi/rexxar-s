<template>
  <div class="item">
    <div class="media">
      <div class="media-body">
        <h3 class="blog-title">
          <router-link :to="'/posts/' + postId">{{ title }}</router-link>
        </h3>
        <div class="meta">
          <span class="date divide">发布于 {{ publishedAt }}</span>
          <span class="author divide">BY {{ user.name }}</span>
          <span class="time divide">5 min read</span>
          <span class="comment">
            <router-link to="">{{ commentsCount }} comments</router-link>
          </span>
        </div>
        <div class="intro">{{ contentLimit }}</div>
        <router-link :to="'/posts/' + postId" class="more-link">Read more ↑</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostBox',
  props: {
    postId: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    publishedAt: {
      type: String,
      default: ''
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    contentLimit: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: function() {
        return {
          name: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
        float: right;
        padding-top: .5rem;
        font-size: .75rem;
      }
    }
  }
}
</style>

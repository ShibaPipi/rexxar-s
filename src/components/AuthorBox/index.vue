<template>
  <div class="author-box" :style="(border !== '') ? `${border} : solid 3px #ededed;` : ''">
    <div class="header">
      <div class="avatar-container">
        <avatar
          :size="60"
          :src="avatar"
          :name="name"
          :space="10"
        />
      </div>
      <router-link to="" /><span>{{ name }}</span>
    </div>
    <p class="bio">{{ introduction }} </p>
    <div class="profile">
      <span class="divide">文章&nbsp;{{ postsCount }}</span>
      <span class="divide">关注&nbsp;{{ followersCount }}</span>
      <span>粉丝&nbsp;{{ starsCount }}</span>
    </div>
    <ul v-if="!self" class="social-media-icons">
      <li>
        <svg-icon icon-class="follow" />
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'AuthorBox',
  components: { Avatar },
  props: {
    name: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    introduction: {
      type: String,
      default: ''
    },
    postsCount: {
      type: Number,
      default: 0
    },
    followersCount: {
      type: Number,
      default: 0
    },
    starsCount: {
      type: Number,
      default: 0
    },
    self: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.author-box {
  position: relative;
  border-radius: 4px;
  padding: 24px 24px 0;
  margin: 1.5rem;
  font-size: 1.25rem;
  line-height: 1.56;

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    margin: 1.5rem 0;
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

  .header {
    display: flex;
    align-items: center;

    span {
      margin-left: 12px;
    }
  }

  .avatar-container {
    float: left;
    line-height: 0;
  }

  .profile {
    font-size: 1rem;
    line-height: 1.333;
    padding: .75rem;
  }

  .social-media-icons {
    position: absolute;
    top: 24px;
    right: 24px;
    text-align: right;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      margin-right: 12px;
      text-align: center;
      border: solid 1px #e0e0e0;
      border-radius: 50%;
      transition: color .2s, border-color .2s;
      font-size: 16px;
      line-height: 1;
      width: 36px;
      height: 36px;
      padding: 8px;
    }
  }
}
</style>

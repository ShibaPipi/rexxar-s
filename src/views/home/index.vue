<template>
  <div class="wrapper">
    <div class="home">
      <canvas id="sakura" />
      <let-it-snow
        v-bind="snowConf"
        :show="show"
      />
      <div class="content">
        <github-corner class="github-corner" />
        <div class="home-header">
          <router-link class="link" to="/index">
            <img class="home-logo" src="@/assets/logo.jpg" alt="logo">
          </router-link>
        </div>
        <div class="home-body">
          <div class="list">
            <router-link class="link" to="/index">{{ $t('home.enter') }}</router-link>
            <lang-select class="lang-select" />
          </div>
          <div class="motto">{{ $t('home.motto') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LetItSnow from 'vue-let-it-snow'
import GithubCorner from '@/components/GithubCorner'
import LangSelect from '@/components/LangSelect'
import { init as sakura } from '@/utils/sakura'

export default {
  name: 'Home',
  components: {
    LetItSnow,
    GithubCorner,
    LangSelect
  },
  data() {
    return {
      snowConf: {
        windPower: 2,
        speed: 2,
        count: 20,
        size: 10,
        opacity: 1,
        images: [
          'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
          'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
          'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png'
        ]
      },
      show: false
    }
  },
  mounted() {
    if (Math.random() > 0.5) {
      sakura()
      this.show = false
    } else {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .wrapper {
    background: $themeHead;
    background: -moz-radial-gradient(center,ellipse cover,$themeHead 0,$themeTail 100%);
    background: -webkit-gradient(radial,center center,0,center center,100%,color-stop(0,$themeHead),color-stop(100%,$themeTail));
    background: -webkit-radial-gradient(center,ellipse cover,$themeHead 0,$themeTail 100%);
    background: -o-radial-gradient(center,ellipse cover,$themeHead 0,$themeTail 100%);
    background: -ms-radial-gradient(center,ellipse cover,$themeHead 0,$themeTail 100%);
    background: radial-gradient(ellipse at center,$themeHead 0,$themeTail 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#{$themeHead},endColorstr=#{$themeTail},GradientType=1);
    padding: 0;
    text-align: center;
    font-family: open sans;
    position: relative;
    margin: 0;
    padding-bottom: 50px;
    height: 100%;

    .home {
      position: fixed;
      left: 0;
      top: 0;

      .content {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        font-size: 20px;
        text-align: center;
        padding-top: 10%;

        .github-corner {
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        }

        .home-logo {
          width: 220px;
          border-radius: 50%;
          animation: zoom-in-out 3s;
          -moz-animation: zoom-in-out 3s; /* Firefox */
          -webkit-animation: zoom-in-out 3s; /* Safari and Chrome */
          -o-animation: zoom-in-out 3s; /* Opera */
          animation-iteration-count: infinite;
        }

        .home-header {
          min-height: 220px;

          .link {
            display: block;
          }
        }

        .home-body {
          padding-top: 20px;

          .list {
            .link {
              display: inline-block;
              padding: 20px;
              color: #fff;
              font-size: 20px;
              min-width: 80px;
            }

            .link:hover {
              color: rgb(155, 35, 35);
            }

            .lang-select{
              color: #fff;
              font-size: 16px;
            }
          }
        }

        .motto {
          padding-top: 20px;
          color: #fff;
          font-size: 25px;
          animation: zoom-in-out 3s;
          -moz-animation: zoom-in-out 3s; /* Firefox */
          -webkit-animation: zoom-in-out 3s; /* Safari and Chrome */
          -o-animation: zoom-in-out 3s; /* Opera */
          animation-iteration-count: infinite;
        }
      }
    }
  }

  @keyframes zoom-in-out {
    0% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
    25% {
      transform: rotate(0deg) scale(1, 1);
      opacity: 0.8;
    }
    100% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
  }

  @-moz-keyframes zoom-in-out {
    0% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
    25% {
      transform: rotate(0deg) scale(1, 1);
      opacity: 0.8;
    }
    100% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
  }

  @-webkit-keyframes zoom-in-out {
    0% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
    25% {
      transform: rotate(0deg) scale(1, 1);
      opacity: 0.8;
    }
    100% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
  }

  @-o-keyframes zoom-in-out {
    0% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
    25% {
      transform: rotate(0deg) scale(1, 1);
      opacity: 0.8;
    }
    100% {
      transform: rotate(0deg) scale(0.8, 0.8);
      opacity: 1;
    }
  }
</style>

<template>
  <div class="loading-mask" :style="'position: ' + position + ';'">
    <div class="loading-spinner">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpanLoading',
  props: {
    position: {
      type: String,
      default: 'absolute'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .loading-mask {
    position: fixed;
    z-index: 2000;
    background-color: hsla(0, 0%, 100%, .8);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    overflow: hidden;
    transition: all .3s ease-in-out;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;

    .loading-spinner {
      position: absolute;
      left: 50%;
      margin-left: -25px;
      top: 50%;
      transform: translateY(-50%);

      span {
        background: $themeTail;
        display: block;
        bottom: 0px;
        width: 6px;
        height: 5px;
        position: absolute;
        animation: preloader 1.5s infinite ease-in-out;
      }

      span:nth-child(2) {
        left:11px;
        animation-delay: .2s;
      }

      span:nth-child(3) {
        left: 22px;
        animation-delay: .4s;
      }

      span:nth-child(4) {
        left: 33px;
        animation-delay: .6s;
      }

      span:nth-child(5) {
        left: 44px;
        animation-delay: .8s;
      }

      @keyframes preloader {
        0% {
          height:5px;
          transform:translateY(0px);
        }

        25% {
          height:30px
          ;transform:translateY(15px);
        }

        50% {
          height:5px;
          transform:translateY(0px);
        }

        100% {
          height:5px;
          transform:translateY(0px);
        }
      }
    }
  }

  @keyframes preloader {
    0% {
      height: 5px;
      transform: translateY(0px);
    }

    25% {
      height: 30px;
      transform: translateY(15px);
    }

    50% {
      height: 5px;
      transform: translateY(0px);
    }

    100% {
      height: 5px;
      transform: translateY(0px);
    }
  }
</style>

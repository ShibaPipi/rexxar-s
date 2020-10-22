<template>
  <div class="switcher">
    <div class="switch-btn">
      <button @click="drawer = true">
        <svg
          class="svg-inline--fa fa-cog fa-w-16 fa-spin"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="cog"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          data-fa-i2svg=""
        >
          <path fill="currentColor" d="M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z" />
        </svg>
      </button>
    </div>
    <el-drawer
      custom-class="switch-menu"
      :modal="false"
      size="220px"
      :visible.sync="drawer"
      :with-header="false"
      direction="ltr"
    >
      <h5 class="title">Settings Switcher</h5>
      <!-- Theme color changer -->
      <div class="switcher-container">
        <h5>Color Skins</h5>
        <ul id="styleOptions" title="Switch Color" class="clearfix">
          <li><a href="javascript: void(0)" data-theme="color" class="color1" /></li>
          <li><a href="javascript: void(0)" data-theme="color-2" class="color2" /></li>
          <li><a href="javascript: void(0)" data-theme="color-3" class="color3" /></li>
          <li><a href="javascript: void(0)" data-theme="color-4" class="color4" /></li>
          <li><a href="javascript: void(0)" data-theme="color-5" class="color5" /></li>
          <li><a href="javascript: void(0)" data-theme="color-6" class="color6" /></li>
          <li><a href="javascript: void(0)" data-theme="color-7" class="color7" /></li>
          <li><a href="javascript: void(0)" data-theme="color-8" class="color8" /></li>
          <li><a href="javascript: void(0)" data-theme="color-9" class="color9" /></li>
          <li><a href="javascript: void(0)" data-theme="color-10" class="color10" /></li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .switcher {
    position: fixed;
    top: 70%;
    z-index: 9999;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;

    a:hover, a:focus, a:visited {
      text-decoration: none;
      outline: none;
    }

    #styleOptions {
      padding: 0;
      margin: 0 -5px;

      li {
        float: left;
        width: 20%;
        padding: 0 5px;
        height: 32px;
        margin-bottom: 10px;

        a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .color1 {
          background: $themeTail;
        }

        .color2 {
          background: #1c9ce5;
        }

        .color3 {
          background: #0fdad0;
        }

        .color4 {
          background: #4ebf80;
        }

        .color5 {
          background: #ff6a5d;
        }

        .color6 {
          background: #5580e9;
        }

        .color7 {
          background: #2da731;
        }

        .color8 {
          background: #be9656;
        }

        .color9 {
          background: #cc2d6f;
        }

        .color10 {
          background: #f7892f;
        }
      }
    }

    .switch-btn {
      position: absolute;
      right: -40px;
      z-index: -1;

      button {
        box-shadow: none;
        display: block;
        padding: 0;
        cursor: pointer;
        background: $themeTail;
        width: 40px;
        height: 35px;
        border: none;
        color: #fff;
        font-size: 18px;
        outline: none;

        .svg-inline--fa {
          display: inline-block;
          font-size: inherit;
          height: 1em;
          overflow: visible;
          vertical-align: -.125em;
        }
      }
    }

    .switch-menu {
      width: 220px;
      background: #3e3e3e;
      position: relative;
      padding-bottom: 20px;

      h5 {
        font-weight: normal;
      }

      .title {
        background: $themeTail;
        margin: 0 0 10px 0;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #fff;
      }

      .switcher-container {
        padding: 0 10px;

        h5 {
          color: #fff;
          font-size: 15px;
          text-align: center;
          margin-bottom: 15px;
        }
      }
    }
  }
</style>

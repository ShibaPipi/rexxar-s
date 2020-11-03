<template>
  <footer class="layout-footer">
    <div class="footer-container">
      <div class="logo">
        <router-link to="/">
          <h1>REXXAR</h1>
        </router-link>
      </div>
      <p class="footer-text">BLOG REXXAR BY SHIBAPIPI</p>
      <ul>
        <li><a href="#"><i class="el-icon-coffee" /></a></li>
        <li><a href="#"><svg-icon icon-class="wechat" /></a></li>
        <li><a href="#"><svg-icon icon-class="qq" /></a></li>
        <li><a href="#"><svg-icon icon-class="bug" /></a></li>
      </ul>
      <p class="copyright">
        <span>Copyright © 2020 All rights reserved.</span>
        <span>-</span>
        <span>津 ICP 备 19011078 号</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $themeHead: $dewberryHead;
  $themeTail: $dewberryTail;

  .layout-footer {
    text-align: center;
    background: #fff;
    padding: 60px 0 20px 0;

    .footer-container {

      p {
        margin: 0;
        padding: 0;
        line-height: 28px;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          display: inline-block;

          a {
            font-size: 15px;
            margin: 0 12px;
            text-decoration: none;
            display: inline-block;
            color: $themeTail;
          }

          a:visited {
            text-decoration: none;
            outline: none;
          }
        }
      }

      .logo {

        h1 {
          color: $themeTail;
          font-size: 3rem;
          font-weight: bold;
        }
      }

      .footer-text {
        font-size: 11px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        padding: 5px 0 25px 0;
      }

      .copyright {
        margin-top: 30px;
        font-size: 13px;

        span {
          display: inline;
          margin-right: 20px;
        }
      }
    }
  }
</style>

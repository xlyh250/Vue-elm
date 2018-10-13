<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';

  @keyframes tipMove
    0%
      transform: scale(1)
    35%
      transform: scale(.8)
    70%
      transform: scale(1.1)
    100%
      transform: scale(1)

  .alert_container
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .5)
    .tip_text_container
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -0.9rem
      margin-left: -1.1rem
      width: 60%
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      padding-top: 0.2rem
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px
      .tip_icon
        width: 0.55rem
        height: 0.55rem
        border: 2px solid #f8cb86;
        border-radius: 50%;
        font-size 0.2rem
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span:nth-of-type(1)
          width: 0.02rem
          height: 0.3rem
          background-color: #f8cb86;
        span:nth-of-type(2)
          width: 2px
          height: 2px
          border: 1px;
          border-radius: 50%;
          margin-top: 2px
          background-color #f8cb86
      .tip_text
        font-size 0.14rem
        color #333
        line-height 0.2rem
        text-align center
        margin-top 0.1rem
        padding 0 0.05rem
      .confrim
        font-size 0.18rem
        font-weight bold
        margin-top 0.1rem
        background-color #4cd964
        width 100%
        text-align center
        line-height 0.35rem
        border 1px
        color #fff
        border-bottom-left-radius 0.05rem
        border-bottom-right-radius 0.05rem
</style>

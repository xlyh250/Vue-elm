<template>
   <div>
        <div class="wrap" v-show="Logoutalert">
                <template name="slotA" class="slota">
                    <slot></slot>
                 </template>
                <div class="container">
                        <span @click="cancel">取消</span>
                        <span @click="sure" class="sure">确认</span>
                </div>
        </div>
   </div>
</template>

<script>
export default {
   data () {
      return {
      };
   },
   props:{
     Logoutalert:Boolean
   },
   components: {
      
   },

   computed: {

   },

   methods: {
        sure() {
           this.$emit('choseThis')
        },
        cancel() {
            this.$emit('cancelThis')    
        }
   }
}

</script>
<style scoped lang="stylus">
    @keyframes tipMove
      0%
         transform: scale(1)
      35%
         transform: scale(1.6)
      70%
         transform: scale(1.3)
      100%
         transform: scale(1)

    .wrap
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200000000;
        background: rgba(0, 0, 0, .5)
        display flex
        justify-content center
        align-items center
        .slota
          display flex
          color red
        .container
                width 66%
                height 30%
                margin-bottom 0.6rem
                background #ffffff
                display flex
                align-items flex-end
                justify-content space-around
                font-size 0.17rem
                animation: tipMove .4s;
                border-radius 20px
                position absolute
             span
                 display block
                 padding 0.2rem
                 border-top 1px solid #ddd
                 border-right 1px solid #ddd
                 width 50%
                 height 0.2rem
                 line-height 0.2rem
                 text-align center
             span:nth-child(2)
                 border-right none
            .text
                position absolute
                left 20%
                top 35%
                z-index 999
                animation: tipMove .4s;
                width 60%
                height 25%
                display flex
                justify-content center
                align-items center
</style>
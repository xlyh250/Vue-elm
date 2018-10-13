<template>
   <div class="order">
       <div class="order_top">订单列表</div>
       <div class="order_list" v-if="!user_info._id">
                <div>
                   登陆后可查看
                </div>
       </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   data () {
      return {

      };
   },

   components: {

   },

   computed: {
        ...mapState(['user_info'])
   },


   methods: {

   }
}

</script>
<style scoped lang="stylus">

 .order
     color none
     height 100%
     .order_top
         width 100%
         height .6rem
         line-height .6rem
         font-size .25rem
         background #0085ff
         text-align center
         color #fff
     .order_list
         display flex
         width 100%
         height 6rem
         justify-content center
         align-items center
         div
          width 1.2rem
          line-height .4rem
          height .4rem
          background #0085ff
          color #fff
          font-weight bold
          font-family serif
          text-align center
          border-radius 5px
          box-shadow 0 0 50px inset rgb(33, 198, 243)
          margin-bottom .3rem
</style>
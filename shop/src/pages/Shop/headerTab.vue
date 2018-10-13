<template>
   <div>
        <div class="headerTab">
               <div>
                   <router-link to="/shop/goods" :class="{on:this.$router.path==='/shop/goods'?true:false}" replace> 点餐</router-link>
                   </div>
             <div>
                  <router-link to="/shop/ratings" replace>评价</router-link>
                 </div> 
                 <div>
                     <router-link to="/shop/info" replace>商家</router-link>
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

  
created() {
},
   components: {},

   computed: {},

   methods: {}
}

</script>
<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
      
     .headerTab
        width 100%
        box-sizing border-box
        display flex
        justify-content space-around
        font-weight bold
        position fixed
        top 1.78rem
        left 0
        z-index 6666
        background #fff
        bottom-border-1px(#f0f0f0)
        >div
            >a
             align-self stretch
             display block
             width auto
             height 0.4rem
             line-height 0.4rem
             &.on
              border-bottom 2px solid #000
</style>
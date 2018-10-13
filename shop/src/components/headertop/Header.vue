<template>
   <div class="herdertop">
       <div class="search">
            <router-link to="/Search"><span class="iconfont icon-sousuo"></span>  
            </router-link>
             <span class="address" title="">{{address.name}}</span>
              <span class="loginReg">{{!user_info._id ? '登录|注册': '已登录'}}</span>
       </div>
   </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
   data () {
      return {
      };
   },

   components: {},

   computed: {
            // 获取数据
        ...mapState(['address','user_info'])
   },

   methods: {}
}

</script>
<style scoped lang="stylus">
   @import "../../common/stylus/mixins.styl"
 .herdertop >>> .iconfont
                         font-size 0.25rem
                         color #000
    .herdertop
              bottom-border-1px(#e4e4e4)
              position fixed
              top 0
              left 0
              z-index 66
              height 0.5rem
              line-height 0.5rem
              font-size 0.18rem
              background $color
              width 100%
              text-align center
              .search
                     display flex
                     justify-content space-around
                     a
                      flex 0.5
                     .address
                             overflow hidden
                             text-overflow ellipsis
                             white-space nowrap 
                             flex 1
                     .loginReg
                             flex 1         
                                        
                          

</style>



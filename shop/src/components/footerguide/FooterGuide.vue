<template>
       <div class="footer">
           <ul>
               <li><router-link to="/" exact><span>首页</span><span class="iconfont icon-shouye"></span></router-link></li>
               <li><router-link to="/Search"><span>搜索</span><span class="iconfont icon-sousuo"></span></router-link></li>
               <li><router-link to="/Order"><span>订单</span><span class="iconfont icon-dingdan"></span></router-link></li>
               <li><router-link to="/profile"><span v-show="isLogin">登录</span><span v-show="!isLogin">我的</span><span class="iconfont icon-denglu"></span></router-link></li>
           </ul>
       </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   data () {
      return {
          b:true
      };
   },
   props:{
    //    isLogin:{
    //         type:Boolean,
    //         default:true
    //    }
   },

   components: {
   },

   computed: {
       ...mapState(['user_info']),
       isLogin() {
           if(this.user_info._id){
              return this.b = false
           }
           return this.b
       }
   },
   created() {
   },

   methods: {}
}

</script>
<style scoped lang="stylus">
   @import "../../common/stylus/mixins.styl"
   .footer >>> .iconfont
                        font-size 0.25rem                  
     .footer
        top-border-1px(#e4e4e4)
        position fixed
        bottom 0
        left 0
        z-index 999999
        height 0.6rem        
        text-align center
        background #ffffff
        width 100%
        ul
          display flex
          width 100%
          li 
            flex 1
            a 
             height 0.6rem
             display block
             display flex
             flex-direction column
             justify-content center
             &.on
                 color red
             span 
                 font-size 0.18rem
                 padding 0.03rem 0
          
</style>
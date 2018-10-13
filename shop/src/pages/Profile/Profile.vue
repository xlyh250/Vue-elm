<template>
   <div class="profile">
       <div class="top_header">
           <div class="top">
               <div class="my">我的</div>
               <div class="top_bottom">
                    <div class="user_img">
                       
                        <i class="iconfont icon-denglu"></i>
                    </div>
                    <div>
                         <router-link :to="user_info._id ? '/userinfo': '/login'" class="profile-link">
                        <span v-if="!user_info.phone">{{user_info.name||"登录或者注册"}}</span>
                        <span >{{user_info.phone||'无手机号'}}</span>
                        </router-link>
                    </div>
                       
                    <div class="jiantou">
                        <i class="iconfont icon-xiayibu"></i>
                    </div>
               </div>
           </div>
           <div class="header">
                <div><p class="my_balance">0.00元</p><span>我的余额</span> </div>
                <div><p class="my_integral">0个</p><span>我的优惠</span></div>
                <div><p class="my_discount">0分</p><span>我的积分</span></div>
           </div>
       </div>
       <div class="list">
           <ul>
               
               <li><span><i class="iconfont icon-dingdan"></i>我的订单</span><i class="iconfont icon-xiayibu"></i></li>
               <li><span><i class="iconfont icon-jifen"></i>积分商城</span><i class="iconfont icon-xiayibu"></i></li>
               <li><span><i class="iconfont icon-waimai"></i>外卖卡</span><i class="iconfont icon-xiayibu"></i></li>
               <li v-show="user_info._id" @click="confim"><span><i class="iconfont icon-fuwuzhongxin"></i>退出</span>
               <i class="iconfont icon-xiayibu"></i></li>
           </ul>
          
       </div>
    <logout-alert :Logoutalert="Logoutalert" @choseThis="choseThis" @cancelThis="cancelThis">
         <div name="slotB">
                 <div class="text">确认要退出？</div>
            </div>
    </logout-alert>
   </div>
</template>

<script>
import {mapState} from 'vuex'
import logoutAlert from '@/components/logoutAlert/logoutAlert';
export default {
   data () {
      return {
       Logoutalert:false         
      };
   },

   components: {
       logoutAlert
   },
   created() {
       
   },

   computed: {
       ...mapState(['user_info'])
   },


   methods: {
       confim() {
            this.Logoutalert = true
       },
       choseThis() {
            this.Logoutalert = false
            this.$router.replace('/login')
            this.$store.dispatch('logout')
       },
       cancelThis() {
            this.Logoutalert = false
       }
   }
}

</script>
<style scoped lang="stylus">
 @import '../../common/stylus/mixins.styl';
  .profile
      background #f0f0f0
      width 100%
      height 100%
    .top_header

         .top
             background $color
             height 2rem
             display flex
             flex-direction column
             align-items center
             justify-content space-between
         .my
           font-size 0.19rem
           border-bottom 2px solid #000
           padding .1rem
           width 100%
           height 0.3rem
           line-height 0.3rem
           text-align center
          .top_bottom
              display flex
              width 100%
              height 1.5rem
              justify-content space-between
              align-items center
              margin-left .1rem
              >div
                  flex 1
                  .profile-link
                      display flex
                      flex-direction column
                      justify-content space-around
                      align-items flex-start
                      font-size .19rem
                      color #fff
                      width 1.7rem
                      span
                          padding .1rem
              .user_img
                  display flex
                  justify-content center
                  align-items center
                  border 1px solid #000
                  border-radius 50%
                  background #fff
                  height auto
                  width auto
                  .icon-denglu
                     font-size .5rem
                     padding .2rem 0
              .jiantou
                  display flex
                  justify-content flex-end
                  padding-left .1rem
                  .icon-xiayibu
                     font-size .2rem
                     margin-right .1rem
                     
         .header
            display flex
            width 100%
            height auto
            background #fff
            bottom-border-1px(#f0f0f0)
            div
               flex 1
               border-left 1px solid #fff
               height 1.1rem
               display flex
               flex-direction column
               align-items center
               justify-content center
            .my_balance
                  font-size .3rem
                  color #FFD700
                  padding-bottom .1rem
            .my_integral
                  font-size .3rem
                  color #FF3030
                  padding-bottom .1rem
            .my_discount
                  font-size .3rem
                  color #3CB371
                  padding-bottom .1rem
    .list
        background #fff
        font-size .19rem
        height 2rem
        width 100%
        ul
          li
            height .5rem
            width 100%
            line-height .5rem
            justify-content flex-start
            bottom-border-1px(#D4D4D4)
            >i
              float right            
              padding-right .1rem
              color #D1D1D1
            span
              padding-left .1rem
              >i
                padding-right .1rem
                font-size .19rem
           &>li:nth-of-type(1)
            span
                i
                 color red
           &>li:nth-of-type(2)
            span
                i
                 color #98FB98
           &>li:nth-of-type(3)
            span
                i
                 color #00868B
           &>li:nth-of-type(4)
            span
                i
                 color #FFD700


          
</style>
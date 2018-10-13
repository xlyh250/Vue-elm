<template>
   <div class="shopheader" v-if="shopinfo">
          <div class="headerImage" :style="{backgroundImage: `url(${shopinfo.bgImg})`}">
             <div  class="back">
               <i class="iconfont icon-fanhui" @click="$router.back()"></i>
                </div>
               </div>
             
          <div class="headerText" v-if="shopinfo.supports">
              <div class="image_wrap">
                  <img :src='shopinfo.avatar' alt="" class="image">
              </div>
                  <div class="text_wrap">
                    <div>
                        <span style="color:yellow;"><i class="iconfont icon-pinpai"></i></span><span>{{shopinfo.name}}</span>
                        <span><i class="iconfont icon-arrow-left-copy" @click="Show"></i></span>
                        <transition name="fade">
                            <div class="shop_details_wrap" ref="showDetails" v-show="show" @click.self="Show">
                                <div class="shop_details">
                                    <div class="title"><span><i></i></span><h4>{{shopinfo.name}}</h4></div>
                                        <p class="ellipsis">{{shopinfo.score}}&nbsp;&nbsp;月销{{shopinfo.sellCount}}
                                            &nbsp;&nbsp;{{shopinfo.description}}&nbsp;约{{shopinfo.deliveryTime}}分钟&nbsp;&nbsp;距离{{shopinfo.distance}}</p>
                                        <b>-公告-</b>
                                    <div class="notice">
                                        <p>{{shopinfo.bulletin}}</p>
                                    </div>
                                </div> 
                            </div>
                        </transition>
                    </div>
                   <div>
                        <p class="ellipsis">{{shopinfo.score}}&nbsp;&nbsp;月销{{shopinfo.sellCount}}
                                            &nbsp;&nbsp;{{shopinfo.description}}&nbsp;约{{shopinfo.deliveryTime}}分钟&nbsp;&nbsp;距离{{shopinfo.distance}}</p>
                  </div>

                  <div id="frist">
                        <span><i class="iconfont icon-shoudan"></i></span>
                       <span class="new_user">{{shopinfo.supports[0].content}}</span>
                       <span><span>{{shopinfo.supports.length}}个优惠</span> <i class="iconfont icon-jiantou" @click="is_Show"></i></span>
                  </div>
               </div>
      </div>
    <transition name="fadein" v-if="shopinfo.supports">
        <div class="footer_wrap" v-show="isShow">
                <div class="footer" ref="footer">
                    <div><i class="iconfont icon-shouqi" @click="is_Show"></i></div>
                    <h3>优惠活动</h3>
                    <nav ref="nav" id="nav">
                        <p >
                            <span><i class="iconfont icon-shoudanyouhui"></i></span><span>{{shopinfo.supports[0].content}}</span>
                        </p>
                        <p>
                            <span><i class="iconfont icon-manjian"></i></span><span>{{shopinfo.supports[1].content}}</span>
                        </p>

                        <p v-for="(item, index) in shopinfo.supports&&shopinfo.supports.slice(2)" :key="index">
                            <span><i class="iconfont icon-tejia"></i></span><span>{{item.content}}</span>
                        </p>
                        
                    </nav>
                    
            </div>
            <div></div>
        </div>
    </transition>  
   
     
   </div>
</template>

<script>
export default {
   data () {
      return {
          show:false,
          isShow:false,
          info:''
      };
   },
    props:{
      shopinfo:{
          type:Object,
          default() {
              return {}
          }
      }
   },
   components: {},
   mounted() {
     
      
   },
   computed: {
       
   },
  
   methods: {
        Show() {
            this.show = !this.show
        },
        is_Show() {
            this.isShow = !this.isShow
        },
        back(){
            
        }
   }
}

</script>
<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"

@keyframes fadein
    0%
      transform: scale(1.5)
    35%
      transform: scale(.3)
    70%
      transform: scale(1.7)
    100%
      transform: scale(1)
 .shopheader
     overflow-x hidden
  .headerImage
        position fixed
        left 0
        top 0
        z-index 999
        width 100%
        max-width 100%
        height 1.3rem
        background-image url('https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png') 
        background-size 100% 2rem
        .back
            position absolute
            left 0.1rem
            top 0.2rem
            z-index 999999999
          .icon-fanhui
              font-size 0.2rem
              color #fff
              width .2rem
              height .3rem
   .headerText
       position absolute
       left 0
       top 0.6rem
       background #fff
       z-index 9999
       width 100%
       max-width 100%
       height 1.2rem
       display flex
       flex-direction column
       align-items center
       .image_wrap
          width 0.7rem
          height 0.7rem
          background #fff
          position absolute
          left 50%
          top -.3rem
          margin-left -0.35rem
          border 1px solid #f0f0f0
          display flex
          justify-content center
          align-items center
          .image
            width 90%
            height 90%
       .text_wrap 
           height 1.3rem
           width 100%
           padding-top .4rem
           display flex
           flex-direction column
           justify-content flex-start
           align-items center
           >div
               width 90%
               text-align center
               padding .04rem 0
               .shop_details_wrap
                   position fixed
                   left 0
                   top 0
                   bottom 0
                   right 0
                   z-index 999999
                   width 100%
                   height 100%
                   background rgba(0,0,0,0.5)
                   display flex
                   justify-content center
                   align-items center
                   transform: translateZ(0)
                   .shop_details
                       background #fff
                       border-radius 5px
                       width 88%
                       padding 0.2rem 0
                       box-shadow 0 0 .1rem #888 inset
                       box-sizing border-box
                       .title
                           display flex
                           width 100%
                           padding .1rem 0
                           height auto
                           line-height .1rem
                           h4
                             width 100%
                             text-align center
                           span
                              display block
                              padding-right .2rem
                              font-size 0.14rem
                              font-size #000
                       >p
                         line-height 0.2rem
                         padding 0.1rem 0
                         width 100%
                         font-weight lighter
                         color #545454 
                       .notice
                         padding 0.1rem
               p
                 font-size 0.14rem
         #frist
           border 1px solid #f0f0f0
           color red
           font-size .14rem
           height 0.15rem 
           line-height 0.15rem
           display flex
           align-items center
           justify-content center
           width 80%  
           .new_user
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
           &>span:nth-child(3)
            display inline-block
            min-width 0.8rem
      .ellipsis
            flex 3
            display inline-block
            color #000
            max-width 98%
     
  .footer_wrap
    position fixed
    left 0
    top 0
    z-index 99999999
    width 100%
    height 100%
    background rgba(0,0,0,0.5)
    display flex
    align-items flex-end
    .footer
        background #FFF
        width 100%
        height 2.1rem
        box-shadow 0 0 .05rem #888
        padding .06rem 0 .15rem 0
        text-align center
        div        
           padding-bottom .15rem
           width 100%
           .icon-shouqi
              font-size 0.22rem
        h3
          padding-bottom 0.15rem
          width 100%
          font-weight bold
        nav
           width auto
           height 1.4rem
           overflow-y auto
           font-size .13rem
           margin-right .15rem
           padding-left 0.25rem
           padding-top .1rem
           p
            height .3rem
            text-align left
            span
               vertical-align top
            >span:nth-child(1)
              margin-right .1rem
              i
               padding .01rem
               color #CD0000
               background  #fff
               flex-weight bold
           >p:nth-child(1)
              
              >span:nth-child(1)
                 color green !important
                 padding 0.01rem 
                 i
                  font-weight bold
                  font-size .18rem
                  vertical-align middle
              >span:nth-child(2)
                 background #FF8C69 !important
                 color #fff
                 padding 0.01rem 
                 height 0.2rem
                 line-height .2rem
           >p:nth-child(2)
             color red
             >span:nth-child(1)
               vertical-align middle 
               color #fff
               i          
                font-weight bold
                font-size .18rem
  
              
.fade-enter-active,.fade-leave-active
        transition opacity .9s
.fade-enter,.fade-leave-to
        opacity 0
              
.fadein-enter-active, .fadein-leave-active {
  transition: all 1s;
}
.fadein-enter, .fadein-leave-active {
  transform: translate3d(0,100%, 0);
}        


</style>
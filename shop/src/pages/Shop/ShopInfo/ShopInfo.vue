<template>
 <div class="abc">

  <nav class="shopinfo_wrap">
     <div class="shopinfo" v-if="shopinfo.supports">
       <h4>配送信息</h4>
       <p><span>{{shopinfo.description}}</span>
       <span>
            由商家配送提供配
           送，约{{shopinfo.deliveryTime}}送达，距离{{shopinfo.distance}}</span></p>
       <p>配送费￥{{shopinfo.deliveryPrice}}</p>
       </div>
       <div class="activity">
          <h4>活动与中心</h4>
        <div class="footer" ref="footer">
            <nav ref="nav" id="nav">
                <p>
                    <span><i class="iconfont icon-shoudanyouhui"></i></span><span>新用户下单立减17元(不与其它活动同享)</span>
                </p>
                <p>
                    <span><i class="iconfont icon-manjian"></i></span><span>满35减19，满65减35</span>
                </p>
                 <p v-for="(item, index) in shopinfo.supports&&shopinfo.supports.slice(2)" :key="index">
                            <span><i class="iconfont icon-tejia"></i></span><span>{{item.content}}</span>
                 </p>
            </nav>
                    
            </div>
       </div>
       <div class="scenery">
           <h4>商家实景</h4>
           <main class="img_wrap">
               <ul ref="imgul">
                   <li v-for="(item, index) in shopinfo.pics" :key="index">
                      <img :src="item" alt="" srcset="">
                    </li>
               </ul>
           </main>
       </div>
       <div class="shop_message">
               <h3>商家信息</h3>
               <h5>无简介</h5>
               <ul>
                   <li><span>品类</span><span>{{shopinfo.category}}</span></li>
                   <li><span>商家电话</span><span>{{shopinfo.phone}}</span></li>
                   <li><span>地址</span><span>{{shopinfo.address}}</span></li>
                   <li><span>营业时间</span><span>{{shopinfo.workTime}}</span></li>
               </ul>
       </div>
  </nav>
 </div>
  
</template>

<script>
import {mapState,mapActions} from 'vuex'
import BScroll from 'better-scroll'
export default {
   data () {
      return {
          res:[],
          info:''
      };
   },

   components: {

   },

   computed: {
       ...mapState(['shopinfo']),
      
   },
   mounted() {
       this.getShopinfo()
       new BScroll('.abc')
          // 如果数据还没有, 直接结束
      if(!this.shopinfo.pics) {
        return
      }

      // 数据有了, 可以创建BScroll对象形成滑动
      this._initScroll()
   },
   methods: {
      ...mapActions(['getShopinfo']),
       _initScroll () {
        // 动态计算ul的宽度
        const ul = this.$refs.imgul
        const liWidth = 2
        const space = 0.2
        const count = this.shopinfo.pics.length
        ul.style.width = (liWidth + space) * count -space + 'rem'
         
        new BScroll('.img_wrap', {
          scrollX: true // 水平滑动
        })
      }
   },
    watch: {
      shopinfo () {// 刷新流程--> 更新数据
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    }

}

</script>
<style scoped lang="stylus">
@import '../../../common/stylus/mixins.styl'
.abc
 height .2rem
 .shopinfo_wrap 
     background #f0f0f0
     padding-bottom .2rem
     height 6rem
     margin-top 1.8rem
     .shopinfo
        padding-left .1rem
        background #fff
        padding-top .15rem
        box-sizing border-box
        border-bottom 1px solid #00000024
        h4
         font-weight bold
        p
         padding-top .2rem
         width 100%
         height .3rem
         line-height .2rem
         font-weight bold
         font-size 0.15rem
         &>span:nth-child(1)
             padding .02rem .05rem
             color #fff
             background #1C86EE
             text-align center
             white-space wrap
             display inline-block
     .activity
         margin-top .1rem
         padding 0.1rem 0 0 0.1rem
         background #ffffff
         h4
           font-weight bold
        .footer
            background #FFF
            width 100%
            height 2.4rem
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
           font-size .13rem
           margin-right .15rem
           padding-top .1rem
           p
            height .3rem
            text-align left
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
                vertical-align top
                font-weight bold
                font-size .18rem
     .scenery
         margin-top 0.2rem
         padding-left 0.2rem
         background #ffffff
         h4
           font-weight bold
           padding-top 0.2rem
         main
           width 100%
           margin-bottom 0.1rem
           ul
             display flex
             flex-direction row
             li
               padding-top .2rem
               height 1.5rem
               width 2rem
               margin-right .1rem
               img
                  height 1.5rem
                  width 2rem
     .shop_message
         padding .2rem .15rem 0 .15rem
         background #fff
         h5
           padding .1rem 0
         ul
           display flex
           flex-direction column
           li
             top-border-1px(#f0f0f0)
             padding .2rem .2rem .2rem 0
             display flex
             justify-content space-between
             align-items center
             word-break break-all
             span
              min-width 20%
             >span:nth-child(1)
              text-align left
             >span:nth-child(2)
              text-align right
             



        
           

</style>

<template>
  <div class="shopgoods" v-if="goods">
        <div class="left_goods">
            <ul class="food_list">
                <li :class="{active:currentIndex===index}" v-for="(item, index) in goods" :key="index" @click="clickMenuItem(index)">
                    <span>{{item.name}}</span>
                    </li>  
            </ul>
        </div>
        <div class="right_goods" >
            <ul class="right_goods_wrap" ref="ul">
                <li v-for="(item, index) in goods" :key="index" class="li_wrap" >
                 <div class="title">
                      {{item.name}}
                 </div>
                 <div class="food" v-for="(item, index) in item.foods" :key="index">
                      <div class="food_introduce"> 
                            <div class="img" @click="showFood(item)">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="description">
                                <span>{{item.name}}</span>
                                <span>{{item.description}}</span>
                                <span class="goodComment">好评{{item.rating}}%<span>月售{{item.sellCount}}单</span></span>
                            </div>
                      </div>
                      <cart-control :food="item" :price="item.price"></cart-control>
                      
                 </div>
             </li>
          </ul>
 
        </div>
      <food :food="food" ref="food"></food>
      <shop-cart></shop-cart>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControl from '@/components/CartControl/CartControl.vue'
import food from '@/components/food/food.vue'
import ShopCart from '@/components/shopcart/shopcart.vue'
export default {
   data () {
      return {
          Show:false,
          scrollY: 0, // 右侧 Y 轴滑动的坐标
          tops: [], // 包含右侧所有分类小列表的 top 值
          food:{}
      };
   },

   components: {
      CartControl,
      food,
      ShopCart
   },

   computed: {
       ...mapState(['goods']),
       currentIndex() {
           const {scrollY,tops} = this;
        //    给当前的添加class
           const index = tops.findIndex((top,index) => {
               return scrollY >= top && scrollY < tops[index+1]
           })
           return index
       }
   },
   mounted() {
       this.$store.dispatch('getGoods', () => {// goods 更新了 , 界面还没有更新
            this.$nextTick(() => {
            // 初始化滚动
            // 初始化 tops
            this.initScroll();
            this.initTops();
              })
        })
   },
   methods: {
       initScroll () {
        // 左侧分类列表的 BScroll
        new BScroll('.left_goods',{
               click: true // 响应点击
        })
        // 右侧 food 列表的 BScroll
        this.foodsScroll = new BScroll('.right_goods',{
                probeType: 2, // 手指滑动 ( 惯性滑动和编码滑动不监视 )
                click: true // 响应点击
        })
        // 监视滑动过程
        this.foodsScroll.on('scroll', (pos) => {
                // 保存 y
                this.scrollY = Math.abs(pos.y)
        })
        // 监视滑动结束
        this.foodsScroll.on('scrollEnd',(pos) => {
                console.log(' 滑动结束', pos.y)
                this.scrollY = Math.abs(pos.y) // 解决惯性滑动更新
                })
        },
        // 得到右边的高度
      initTops() {
            const tops = []
            let top = 0
            // 计算各个 top, 并保存到 tops
            // 得到 ul 下所有的子 li
            tops.push(top)

            const lis = this.$refs.ul.getElementsByClassName('li_wrap')
            Array.from(lis).forEach((li, index) => {
                top += li.clientHeight
                tops.push(top)
            })
            // 保存 tops
            this.tops = tops
      },
      clickMenuItem(index) {

          // 得到滚动目标坐标
            const top = this.tops[index]
            // 更新目标 scrollY 值
            this.scrollY = top
            // 平滑滚动到指定位置
            this.foodsScroll.scrollTo(0, -top, 300)
      },
       // 显示点击的food
      showFood (item) {
        // 设置food
        this.food = item
        // 显示food组件 (在父组件中调用子组件对象的方法)
        this.$refs.food.toggleShow()
      }
    
   }
}

</script>
<style scoped lang="stylus">
@import '../../../common/stylus/mixins.styl'

   .shopgoods
        display flex      
        width 100%
        overflow hidden
        margin-top 1.8rem
        .left_goods
           flex 1
           height 8rem
           background #f3f5f7
           .food_list
             height 120%
             width 100%
             display flex
             flex-direction column
             align-items center             
             >li
                display inline-block
                width 60%
                height .5rem
                line-height .5rem
                text-align center
                bottom-border-1px(#CFCFCF)
                font-weight bold
                span
                display inline-block
                width 100%
                font-size .15rem
             .active
                 width 100%
                 background #fff
                 color #228B22
                 font-weight bold  !important
                 bottom-border-1px(#fff)
             .on
                 color red
        .right_goods
           flex 3
           height 50rem
           .right_goods_wrap
               height 93rem
               .title
                background #f3f5f7
                height 0.3rem
                line-height .3rem
                text-indent .2rem
                font-weight bold
                border-left 2px solid #8F8F8F
                font-size .15rem
               .food
                padding .2rem .15rem .15rem 0
                margin-left .15rem
                bottom-border-1px(#CFCFCF)
                font-size .15rem
                .food_introduce 
                    display flex
                    width 100%
                    height 120%
                    .img
                        flex 1
                        img
                          height 60px
                          width 106%
                    .description
                        flex 3
                        display flex
                        flex-direction column
                        justify-content space-around
                        margin-left .15rem
                        span
                            padding 0.03rem 0
                        .goodComment
                            span
                                padding-left .07rem
.fade-enter-active,.fade-leave-active
        transition opacity .9s
.fade-enter,.fade-leave-to
        opacity 0
.fadein-enter-active, .fadein-leave-active {
  transition all 1s
}
.fadein-enter, .fadein-leave-active {
  transform translate3d(0,100%, 0)
}        


                       

</style>
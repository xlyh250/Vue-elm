<template>
 <div class="abc" ref="abc">

   <div class="shop_container" >
       <div>
           附近商家
       </div>
       <div>
            <div class="shop_list" v-for="(shop, index) in shopss" :key="index" @click="$router.push('/shop')">
            <div class="left">
            <img :src="baseImgUrl+shop.image_path" alt="" class="left_img">
            </div>
            <div class="right">
                <div class="right_top">
                    <h4 class="shop_title">{{shop.name}}</h4>
                    <ul class="support">
                        <li v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</li>
                    </ul>
                </div>
                <div class="right_middle">
                    <p>
                        <Ratings :score="shop.rating" :size="24"></Ratings>
                        <span>{{shop.rating}}</span>
                        <span class="right_middle_count">月售{{shop.recent_order_num}}单</span>
                    </p>
                    <p class="delivery_mode">{{shop.delivery_mode.text}}</p>
                </div>
                <div class="right_buttom">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span>/</span>
                    <span>配送费约¥{{shop.float_delivery_fee}}</span>
                </div>
            </div>
           </div>
       </div>
       <div>
           <img src="./images/shop_back.svg" alt="" v-for="(item,index) in 10" :key="index" class="b_img">
       </div>
    </div>
 </div>

</template>

<script>
import {mapState} from 'vuex'
import Ratings from '@/components/star/ratings'
import BScroll from 'better-scroll'

export default {
   data () {
      return {
        baseImgUrl: 'http://cangdu.org:8001/img/',
        shopss:'',
        distance:''
      }
    },

   components: {
       Ratings
   },
   computed: {
      ...mapState(['shops']),

   },
   mounted() {
       this.initScroll()
   },
   watch:{
        shops(value){
            this.$nextTick(() =>{
              this.shopss = value 
            })
       }
   },
 
   methods: {
       initScroll() {
        this.foodsScroll = new BScroll('.abc',{
            probeType: 2, // 手指滑动 ( 惯性滑动和编码滑动不监视 )
            click: true // 响应点击
        })
        // 监视滑动过程
        this.foodsScroll.on('scroll', (pos,scrollBy) => {
                this.top = this.$refs.abc.offsetTop
                this.scrollY = Math.abs(pos.y)
                
                this.distance = this.top - this.scrollY
                console.log(this.distance);
        })
        // 监视滑动结束
        this.foodsScroll.on('scrollEnd',(pos) => {
                this.scrollY = Math.abs(pos.y) // 解决惯性滑动更新
                })
        },
   }
}

</script>
<style scoped lang="stylus">
@import "../../common/stylus/mixins.styl"
 .abc  
   height 1rem
   position absolute
   left 0
   top 2.4rem
   z-index 9999
   min-width 100%
   .shop_container
        padding-top 0.2rem
        font-size 0.16rem
        background #fff
        .b_img
              color red
        .shop_list
                bottom-border-1px(#f1f1f1)
                display flex
                justify-content space-around
                padding .1rem
                .left
                    flex 1 
                    height 120px
                    .left_img
                       width 100%
                       height 100%
                .right     
                    flex 3
                    display flex
                    flex-direction column
                    justify-content space-between
                    margin-left .1rem
                    max-width 75%
                    height 1rem
                    font-size 0.14rem
                    .right_top
                            display flex
                            justify-content space-between
                            .shop_title
                                       font-weight bold
                                       font-size 0.16rem
                                       overflow: hidden;
                                       text-overflow: ellipsis;
                                       white-space: nowrap;
                                       &::before
                                        content '品牌'
                                        display inline-block
                                        font-size 0.1rem
                                        line-height .1rem
                                        color #333
                                        background-color #ffd930
                                        padding 0.02rem
                                        border-radius 0.02rem
                                        margin-right 0.05rem
                            .support
                                    font-size 0.1rem
                                    display flex
                                    flex-direction row
                                    justify-content space-around
                                    li
                                      padding 0 0.03rem
                                      color red
                    .right_middle
                        display flex
                        justify-content space-between
                        p
                         height 0.3rem
                         .right_middle_count
                            display block
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        .delivery_mode
                            border 1px solid #0085ff
                            vertical-align bottom
                            padding-top 0.02rem
                            min-width 0.6rem
                            text-align center
                            height 0.1rem
                            line-height 0.1rem



                           




</style>
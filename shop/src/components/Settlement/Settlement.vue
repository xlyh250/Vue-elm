<template>
   <div class="settlement" style="margin-bottom:.7rem" v-if="address">
     <header>
       <div class="iconfont icon-fanhui" @click="$router.back()">
         
       </div>
       <div class="checkout">
           <h4>
             确认订单
           </h4> 
       </div>
     </header>
     <nav>
         <p>订单配送至</p>
         <p :style="{fontWeight:'bold'}">{{address.name}}</p>
         <p>{{user_info.name}}</p>
         <main>
           
            <div>
              <p>送达时间</p>
              <p>尽快送达({{time}})</p>
            </div>
             
            <div>
              <p>配送方式</p>
              <p>在线支付</p>
             </div>
         </main>
     </nav>
     <div class="shops">
        <h3></h3>
        <div class="shop_list">
            <ul>
              <li v-for="(item, index) in cartFoods" :key="index">
                <span class="images" :style="{backgroundImage:`url(${item.icon})`}"></span>
                <span class="describe">
                  {{item.name}}
                </span>
                <span class="count">X{{item.count}}</span>
                <span class="price">{{item.price*item.count}}</span>
              </li>
            </ul>
            <h5>满减活动与单品不同享</h5>
            <p class="redbao"><span>红包</span><span>只能在饿了么app使用</span></p>
            <p class="discount">优惠{{ten}}元
              <span class="iconfont icon-da_gou" @click="show=!show" :class="{active:show}"></span>
              </p>
        </div>
     </div>
     <div class="order">
        <p>
          <span>{{commit?commit:'订单备注'}}</span><span @click="$router.push('/ordernotes')">口味偏好<i class="iconfont icon-xiayibu"></i></span>
        </p>
     </div>
     <footer>
        <div>总价:￥{{show?total-ten:total}}</div>
        <div>
          <span @click="toast">去支付</span>
        </div>
     </footer>
    
</div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import { Toast } from 'mint-ui'
import localStorage from '@/localStorage/localStorage'
export default {
  data () {
    return {
      foods:[],
      show:false,
      isShow:false
    };
  },

  components: {
      
  },
  created() {
    
  },
  computed: {
    ...mapState(['cartFoods','address','user_info','commit']),
    ...mapGetters(['totalPrice']),
    ten() {
       if(this.cartFoods.length!==0){
          return Math.floor(Math.random()*10+1)
       }
         return 0
    },
    total() {
      const {totalPrice}= this
        return totalPrice
    },
    time() {

      let time = new Date()

      let timer = Math.floor(Math.random() * 100 + 20)
      let h = time.getHours()

      let t = Math.floor((time.getMinutes() + timer) /60)
      let m = (time.getMinutes() + timer) % 60    
      h += t
      
      console.log(timer);
      
      function d(num){
        return num > 10?num :'0'+num
      }
       return d(h)+':'+d(m)
    }
    
  },
  mounted() {
      
      this.time
  },
  methods: {
    toast() {
      
      Toast({
        message:'请到饿了么下单',
        duration: 2000,
        className:'.toast'
        })
    }
  },
  // watch:{
  //     cartFoods: {
  //           deep: true, // 深度监视
  //           handler: localStorage.saveTodos,
  //     }
  // }
}

</script>
<style scoped lang="stylus">
@import "../../common/stylus/mixins.styl"
   header
     width 100%
     height .5rem
     line-height .5rem
     background #0085ff
     >div
       display inline-block
     .icon-fanhui
       font-size .2rem
       color #fff
       width 10%
     .checkout
       text-align center
       width 80%
   nav     
     background #0085ff
     padding 0 .15rem
     color #fff
     padding-top .1rem
     padding-bottom .1rem
     >p 
       line-height .3rem
     >main
       padding 0 .1rem
       background #fff
       color #000
       >div
         line-height .35rem
         display flex
         justify-content space-between
   .shops  
     padding .1rem .1rem .1rem .3rem
     background #fff
     h3
       height .3rem
       line-height .15rem
       bottom-border-1px(#e4e4e4)
     .shop_list
       ul
         li
           padding .15rem
           height .3rem
           bottom-border-1px(#eee)
           display flex             
           flex-direction row
           justify-content space-between
           >span
             flex 1
             text-align center
             line-height .3rem
             height .3rem
           .images
             height .3rem
             background url(https://fuss10.elemecdn.com/3/4f/c5e32d3d5a54d91fe24c46bc3976fjpeg.jpeg?imageMogr/format/webp/thumbnail/!72x72r/gravity/Center/crop/72x72/) no-repeat
             background-size contain
           .describe
             max-width 33%
             text-align left !important
             white-space nowrap
             overflow hidden
             text-overflow ellipsis
           .count
             text-align left !important
             color #0085ff
             font-weight bold
       h5
        line-height .4rem
        height .4rem
        bottom-border-1px(#eee)
        color #bbb
       .redbao
        display flex
        flex-direction row
        bottom-border-1px(#eee)
        line-height .4rem
        height .4rem
        justify-content space-between
        >span:nth-child(2)
            color red
       .discount
            color red
            line-height .5rem
            height .5rem
            bottom-border-1px(#eee)
            display flex
            justify-content space-between
            .icon-da_gou
              padding-right .2rem
              display inline-block
              color #eee
              font-size .2rem
            .active
              color green
   .order
     margin-top .1rem
     padding 0 .1rem 0 .25rem
     >p
      display flex
      justify-content space-between
      line-height .4rem
      height .4rem
      >span:nth-child(2)
        color #e4e4e4
      .icon-xiayibu
          font-size .16rem !important
  footer     
    position fixed
    bottom 0
    left 0
    height .6rem
    padding-bottom .2rem
    width 100%
    background #3c3c3c
    display flex
    flex-direction row
    justify-content space-between
    padding .1rem .2rem
    color #fff
    box-sizing border-box
    >div:nth-child(2)
      background #00e067
      text-align center
      height .35rem
      line-height .35rem
      border-radius 5px
      padding 0 .1rem
  .toast    
    width 2rem
    height .6rem
</style>

   
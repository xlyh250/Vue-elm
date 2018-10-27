<template>
   <div>
       <div class="footer">
            <div class="left_footer" @click="toggleShow">
               <div class="round" :class="{on:totalCount}">
                   <span class="iconfont icon-gouwuche1" ></span>
                   <div class="count" v-if="totalCount">{{totalCount}}</div>
               </div>
                <div class="text">
                   <p >配送费</p>
                   <p>￥{{totalPrice||shopinfo.deliveryPrice}}</p>
               </div>
            </div>
            <div class="right_footer">
               <div :class="{show:totalPrice>=20}" @click="settlement">￥{{Text}}</div> 
            </div>
         <div>
             <transition name="fadein">
                    <div class="showContent" v-show="listshow">
                            <div class="showContent_top">
                                <span>购物车</span>
                                <div style="color:blue;" @click="clearCart">清空</div>
                            </div>
                            <div class="showContent_bottom" v-for="(item, index) in cartFoods" :key="index">
                                <span>
                                {{item.name}}
                                </span>
                                <div class="showContent_bottom_l">
                                    <cart-control :food="item" :price="item.price" />
                                </div>
                            </div>
                    </div>
             </transition>
         </div>
        </div>
        <transition name="fade">
         <div class="list-mask" v-show="listshow" @click="toggleShow"></div>
        
        </transition>
        <logout-alert :Logoutalert="Logoutalert" @choseThis="choseThis" @cancelThis="cancelThis">
            <div name="slotA">
                 <div class="text">
                     <div>
                         确认要清空？
                     </div> 
                 </div>
            </div>
        </logout-alert>
        <div class="list-mask" v-show="isShow" @click="isShow = !isShow">
        </div>
        <transition name="isfade">
          <div class="fristLogin" v-show="isShow">
            <div>
                请先登录
                </div>  
          </div>
        </transition>
       
   </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
import CartControl from '../CartControl/CartControl.vue'
import { MessageBox} from 'mint-ui';
import logoutAlert from '../logoutAlert/logoutAlert.vue'
export default {
   data () {
      return {
        show:false,
        Logoutalert:false,
        isShow:false
      };
   },

   components: {
         CartControl,
         logoutAlert
   },

   computed: {
       ...mapState(['shopinfo',"cartFoods",'user_info']),
       ...mapGetters(['totalCount','totalPrice']),
       Text() {
           const {totalPrice} = this;
           const {minPrice} = this.shopinfo;
           if(!totalPrice){
               return `${minPrice}起送`
           }else if(totalPrice>=minPrice){
               return '结算'
           }else{
              return `还差${minPrice-totalPrice}元`
           }
       },
       listshow() {
           if(this.totalCount===0){
               this.show = false
               return false
           }
           return this.show

       }
   },
   methods: {
      toggleShow() {
          if(this.totalCount > 0){
             this.show = !this.show
          }
      },
      clearCart() {
           this.Logoutalert = !this.Logoutalert
      },
      choseThis() {
          this.Logoutalert = !this.Logoutalert
          this.$store.dispatch('clearCart')
      },
      cancelThis() {
           this.Logoutalert = !this.Logoutalert
           
      },
      settlement() {
          if(this.totalPrice < 20){
              return 
          }

          if(this.user_info._id){
             this.$router.push('/settlement')
          }else{
            this.isShow = !this.isShow
          }
          
      }
      
   }
}


</script>
<style scoped lang="stylus">

     .footer
            position fixed
            left 0
            bottom 0
            display flex
            height .6rem
            width 100%
            z-index 999999
            font-size .17rem
            .left_footer
                flex 2
                background #141d27
                display flex
                .round
                 flex 1
                 width .55rem
                 height .55rem
                 position absolute
                 left .2rem
                 bottom  .15rem
                 z-index 9999
                 border-radius 50%
                 border 2px solid #141d27
                 background #999
                 display flex
                 justify-content center
                 align-items center
                 box-sizing border-box
                 .count
                  position absolute
                  right -.09rem
                  bottom .35rem
                  background red
                  width .25rem
                  height .15rem
                  border-radius 30%
                  color #fff
                  font-size .15rem
                  text-align center
                 span
                  font-size 0.25rem
                  color #fff
                .on
                 border 3px solid green
                 background #141d27
                .text
                 flex 2
                 p
                  padding-left .9rem
                  color #fff
                  line-height .25rem
                  height .25rem
            .right_footer
                flex 1
                background #2b333b
                text-align center
                color #fff
                font-weight bold
                line-height .6rem
                span
                    display block
                    width 100%
                    font-size .17rem
                .show
                    background: #008000
                    color #fff
                    font-weight 900
                    font-size .17rem
            .showContent
                position absolute
                left 0
                bottom 0
                z-index -1
                background #fff
                width 100%
                border-top 1px solid #f0f0f0
                transform translate3d(0,-.6rem,0)
                &.fadein-enter-active, &.fadein-leave-active
                    transition all .7s
                &.fadein-enter, &.fadein-leave-to
                    transform translate3d(0,100%,0)
                >div
                 height .3rem
                .showContent_top
                 line-height .3rem
                 height .3rem
                 display flex
                 justify-content space-around
                 width 100%
                 border-bottom 1px solid #f0f0f0
                .showContent_bottom
                 height .4rem
                 display flex
                 padding-left .1rem
                 padding-top .1rem
                 span
                     flex 3
                     line-height .3rem
                 .showContent_bottom_l
                     flex 3
                     line-height .1rem
                     padding-right .05rem
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 409969
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
  .fristLogin
    position absolute
    top 35%
    left 30%
    width 40%
    height 0
    padding-bottom 40%
    z-index 99999999
    background #ffffff
    border-radius 5px
    box-shadow: #000 0 0 15px
    &.isfade-enter-active, &.isfade-leave-active
      transition all 0.5s
    &.isfade-enter, &.isfade-leave-to
      transform translate3d(0,-400%,0)
    >div
        position absolute
        top 30%
        left 15%
        width 70%
        height 40%
        font-size .16rem
        font-weight bold
        text-align center
    
     
</style>
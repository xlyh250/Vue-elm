<template>
  <div>
      <transition name="fade">
             <div class="food_bigimage_wrap" v-show="isShow" @click.self="toggleShow">
                          <div class="food_bigimage">
                              <div class="img_wrap">
                             <img :src="food.image" alt="">
                              <p>{{food.name}}</p>
                              </div>
                          <div class="food_bigimage_description">
                              <h5>{{food.name}}</h5>
                              <p>好评率{{food.rating}}%</p>
                              <div>
                                  <cart-control :food="food" :price="food.price"></cart-control>
                              </div>
                              </div>
                          </div>
                  </div>
         </transition>
  </div>
</template>


<script>
  import CartControl from '../CartControl/CartControl.vue'

  export default {
    props: {
      food: Object
    },

    data () {
      return {
        isShow: false
      }
    },

    methods: {
      toggleShow () {
        this.isShow = !this.isShow
      }
    },

    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
     .food_bigimage_wrap
            position fixed
            top 0
            left 0
            bottom 0
            right 0
            width 100%                           
            height 100%
            z-index 99999999999999
            background rgba(0,0,0,0.5)
            display flex
            justify-content center
            align-items center
            .food_bigimage
                display flex
                flex-direction column
                justify-content space-between
                width 80%
                border-radius 10px
                box-shadow 0 0 5px inset #f0f0f0
                background #fff
                .img_wrap
                    flex 4
                    width 100%
                    img
                        width 100%
                        height 100%
                    p
                      position relative
                      top -.3rem
                      left .1rem
                      color #fff
                      font-weight bold
                      font-size 0.15rem
                .food_bigimage_description
                    flex 2
                    padding-left 0.2rem
                    h5
                      font-weight bold
                    >p                             
                     font-size .14rem
                     line-height .3rem
                     height .3rem
                    div
                     padding 0 .1rem .05rem 0
.fade-enter-active, .fade-leave-active
      transition opacity .5s
.fade-enter, .fade-leave-to
      opacity 0           
</style>

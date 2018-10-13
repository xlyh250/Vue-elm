<template>
     <div class="food_count"> 
       <p>
        ￥{{price}}
       </p>
     <p class="bobble">
      <transition name="move">
          <span class="iconfont icon-jian1" v-if="food.count" @click.stop="updateFoodCount(false)"></span>
      </transition>
          <span v-if="food.count">{{food.count}}</span>
          <span ><i class="iconfont icon-jia3" @click.stop="updateFoodCount(true)"></i></span>
      </p>       
    </div>
  
</template>

<script>
  export default {
    props: {
      food: Object,
      price:Number
    },

    methods: {
      updateFoodCount (isAdd) {
        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
   .food_count
    width 100%
    display flex
    flex-direction row                    
    justify-content space-around
    padding-top .1rem
    >p
      flex 1.3
      text-align right
    .bobble
      flex 2
      span
        display inline-block
        width .2rem
        text-align center
        font-size .16rem
      .icon-jian1 
          color green
          font-size .19rem
          font-weight bold
        i
        display inline-block
        border-radius 50%
        font-weight bold
        color #008000
        font-size .19rem

.move-enter-active, .move-leave-active
        transition all .3s
.move-enter, .move-leave-to
        opacity 0
        transform translateX(30px) rotate(180deg)
</style>

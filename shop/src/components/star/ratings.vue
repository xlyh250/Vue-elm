<template>
   <div class="star" :class="'star-'+size">
       <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
   </div>
</template>

<script>
  let CLASS_ON = 'on'
  let CLASS_HALF = 'half'
  let CLASS_OFF = 'off'
export default {
   data () {
      return {
               
      };

   },
    props:{
        score: Number,
        size: Number
    },

   components: {
    
   },
   mounted() {
       
   },
   computed: {
       starClasses () {
        const {score} = this
        const scs = []
        // 向scs中添加n个CLASS_ON
        const scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        // 向scs中添加0/1个CLASS_HALF
        // 小数加减不精确可能会等于0.49/0.51
        if(score*10 - scoreInteger*10 >= 5) {
          scs.push(CLASS_HALF)
        }
        // 向scs中添加n个CLASS_OFF
        while(scs.length < 5) {
          scs.push(CLASS_OFF)
        }
        return scs
      }
   },

   methods: {

   }
}

</script>
<style scoped lang="stylus">
 @import "../../common/stylus/mixins.styl"
 .star
    float left
    font-size 0
    margin-right 0.06rem
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-24
      .star-item
        width .1rem
        height .1rem
        margin-right 0.03rem
        background-size .1rem .1rem
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
  
</style>
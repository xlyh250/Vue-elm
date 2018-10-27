<template>
<div class="abc">
   <div class="shopRatings">
        <div class="ratings_nav">
            <div class="ratings">{{shopinfo.score}}</div>
            <div class="star">
                <h4>商家评分</h4>
               <ratings :score="shopinfo.score" :size="24"></ratings>
            </div>
            <div class="info">
                <div>
                     <p>包装</p>
                     <p>{{shopinfo.serviceScore}}</p>
                </div>
               <div>
                    <p>味道</p>
                    <p>{{shopinfo.foodScore}}</p>
               </div>
               <div>
                    <p>配送</p>
                     <p>{{shopinfo.foodScore}}</p>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="is_satisfy">
                <span @click="satisfy(2)" :class="{active:selectType===2}">全部 {{ratings.length}}</span>
                <span @click="satisfy(0)" :class="{active:selectType===0}">满意 {{positiveSize}}</span>
                <span @click="satisfy(1)" :class="{active:selectType===1}">不满意  {{ratings.length-positiveSize}}</span>
            </div>
             <p>
                <span class="iconfont icon-da_gou" @click="showCommit" :class="{active:onlyShowText }"></span>
                只看内容的评价
             </p>
            <div class="comment_content" v-for="(rating, index) in filtersRatings" :key="index"  >
                   <div class="user_img">
                    <span class="iconfont icon-denglu"></span>
                </div>
                <div class="user_text">
                    <div class="username">
                        <span>{{rating.username}}</span>
                        <span style="">{{1537683479451|dateString}}</span>
                    </div>
                    <div class="star">
                        <ratings :score="rating.score" :size="24"></ratings>
                    </div>
                    <div class="p">
                        <span>{{rating.text}}</span>
                     </div>
                    <div class="recommend">
                        <span v-for="(recommend, index) in rating.recommend" :key="index">{{recommend}}</span>
                    </div>
                </div>
            </div>
          </div>  
        </div>
   </div>
</template>

<script>
import ratings from '../../../components/star/ratings.vue'
import {mapState,mapGetters} from 'vuex';
import BScroll from 'better-scroll'
export default {
   data () {
      return {
         num:'',
         selectType:2,
         onlyShowText :false
      };
   },

   components: {
       ratings
   },
   mounted() {
       this.$store.dispatch('getRatings');
       new BScroll('.abc',{
           click:true
       })
   },

   computed: {
       ...mapState(['shopinfo','ratings']),
       ...mapGetters(['positiveSize']),
     
      //重新计算ratings的数值
      filtersRatings() {
        const {ratings, onlyShowText, selectType} = this

        // 产生一个过滤新数组
        return ratings.filter(rating => {
          const {rateType, text} = rating
          /*
            条件1:
                selectType: 0/1/2
                rateType: 0/1
                selectType===2 || selectType===rateType
            条件2
                onlyShowText: true/false
                text: 有值/没值
                !onlyShowText || text.length>0
           */
        //   六种判断情况
          return (selectType===2 || selectType===rateType) && (!onlyShowText || text.length>0)
        })
      }
   },
   updated() {
     console.log(this.filtersRatings);
   },

   methods: {
      satisfy(index) {
          this.selectType = index
      },
      showCommit() {
         this.onlyShowText  = !this.onlyShowText 
      }
   },
  
}

</script>
<style scoped lang="stylus">
  @import '../../../common/stylus/mixins.styl'
.abc
  height 1rem
  .shopRatings
      background #f5f5f5
      .ratings_nav
       display flex
       width 100%
       padding-top .3rem
       background #fff
       margin-top 1.8rem
       .ratings
        flex 1.2
        text-align center
        font-size .4rem
        color #ff6000
        padding-top .05rem
       .star
        flex 1.2 
        line-height .25rem
        padding-top .05rem
       .info
        flex 2.7
        display flex
        justify-content space-around
        >div 
         padding-bottom .15rem
         display flex
         flex-direction column
         justify-content space-between
         >p:nth-child(1)
          font-size .15rem
      .comment
          margin-top .1rem
          background #fff
          padding 0 .2rem
          >p
            
            .icon-da_gou
              padding-right .2rem
              display inline-block
              color #eee
              font-size .2rem
            .active
              color green
          .is_satisfy
           padding .1rem 0 .1rem .1rem
           span
            display inline-block
            text-align center
            width .6rem
            height .3rem
            font-size .15rem
            line-height .3rem
            padding 0 .05rem
            background #ebf5ff
            color #6d7885
            border-radius 3px
            &.active
             color #fff
             background #0097ff
            &.on
             background #ccc
          >p
           bottom-border-1px(#f0f0f0)
           top-border-1px(#f0f0f0)
           height .4rem
           line-height .4rem
           font-size .15rem
      .comment_content
          display flex
          padding-bottom .1rem
          bottom-border-1px(#f0f0f0)
          .user_img
              flex 1
              display flex
              padding-top .1rem
              display flex
              text-align center
              justify-content center
              .icon-denglu
                  font-size .2rem
                  border-radius 40%
                  height .3rem
                  line-height .3rem
                  width .3rem
                  display inline-block
                  background #0097ff
                  color #fff
          .user_text
              flex 4
              max-width 80%
              .username
                  padding .1rem 0 .1rem 0
                  font-size .13rem
                  >span
                   width 50%
                  >span:nth-child(1)
                   text-align left
                  >span:nth-child(2)  
                   float right
                   text-align center
                   width 60%
              .star
                  line-height .2rem
                  height .2rem
              .p
                line-height 0.25rem
                font-weight bold
                font-size 0.15rem
                word-break break-all
                padding-bottom .1rem
              .recommend
                  font-size .15rem
                  span
                   width .3rem
                   height .25rem
                   line-height .25rem
                   text-align center
                   margin-right .1rem
                   background #9e9e9e4a
</style>
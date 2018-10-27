<template>
   <div>
       <Hea-der></Hea-der>
        <div class="food_list">
            <swiper :options="swiperOption" ref="mySwiper" v-if="categorysArr.length">
                <swiper-slide class="swiper-slide" v-for="(categoryss, index) in categorysArr" :key="index">
                    <div v-for="(category, index) in categoryss" :key="index" class="wraps">
                        <div class="wrap" :title="category.description">
                            <img :src="baseImageUrl+category.image_url" alt="" class="img">
                                <span>{{category.title}}</span>
                        </div>
                    </div>
                </swiper-slide>
                 <div class="swiper-pagination" slot="pagination"></div>
            </swiper> 
            <img src="./images/msite_back.svg" alt="" v-else>
        </div>
       <Shop-list></Shop-list>
   </div>
</template>

<script>
import HeaDer from '@/components/headertop/Header'
import ShopList from '@/components/shoplist/shoplist'
// import axios from 'axios'
import {reqFoodCategorys} from '@/api'
import {mapState} from 'vuex'

export default {
   data () {
      return {
          swiperOption: {
            pagination: '.swiper-pagination',
        },
         baseImageUrl: 'https://fuss10.elemecdn.com'
      };
   },

   components: {
       HeaDer,
       ShopList
   },

   computed: {
    //    获取axios请求回来的数据
       ...mapState(['categorys'],['shops']),
       categorysArr() {
            const {categorys} = this;
            let arr = []
            categorys.forEach((item,index) => {
                
                let page = Math.floor(index/8);
                if(!arr[page]){
                    arr[page] = []
                }
                arr[page].push(item)
            })
            return arr
       }
   },
   mounted() {
       this.$store.dispatch('getShops')
   },
   methods: {
      
   },
   created() {
       setTimeout(() => {
           this.categorys
       }, 1500);
   },
}

</script>
<style scoped lang="stylus">
   @import "../../common/stylus/mixins.styl"
      .food_list
            margin-top .55rem
            overflow hidden
            height 1.8rem
            width 100%
            background #fff
            bottom-border-1px(#e4e4e4)
            .swiper-pagination
                    position absolute
                    bottom 0.3rem
                    left 0
            .swiper-slide
                    display flex
                    justify-content space-around
                    flex-wrap wrap
                    text-align center
                    .wraps
                        height 0.8rem
                        width 25%
                        .wrap 
                            display flex
                            flex-direction column
                            justify-content space-around
                            align-items center
                            height 0.8rem
                            width 100%
                            .img
                                height 0.3rem
                                width 0.3rem
                                display block
                                

                      
             
               
              


                
                     
                

               


</style>
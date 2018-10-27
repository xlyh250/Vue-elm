<template>
   <div class="ordernotes">
       <header>
           <div >
             <span class="iconfont icon-fanhui" @click="$router.back()">
             </span>
           </div>
           <div>
               订单备注
           </div>
       </header>
       <main>
           <textarea name="" id="" cols="30" rows="10" placeholder="请添加备注" v-model="text">
                 
           </textarea>
       </main>
       <footer>
           <button @click="commit">提交</button>
       </footer>
   </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
       text:''
    };
  },

  components: {

  },
  computed: {

  },
  methods: {
    commit() {
       
       this.$store.dispatch('commit',this.text)
       this.$router.back()
    }
  }
}

</script>
<style scoped lang="stylus">

   header
     display flex
     height .5rem
     line-height .5rem
     background #0085ff
     color #fff
     >div
        display inline-block
     >div:nth-child(1)
        width 10%
        .icon-fanhui
           font-size .18rem
           padding-left .1rem
     >div:nth-child(2)
        width 80%
        text-align center
   main
    padding .2rem
    background #fff
    textarea
      margin 0 auto
      width 100%
      border none
      background #eee
      border 1px solid #ccc
      font-size .18rem
      line-height .2rem
      padding .1rem
      box-sizing border-box
   footer
      padding .1rem 10%
      display flex
      justify-content center
      button
        width 80%
        color #fff
        border-radius 8px
        text-align center
        height .3rem
        line-height .1rem
        background #00e067
        opacity .8
        font-size .2rem
</style>

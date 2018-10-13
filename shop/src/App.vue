<template>
  <div id="app">
    <span class="&#xe62a;"></span>
         <Footer-guide v-if="$route.meta.showFooter">
         </Footer-guide>
        <keep-alive>
        <!-- <transition name="slide-fade"> -->
            <router-view></router-view>
        <!-- </transition> -->
        </keep-alive>
  </div>
</template>

<script>
import FooterGuide from './components/footerguide/FooterGuide'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      show:true
    }
  },
   components: {
       FooterGuide
   },
   mounted() {
       this.getAddress();
       this.getCategorys();
      //  获取用户信息 使自动登录
       this.getUserInfo();
    //    this.$store.dispatch('getCategorys')  getCategorys  actions里的名字 另一种方法
   },
   methods: {
    //    发起vuex调用axios
        ...mapActions(['getAddress','getCategorys','getUserInfo'])
   },
   computed: {
    //  hide() {
    //    let reg = /^(\/shop|\/login)/g

    //     if(reg.test(this.$route.path)===true){
    //           return this.show = false
    //     }
    //           return this.show = true
    //  }
   }
}
</script>

<style scoped>

.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter,.slide-fade-leave-to{
  
  transform: translate3d(100%,0,0);
}
  
</style>

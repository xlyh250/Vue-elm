<template>
   <div>
      <shopHeader :shopinfo="shopinfo"> 
      </shopHeader>
      <header-tab/>
     
      <keep-alive>
    <router-view></router-view>
      </keep-alive>
   </div>
</template>

<script>
import {mapState} from 'vuex';
import shopHeader from '@/components/shopHeader/shopHeader'
import headerTab from './headerTab'
export default {
   data () {
      return {
      };
   },

   components: {
       shopHeader,
       headerTab
   },

   computed: {
      //  获取数据
        ...mapState(['shopinfo'])      
   },

   mounted() {

       this.$store.dispatch('getShopinfo')     
   },

  created() {
      
  },
   methods: {
   }
}

</script>
<style scoped lang="stylus">

</style>
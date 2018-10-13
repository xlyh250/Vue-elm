import {
    SHOPS,
    ADDRESS,
    CATEGORYS,
    USER_INFO,
    RESET_USER_INFO,
    SHOPINFO,
    RATINGS,
    GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART
} from './mutation-types'
import { 
    reqAddress,
     reqShops, 
     reqFoodCategorys, 
    reqUserInfo, reqLogout, reqShopInfo, reqShopRatings, reqShopGoods} from '@/api'

export default {

    // 异步获取地址
    async getAddress({commit,state}) {
        
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash)
        if (result.code === 0) {
           const address = result.data;
            commit( ADDRESS, { address })
        }
    },
     // 异步获取商家列表
    async getShops({commit,state}) {
        const { latitude, longitude} = state;
        const result = await reqShops(longitude,latitude)
        if(result.code===0){
            const shops = result.data;
            commit( SHOPS ,{ shops})
        }
    },
     // 异步获取食品分类列表
    async getCategorys({commit}) {
        const result = await reqFoodCategorys()
        
        if (result.code === 0) {
            const categorys = result.data;
            commit( CATEGORYS, {categorys})
        }
    },
    // 同步记录用户信息
    recordUser({ commit }, user_info) {
        commit(USER_INFO, { user_info })
    },
    // 异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const user_info = result.data
            commit(USER_INFO, { user_info })
        }
        
    },
    // 异步登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    // 获取商家信息
    async getShopinfo({ commit }){
                   
       const result = await reqShopInfo();   
           
        const shopinfo = result.data
        commit(SHOPINFO, { shopinfo })
    },
    // 获取商家评价
    async getRatings({ commit }) {

        const result = await reqShopRatings();
        const ratings = result.data
        commit(RATINGS, { ratings })
    },
    // 获取商家商品
    async getGoods({commit},callback) {
        const result = await reqShopGoods();
        const goods = result.data
        commit(GOODS,{goods})
        callback && callback()
    },
    // 同步更新food中的count值
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },
    // 同步清空购物车
    clearCart({ commit }) {
        commit(CLEAR_CART)
    },

}
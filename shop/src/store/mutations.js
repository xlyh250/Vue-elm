
import Vue from 'vue'

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

export default{
    [ADDRESS](state, { address }) {
        state.address = address
    },
  
    [CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [SHOPS](state, { shops }){
        state.shops = shops
    },
    // 保存用户信息
    [USER_INFO](state, {user_info}){
        state.user_info = user_info
    },
    [RESET_USER_INFO](state){
        state.user_info = {}
    },
    [SHOPINFO](state, {shopinfo}){
        state.shopinfo = shopinfo
    },
    [RATINGS](state, { ratings}){
        state.ratings = ratings
    },
    [GOODS](state,{goods}){
        state.goods = goods
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) { // 第一次增加
            // food.count = 1  // 新增属性(没有数据绑定)
            /*
            对象
            属性名
            属性值
             */
            
            Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
            // 将food添加到cartFoods中
            state.cartFoods.push(food)
            console.log(state.cartFoods);
            
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {// 只有有值才去减
            food.count--
            if (food.count === 0) {
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_CART](state) {
        // 清除food中的count
        state.cartFoods.forEach(food => food.count = 0)
        // 移除购物车中所有购物项
        state.cartFoods = []
    }
}
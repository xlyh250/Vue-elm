<template>
   <div class="login">
       <div class="back">
         <span class="iconfont icon-fanhui" @click="$router.replace('/profile')"></span>           
       </div>
       <div class="wrap">
           <div class="msite_title">
                <h1>饿了么</h1>
           </div>
           <div class="login_form">
                   <div class="login_form_change">
                      <span class="login_left" :class="{on: loginWay}" @click="loginWay = true">短信登录</span>
                      <span class="login_right" :class="{on: !loginWay}" @click="loginWay = false">密码登录</span>                       
                   </div>
                   <form @submit.prevent="login">
                       <nav v-show="loginWay">
                            <section class="short_message" >
                            <div class="short_message_phone" >
                                  <input type="text" placeholder="手机号" v-model="phone">
                                   <p class="short_message_code" :class="{black:b}" @click="dowmtime" ref="dowmtime">发送验证码</p>
                            </div>
                             <div class="send_short_message" >
                                   <input type="text" placeholder="验证码" v-model="code">
                            </div>
                            <button class="btn">登录</button>
                          </section>
                       </nav>
                         <nav v-show="!loginWay">
                            <section class="wrap_login" >
                                    <div class="message_login">
                                        <input type="text" placeholder="手机/邮箱/用户名" maxlength="8" v-model="name">
                                    </div>
                                    <div class="password_login">
                                    <input type="text" placeholder="密码" class="password_input" v-if="!showPwd" v-model="pwd">
                                     <input type="password" placeholder="密码" class="password_input" v-if="showPwd" v-model="pwd">
                                        <div class="switch_button" @click="showPwd=!showPwd" :class="{on:!showPwd,off:showPwd}">
                                            <div class="switch_circle" :class="{left: showPwd}"></div>
                                            <span class="switch_text"></span>
                                        </div>
                                    </div>
                                    <div class="message_login">
                                        <input type="text" placeholder="验证码" v-model="captcha">
                                         <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" 
                                         ref="captcha" @click="getCaptcha">
                                    </div>
                            </section>
                            <button class="btn">登录</button>
                              </nav>
                            
                   </form>
            </div>
       </div>
       <Alert-tip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></Alert-tip>
       
   </div>
</template>

<script>
import AlertTip from '@/components/AlertTip/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
console.log();

export default {
   data () {
      return {
          loginWay:true,
          showPwd:true,
          code:'',   //验证码
          pwd:'',   //密码
          name:'',  //用户名
          captcha:'',   //图型验证码
          phone:'',      //    手机号  
         alertText:'',    // 提示文本
         alertShow:false  //  是否显示警告框
      };
   },

   components: {
       AlertTip,
   },
   created() {
       this.timer;
   },
   computed: {
       b() {
           if(this.phone.length === 11){
              return true
           }
       },
   },
   watch:{
    
   },

   methods: {
    //    异步获取短信验证码
     async dowmtime() {
          if(!this.time){
                this.time = 60;     
                clearInterval(this.timer) 
            if(this.b===true){
                this.timer = setInterval(() => {
                
                if(this.time>0){
                        this.time--
                        this.$refs.dowmtime.innerText = '倒计时'+'('+this.time+')'+'s'   
                    }else{
                        this.$refs.dowmtime.innerText = '重新发送验证码'
                        clearInterval(this.timer)  
                    }
                }, 1000);
          }
        }
        // 发送ajax请求(向指定手机发送验证码)
        const result = await reqSendCode(this.phone)
         if(result.code===1){
            //  显示提示
            this.showAlert(result.msg)

            // 停止计时
            if(this.time){
            this.time = 0;
            clearInterval(this.timer)
            }
         }
      },
    //   弹框
      showAlert(alertText){
            this.alertShow = true;
            this.alertText = alertText;
      },
     
    // 前台表单验证
     async login(){
          let result;
        if(this.loginWay){
            const {b,code,phone} = this
            if(!this.b){
                // 手机号不正确
            this.showAlert('手机号不正确')
            }else if(!/^\d{6}$/.test(code)){
            //    验证码不正确
            this.showAlert('验证必须是六位')
            }

            // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)
         

        }else{
           const {name, pwd, captcha} = this 
            if(!this.name) {
                // 用户名必须指定
                this.showAlert('用户名必须指定')
                return
            } else if(!this.pwd) {
                // 密码必须指定
                this.showAlert('密码必须指定')
                return
            } else if(!this.captcha) {
                // 验证码必须指定
                this.showAlert('验证码必须指定')
                return
            }
              // 发送ajax请求密码登陆
          result = await reqPwdLogin({name, pwd, captcha})
         
        }
        // 停止计时
         if(this.time){
            this.time = 0;
            clearInterval(this.timer)
         }
           // 根据结果数据处理
        if(result.code===0) {
            
          const user = result.data
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user)

          // 去个人中心界面
          this.$router.replace('/profile')
          
        } else {
          // 显示新的图片验证码
          this.getCaptcha()
          // 显示警告提示
          const msg = result.msg
          this.showAlert(msg)
        }

      },
    //   关闭提示框
      closeTip() {
        this.alertShow = false;
        this.alertText = '';
      },
    //   发送验证码
      getCaptcha(ev) {
          
         this.$refs.captcha.src = "http://localhost:4000/captcha?time="+Math.random()
      }
     
   }
}
</script>


<style scoped lang="stylus">
 @import "../../common/stylus/mixins.styl" 
     .back
          padding-top 0.1rem
     .wrap
          width 3rem
          height auto
          margin 0.2rem auto
          display flex
          flex-direction column
          justify-content space-between
          align-items center
          .msite_title
                color $color
          .login_form
                padding-top 0.1rem
                width 100%
                height 0.5rem
                .login_form_change
                    align-self stretch
                    display flex
                    justify-content space-around
                    padding .2rem
                    >span
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 4px solid #02a774
                >form
                    
                    >nav
                       
                    .short_message
                        display flex
                        flex-direction column
                        justify-content space-between
                      div
                         width 100%
                         height auto
                        .short_message_code
                            float right 
                            position relative
                            top -0.38rem
                            left -0.1rem
                            color #adadad
                        .black
                            color #000
                        input
                        height auto
                        width 100%
                        line-height .5rem
                        text-indent 0.05rem
                        font-size 0.17rem
                        outline 0
                        border 2px solid $color
                        border-radius 0.05rem 
                        &:focus
                            border 2px solid #666
                       
                .wrap_login
                    width 100%
                    height auto
                    display flex
                    flex-direction column                    
                    justify-content space-between
                    .message_login  
                      width 100%
                      .get_verification
                        position absolute
                        top 0
                        left 50%
                        border 0
                        color #ccc
                        font-size 0.14rem
                        background transparent
                        &.right_phone
                          color black
                     >div
                        width 100%
                        height auto
                        margin-bottom 0.15rem
                        position relative
                        top 0
                        left 0
                      .switch_button
                        font-size 0.12rem
                        border-radius 0.08rem
                        border 1px solid #ddd
                        transition background-color .3s,border-color .3s
                        padding 0 0.06rem
                        width 0.3rem
                        height 0.16rem
                        line-height 0.16rem
                        color #fff
                        position absolute
                        top 50%
                        right 0.1rem
                        transform translateY(-50%)
                        >.switch_circle
                            position absolute
                            top -2px
                            left -1px
                            z-index 10
                            width 0.16rem
                            height 0.16rem
                            border 2px solid #ddd
                            border-radius 50%
                            background #fff
                            box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                            transition transform .3s
                        .left
                            transform translateX(30px)
                       .off
                        background #fff
                        .switch_text
                            float right
                            color #ddd
                       .on
                        background #02a774
                        
                       input
                        height auto
                        width 100%
                        line-height .5rem
                        text-indent 0.05rem
                        font-size 0.17rem
                        outline 0
                        border 2px solid $color
                        border-radius 0.05rem 
                        &:focus
                            border 2px solid #666
                  .btn                
                    width 100%
                    height .4rem
                    background #4cd96f
                    line-height .4rem
                    text-align center
                    border-radius 0.05rem
                    font-size .17rem
                    color #fff
                    outline 0
                    margin-top 0.15rem
                    

       

</style>
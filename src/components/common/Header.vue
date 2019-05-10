<template>
    <div>
        <img class="bg" v-lazy="'/static/bg.jpg'" alt="bg">
        <div class="top-login" v-bind:class="{'scroll-top':!isActive}">
            <ul>
                <li @click="clickshow(registershow)" v-if="!show">Register</li>
                <li @click="clickshow(loginshow)"  v-if="!show">Login</li>
                <li @click="LoginOut();show=false;loreload()" v-if="show">LoginOut </li>
                <li  v-if="show">欢迎你{{userinfo.username}}</li>
                <ul class="tab-header clearfix">
                    <router-link :to="{ name:'home' }"><li>首页</li></router-link>
                    <li>游戏类别</li>
                    <li>游戏商城</li>
                    <li>游戏</li>
                </ul>
            </ul>
        </div>
        
        <login v-if="dialog.title=='login'" v-on:change="successshow"></login>
        <register v-if="dialog.title=='register'"></register>
        
    </div>
</template>
<script>
import '@/assets/css/header.css'
import login from '@/views/login/login'
import register from '@/views/register/register'
import { checkLogin } from '@/utils/mUtils'
import { loginCheck } from '@/service/api'
import { mapState,mapMutations } from 'vuex'
export default {
    name:'header',
    components:{
      login,
      register
    },
    data(){
        return{
            isActive:true,
            show:false,
            loginshow:{
                message:'login',
                title:'login',
                persistent:true
            },
            registershow:{
                message:'register',
                title:'register',
                persistent:true
            }
        }
    },
    mounted(){
        this.locheck()
        window.addEventListener('scroll', this.handleScroll, true); 
    },
    computed:{
      ...mapState(["dialog","userinfo",'token'])
    },
    methods:{
        ...mapMutations(["showDialog",'LoginOut','setUserinfo','setToken']),

        clickshow(cshow){
            this.showDialog(cshow)
        },
        locheck(){
            
            if(localStorage.getItem('token')){
                this.setToken(localStorage.getItem('token'))
                console.log(this.token)
            }
             loginCheck().then(res=>{
             if(res.status=="200"){
              let rs=res.data;
              this.setUserinfo(rs.result)
              this.show=true
              console.log(this.userinfo)
          }
            
        })
        },
        successshow(show){
          this.show=show
        },
        handleScroll(){
            // 页面滚动距顶部距离
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                      document.body.scrollTop
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if(scrollTop>0){
                this.isActive=false
            }else{
                  this.isActive=true
            }
        },
        loreload(){
            this.$router.go(0)
        }
    }
    

}
</script>
<style scoped>
.bg{
    position: relative;
    width: 100%;
    top: 0;
}
.top-login{
    background:url('../../assets/bg.jpg') no-repeat 0  80px;
    width: 100%;
    height: 80px;
    position: fixed;
    top: 50px;
    color: #dfdfdf;
    transition: top 1s,color 2s,opacity 2s,background-color 1s;
    z-index: 4
}
.scroll-top{
    background:#ffffff;
    opacity: 0.5;
    color: black;
    top: 0px;
}

</style>



<template>
  <dialogcon>
      <div class="res-block">
        <p class="tip">{{message}}</p>
        <label for="loginName">账号</label>
        <input class="loginName" type="text" v-model="account"><br>
        <label for="re-password">密码</label>
        <input class="re-password" type="password" v-model="password"><br>
        <label for="userName">用户名</label>
        <input class="userName" type="text" v-model="username"><br>
        <label for="phone">电话</label>
        <input class="phone" type="text" v-model="phone"><br>
        <label for="mail">邮箱</label>
        <input class="mail" type="text" v-model="mail"><br>
        <button class="b-sure" @click="register" >确定</button>
        <button class="b-login_a" @click="showlogin">登录</button>
    </div>
  </dialogcon>
    
</template>
<script>
import '@/assets/css/header.css'
import dialogcon from '@/components/common/dialogcon'
import {sendregister} from '@/service/api'
import { mapState,mapMutations } from 'vuex'
export default {
    name:'register',
    data(){
        return{
           account:'',
           password:'',
           username:'',
           phone:'',
           mail:'',
           message:'',
        }
    },
    components:{
       dialogcon
    },
    computed:{
        ...mapState(['dialog'])
    },
    methods:{
        ...mapMutations(['showDialog']),
        showlogin(){
            this.showDialog({
                message:'login',
                title:'login',
                persistent:true
                })
        },
        register:function(){
            if(!this.account || !this.password || !this.username || !this.phone || !this.mail){
                 this.message="*所填项不能为空"
                 return ;
            }
            sendregister(
              this.account,
              this.password,
              this.username,
              this.phone,
              this.mail
            ).then((rs)=>{
               let res=rs.data
               if(res.status=="0"){
                   alert("注册成功");
                   this.$emit('registered')
               }else if(res.status=="1"){
                   alert(res.msg)
               }
            })
        }
    }
}
</script>
<style scoped>
 .tip{
    position: absolute;
    left: 84px;
    top: 10px;
    color: red;
    font-size: 12px;
 }
</style>



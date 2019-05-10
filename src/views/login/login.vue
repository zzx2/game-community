<template>
    <div>
        <dialogcon>
            <div>
                <p class="tip">{{message}}</p>
                <label for="username">账号</label>
                <input  class="username"  type="text" v-model="account"><br>
                <label for="password" >密码</label>
                <input  class="password" type="password" v-model="password"><br>
                <button class="b-login" @click="clogin">登录</button>
                <button class="b-register" @click="registerlogin">注册</button>
            </div> 
        </dialogcon>
    </div>
</template>
<script>
import '@/assets/css/header.css'
import dialogcon from '@/components/common/dialogcon'
import { sendlogin } from '@/service/api'
import { mapState,mapMutations } from 'vuex'

export default {
    name:'login',
    data(){
        return{
            account:'',
            password:'',
            message:''
        }
    },
    props:{
        loginshow:Boolean,
    },
    computed:{
      ...mapState(["dialog"])
    },
    components:{
       dialogcon
    },
    mounted(){
     
    },
    methods:{
        ...mapMutations(["showDialog","loginSuccess","setUserinfo"]),
        registerlogin(){
            this.showDialog({
                message:'register',
                title:'register',
                persistent:true
                })
        },
        
        clogin:function(){
             if(!this.account || !this.password){
                 this.message='*账号密码不能为空'
                 return ;
             }
             sendlogin(
                 this.account,
                 this.password
             ).then((rs)=>{
                 let res=rs.data;//获取后台数据
                 if(res.status=="0"){
                     alert("登录成功")
                     this.showDialog({
                        message:'',
                        title:'',
                        persistent:false
                        })
                     this.loginSuccess(res.token)//设置秘钥
                     this.setUserinfo(res.result)//设置用户信息
                     this.$emit('change',true)
                      this.$router.go(0)
                     
                 }else{
                     alert("用户名或者用户密码错误")//登录失败
                 }
             }).catch()
        
        }
    }
    
}
</script>
<style scoped>
.tip{
    position: absolute;
    left: 70px;
    top: 13px;
    color: red;
    font-size: 12px;
}
</style>

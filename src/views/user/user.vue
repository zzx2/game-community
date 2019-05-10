<template>
    <div >
        <ul class="user-block" ref="userBlock">
            <li><i>个人中心</i></li>
            <li><i>用户名:</i><span>{{userinfo.username}}</span></li>
            <li><i>关注数:</i><span>{{userinfo.firends}}</span></li>
            <li><i>发帖数:</i><span>{{userinfo.acount}}</span></li>
            <li><i>邮箱:</i><span>{{userinfo.mail}}</span></li>
        </ul>
    </div>
</template>
<script>
import '@/assets/css/header.css'
import { mapState } from 'vuex'
import {throttle} from '@/utils/mUtils'
export default {
    name:'user',
    computed:{
        ...mapState(['userinfo'])
    },
    mounted(){
       window.addEventListener('scroll',throttle(this.handleScroll,500),true); 
    },
    methods:{
     handleScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                      document.body.scrollTop
            if(this.$refs.userBlock){
            var child=Array.prototype.slice.call(this.$refs.userBlock.children,0) 
            var add=function(item){
             
            return new Promise((resolve,reject)=>{
                   setTimeout(()=>{
                       resolve(item)
                   },200)
            })
            }
             async function addmove(Arr){
                 for(let item of Arr){
                     await add(item)
                     item.classList.add('move')
                 }
                 
             }
             if(scrollTop>200){
                 addmove(child)
             }
           }
        }

    },
    
}
</script>
<style lang="scss" scoped>
  /* user */

.user-block{
    float: left;
    position: relative;
    margin: 60px;
    color: #dfdfdf;
    li{
        font-size: 16px;
        margin: 20px 5px;
        width: 260px;
        height: 75px;
        background: url('../../assets/slide-content.png') no-repeat;
        background-size:cover;
        transform: translateX(-280px);
        i{
            font-size: 20px;
            line-height: 75px;
            margin: 20px;
        }
         span{
            font-size: 16px;
            line-height: 75px;
        }
    }
    & :nth-child(1){
        text-align: center
    }
    .move{
        transform: translateX(0);
        animation: move 2s
    }
}


.b-clear{
  width: 70px;
  height: 30px;
  margin: 0 0 30px  168px;
  font-size: 16px;
  background: #0066FF;
  border-radius: 10%;
  color: #dfdfdf;
}

@keyframes move{
    0% {transform: translateX(-260px)}
    50% {transform:translateX(20px)}
    75%{transform:translateX(-10px)}
    100%{transform:translateX(0)}
}
</style>



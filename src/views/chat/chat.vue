<template>
    <div id="chatbg">
        
        <div  class="al-g">
          
          <ul class="al-con" ref="alcon">
            <li><h3>已关注</h3></li>
            <li v-for="item in follow" :key="item.id">
              <i>{{item}}</i>
              <button @click="chatWithSb(item)">私聊</button>
            </li>
        </ul>  
        </div>
        <div class="right" v-show="chatshow">
            <div class="chat-con">
                <p class="somebody">与{{sendperson}}的聊天<i @click="close()" style="position:absolute;right:20px;line-height:20px;cursor: pointer;font-size:20px">x</i></p>
                <div class="chat-top">
                    <div class="a-chat">
                      <ul>
                        <li  v-for="item in list" :key="item.index">
                            <div :class="{'leftmsg':item.name==username,'rightmsg':!(item.name==username)}">
                              <i>{{item.name}}</i>
                              <p>{{item.content}}</p>
                            </div> 
                        </li> 
                      </ul>
                    </div>
                </div>
                <textarea name="" id="chatla" style="margin:0 0 0 25px;width:350px" v-model="content"></textarea>
                <button class="send-btn" @click="sendMessage()">发送</button>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/header.css'
import { mapState } from 'vuex';
import {throttle} from '@/utils/mUtils'
export default {
    name:'chat',
    data:function(){
        return{
          content:'',
          list:[],
          sendperson:'',
          chatshow:false,
          isActive:true,
          username:'',
        }
    },
    computed:{
      ...mapState(["userinfo","follow"])
    },
    mounted(){
      this.getMessage()
     window.addEventListener('scroll',throttle(this.handleScroll,500),true); 
    },
    updated(){
     this.getMessage()
     console.log(1)
    },
    methods:{
      sendMessage(){
        this.username=this.parseUse(document.cookie).username
        console.log(document.cookie)
      
        socket.emit(this.username,this.username+' '+this.content)
        this.list.push({
          name:this.username,
          content:this.content
        })  
        console.log('发送消息成功')
        
        this.content=""
      },
      getMessage(){
        if(this.sendperson)
         socket.on(this.sendperson,(msg)=>{
           var obj={
           name:this.sendperson,
           content:msg
          }
          console.log(obj)
          if(this.list.length==0){
             this.list.push(obj)
          }
          for(var i=0;i<this.list.length;i++){
            if((this.list[i].content!==obj.content)&&(i==this.list.length-1)){
               this.list.push(obj)
            }
          }
          console.log('接收消息成功')
         })
      },
      chatWithSb(somebody){
        this.chatshow=true;
        this.sendperson=somebody
      },
      close(){
        this.chatshow=false
      },
      parseUse(cookie){
          var obj={}
          cookie.split("; ").forEach(item => {
            item=item.split("=")
            obj[item[0]]=item[1]
          });
          return obj
          
      },
      handleScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                      document.body.scrollTop
            if(this.$refs.alcon){
            var child=Array.prototype.slice.call(this.$refs.alcon.children,0) 
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
             if(scrollTop>600){
                 addmove(child)
             }
           }
        }
    },

}

</script>
<style lang='scss' scoped>
#chatbg{
    position: relative;
    height: 500px;
}
#whitebg{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000000;
    opacity: 0.5;
}
.al-g{
  float: left;
  width: 250px;
  height: 400px;
  border-radius: 5%;
  margin: 0 0 0 57px;
  color: #ffffff;
}
.al-g{
    h3{
      margin: 20px 0 0 20px;
      line-height: 50px;
      text-align: left;
    }
    .al-con{
      margin: 20px 0 0 20px;
      li{
        margin: 20px 0 0 0;
        height: 50px;
        background:url('../../assets/chatbg.png') no-repeat;
        background-size: cover;
        transform: translateX(-280px);
        button{
          margin: 0 0 0 100px;
          width: 50px;
            height: 20px;
            font-size: 16px;
            background: #8DB6CD;
            border-radius: 10%;
            color: #dfdfdf;
        }
        i{
          margin: 20px 0 0 20px;
          line-height: 50px;
        }
      }
      .move{
        transform: translateX(0); 
        animation: move 2s
      }
    }
} 

.right{
    overflow: hidden;
    .somebody{
    text-align: center;
    margin: auto;
    color: #ffffff
  }
}
.chat-con{
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 400px;
  background: #708090;
  border-radius: 5%;
  margin: 0 115px;
}
.chat-top{
  width: 350px;
  height: 224px;
  background: #ffffff;
  margin: 10px auto 20px;
  overflow: auto;
  padding-bottom: 10px;
}
#chatla{
  max-width: 350px;
  min-height: 90px;
  margin: auto;
  margin-top: 5px;
  border: 0;
  line-height: 23px;
  outline: 0;
  background:#ffffff;
}
.a-chat{
  margin:0 20px;
  
   .rightmsg{
     height: 40px;
      i{
      display: block;
      width: fit-content;
      padding: 1px 10px;
      border-radius:5px;
      background: #7da5e0;
      margin: 10px 0 0 0;
      float: right;
     }
      p{
        margin:5px 10px 0 0; 
        width: fit-content;
        border-radius: 5px;
        line-height: 1.1;
        padding: 7px;
        background: #c0cac6;
        float: right;
        &:after{
        content: '';
        width:0;
        height:0;
        border-width:9px;
        border-style:solid;
        border-color:transparent  transparent transparent #c0cac6;/*透明 灰 透明 透明 */
        margin:  -2px -24px;
        position:relative;
        float: right;
      }
      }
      
  }
   .leftmsg{
     height: 40px;
    i{
      display: block;
      width: fit-content;
      padding: 1px 10px;
      border-radius:5px;
      background: #7da5e0;
      margin: 5px 0 0 0;
      float: left;
    }
    p{
      margin:5px 0 0 59px; 
      width: fit-content;
      border-radius: 5px;
      line-height: 1.1;
      padding: 7px;
      background: #a0ea14;
      float: inherit;
      &:before{
        content: '';
        width:0;
        height:0;
        border-width:9px;
        border-style:solid;
        border-color:transparent #a0ea14 transparent transparent;/*透明 灰 透明 透明 */
        margin:  -2px -24px;
        position:relative;
        float: left;
      }
    }
    
   }
  
  
} 
.send-btn{
    width: 70px;
    height: 30px;
    font-size: 16px;
    margin:0 20px;
    float: right;
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

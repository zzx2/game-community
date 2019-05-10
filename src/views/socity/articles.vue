<template>
    <div>
        <div id="as" v-bind:class="{move:isActive}">
            <button class="a-but" @click="writeshow">发帖</button>
            <i class="icon"></i><input  classtype="text" v-model="searchatis">
            <ul class="atis" v-bind:class="{show:showActive}">
                <li v-for="article in pages.pagesshow" :key="article._id">
                    <router-link :to="{name:'article',params:{aId:article._id}}">
                        <p class="a-til"><i>{{article.atitle}}</i></p>
                    </router-link>
                    <span class="a-ach">{{article.author}}</span>
                    <button class="button-follow" v-if="showfollow(article.author)">已关注</button>
                    <button @click="addfriend(article.author)" v-if="!showfollow(article.author)">关注</button>
                </li>
            </ul>
            <ul class="fenye">
                <li class="nbutton" @click="pageup">上一页</li>
                <li  v-for="page in pages.pagenum" :key="page">
                    <i v-bind:class="{touch:(page==pages.inpage)}" @click="pageshow(page)">{{page}}</i>
                </li>
                <li class="nbutton" @click="pagedown">下一页</li>
            </ul>
            <write v-if="dialog.title=='write'"></write>
        </div>
    </div>
    
</template>
<script>
import '@/assets/css/header.css'
import write from './write'
import {getAritcle,addFriend} from '@/service/api'
import {throttle} from '@/utils/mUtils'
import { mapState,mapMutations } from 'vuex'
export default {
    name:'articles',
    components:{
       write
    },
    data(){
        return{
            articles:[],
            searchatis:'',
            isActive:false,
            showActive:false,
            pages:{
                inpage:1,
                pagenum:1,
                pagesshow:[],
            },
            follow:[]
        }
    },
    mounted(){
      this.getarticle()
      window.addEventListener('scroll', throttle(this.handleScroll,500), true);
    },
    updated(){
     this.afollow()
    },
    computed:{
       ...mapState(["dialog","userinfo"])
    },
    methods:{
         ...mapMutations(["showDialog"]),
        writeshow:function(){
            this.showDialog({
                message:'write',
                title:'write',
                persistent:true
            })
        },
        updatearti:function(ar){
           this.articles=ar
        },
        getarticle:function(){
            getAritcle().then((rs)=>{
                let res=rs.data
                if(res.status=="0"){
                    this.articles=res.result.alst
                    this.setpage()
                    this.pageshow(1)
                }
            })
        },
        addfriend:function(author){
           addFriend(
             author
           ).then((rs)=>{
               let res=rs.data
               if(res.status=="0"){
                   console.log("关注好友成功")
               }
           })
        },
        checkfollow:function(){

        },
        handleScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                      document.body.scrollTop 

            var add=()=>{
                this.isActive=true
                return new Promise((resolve,reject)=>{

                    setTimeout(()=>{
                        this.showActive=true
                    },1000)
            })
            }
            
             if(scrollTop>200){
                 add()
             }
           },
        setpage(){
            var total=this.articles;
            this.pages.pagenum=Math.floor(total.length/5)
            if(total.length/5>0){
                this.pages.pagenum++
            }
        },
        pageshow(index){
            this.pages.inpage=index;
            this.setPageshow(index)
        },
        pagedown(){
            if(this.pages.inpage<this.pages.pagenum){
                 this.pages.inpage+=1
                 this.setPageshow(this.pages.inpage)
                  console.log(this.pages.inpage)
            }
        },
        pageup(){
            if(this.pages.inpage>1){
                 this.pages.inpage-=1
                 this.setPageshow(this.pages.inpage)
                 console.log(this.pages.inpage)
            }
        },
        setPageshow(index){
            this.pages.pagesshow=this.articles.slice((index-1)*5,index*5)
        },
        afollow(author){
            if(this.userinfo.firendsall){
                var firends=this.userinfo.firendsall
                for(var i=0;i<firends.length;i++){
                    if(this.follow.indexOf(firends[i].fname)==-1){
                        this.follow.push(firends[i].fname)
                    }
                }
            }
        },
        showfollow(author){
            
            if(this.follow.indexOf(author)==-1){
                  return false;
            }else{
                return true
            }
        }

    },
    watch:{
        searchatis:function(){
            var arr=[]
            this.articles.forEach((item,index) => {
                if(item.atitle.indexOf(this.searchatis)!==-1){
                      arr.push(item)
                }
            });
            this.pages.pagesshow=arr
            if(this.searchatis==''){
                this.getarticle()
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#as{
    overflow: hidden;
    height: 600px;
    margin:50px;
    background:url('../../assets/bg-invite.png') no-repeat;
    background-size: cover;
    border-radius: 5%;
    transform: translateX(1000px);
    transition: transform 2s;
    .a-but{
        width: 100px;
        height: 50px;
        margin: 100px 30px 30px 100px;
        background: #0066FF;
        border-radius: 10%;
        color: #dfdfdf;
    }
    .a-til{
        color: #000000;
        i{
          &:hover{ border-bottom: #393939 1px solid;}
        }
       
    }
}

#as.move{
    transform: translateX(0); 
}


.atis.show{
    li{
        height: 50px;
    }
}
.atis {
    li{
        width: 900px;
        height: 0;
        line-height: 50px;
        font-size: 0;
        transition: height 1s;
    }
}
.atis{
    li{
         p{
            width: 600px;
            display:inline-block;
            height: 0;
            margin-left: 150px;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
        }
        span{
            font-size: 14px;
            color:#393939;
        }
    }
    button{
        width: 40px;
        height: 20px;
        line-height: 1;
        font-size: 16px;
        margin: 0 0 0 5px;
        background: #0066FF;
        border-radius: 10%;
        color: #dfdfdf;
    }
    .button-follow{
        width: 55px;
        height: 20px;
        line-height: 1;
        font-size: 16px;
        margin: 0 0 0 5px;
        background: #52575f;
        border-radius: 10%;
        color: #dfdfdf;
    }
} 

.fenye{
    position: absolute;
    bottom: 100px;
    left: 50%;
    margin-left:-100px; 
    font-size: 14px;
    
    li{
        background: #dfdfdf8e;
        float: left;
        line-height: 20px; 
        border: #393939 1px solid;
        margin-left:15px; 
        border-radius:8%; 
        box-shadow: 1px 1px 1px 2px #dfdfdf8e;
        width: 25px;
        height: 25px;
        cursor: pointer;
        i{
            display: block;
            padding:2px 0 0 7px;
            width: 100%;
            height: 100%;
            background: #dfdfdf8e;
            transition: background-color 1s;
        }
        .touch{
            background: #585656d8;
        }
    }
    .nbutton{
        padding:2px 0 0 6px;
        width: 60px;
        &:active{
            box-shadow: 0px 0px 0px 0px #dfdfdf8e;
        }
    }
}

</style>

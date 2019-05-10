<template>
    <div class="right">
        <Header></Header>
        <article class="ati" ref="atl" v-bind:class="{Active:isActive}">
          <section>
              <diV class="whitebg"></diV>
              <h1>{{article_con.atitle}}</h1>
              <p>作者：{{article_con.author}}</p>
              <div class="content">
                 <blockquote>{{article_con.acontent}}</blockquote>
               </div>
          </section>
        </article>
        <div class="footer"></div>
    </div>
</template>
<script>
import Header from '@/components/common/Header'
import {getCon} from '@/service/api'
import {throttle} from '@/utils/mUtils'
export default {
    name:'articleDetail',
    data(){
        return{
           article_con:{},
           isActive:false
        }
    },
    components:{
      Header
    },
    mounted(){
       this.getContent()
       window.addEventListener('scroll', throttle(this.handleScroll,500), true);
    },
    methods:{
        handleScroll(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                    document.body.scrollTop
            if(scrollTop>200){
                this.isActive=true
            }
        },
        getContent(){
            getCon(this.$route.params.aId).then(res=>{
                let rs=res.data
                if(rs.status=="0"){
                     this.article_con=rs.result
                }
            })
        }

    }
}
</script>
<style  lang="scss" scoped>
.right{
    background: #000000;
}

.ati{
    position: relative;
    margin: auto;
    background: url('../../assets/a-bg2.png') no-repeat;
    background-size: 100%;
    height: 200px;
    width: 1000px;
    overflow: hidden;
    transition:height 4s;
     h1{
        margin:240px 0 0 200px; 
    }
    p{
        font-size: 20px;
        margin:20px 0 0 250px; 
    }
}
.ati.Active{
height: 800px;
}
.whitebg{
    position: absolute;
    left: 150px;
    top: 220px;
    background: #ffffff;
    width: 700px;
    height: 680px;
    opacity: 0.2;
    border-radius:5%; 
    z-index: 1;
    overflow: auto;
}
.ati,h1,p,.content{
    position: relative;
    z-index: 3
}
.content{
    width: 800px;
    margin:50px 0 0 200px; 
    font-size: 20px;
    blockquote{
        width: 600px;
        overflow-wrap:break-word 
    }
}
.footer{
    margin:auto;
    background: url('../../assets/a-bg2.png') no-repeat 0 -1190px ;
    background-size: 100%;
    height: 160px;
    width: 1000px;
}
</style>

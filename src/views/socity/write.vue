<template>
  <dialogcon>
    <div class="diaog-w">
        <label for="w-title">标题：</label><br>
        <textarea name="w-title" id="w-title" cols="50" rows="1" v-model="atitle"></textarea><br>
        <label for="w-content">内容：</label><br>
        <textarea name="w-content" id="w-content" cols="60" rows="20" v-model="acontent"></textarea>
        <button class="b-fabu" @click="write">发布</button>
    </div>
  </dialogcon>
</template>
<script>
import '@/assets/css/header.css'
import {writeAriticle,getAritcle,adduserArti} from'@/service/api'
import dialogcon from '@/components/common/dialogcon'
import { mapState,mapMutations } from 'vuex'
export default {

    name:'write',
    data(){
        return{
          atitle:'',
          acontent:'',
          articles:[]
        }
    },
    props:{
      showl:Boolean
    },
    components:{
       dialogcon
    },
    computed:{
        ...mapState(["dialog"])
    },
    methods:{
        ...mapMutations(["showDialog","loginSuccess"]),
        write:function(){
            if(!this.atitle || ! this.acontent){
                alert("标题或内容不能为空")
                return ;
            }
            writeAriticle(
                this.atitle,
                this.acontent
            ).then((rs)=>{
               let res=rs.data
               if(res.status=="0"){
                   this.getarticle()
                   this.adduserarti()
                   alert("发帖成功")
                   this.showDialog({
                        message:'',
                        title:'',
                        persistent:false
                    })
               }
            })
        },
        getarticle:function(){
           getAritcle().then((rs)=>{
                let res=rs.data
                if(res.status=="0"){
                    this.articles=rs.data.result.alst
                }
            })
        },
        adduserarti:function(){
            adduserArti(
                 this.atitle
            ).then((rs)=>{
                let res=rs.data
                if(res.status=="0"){
                    console.log("添加成功")
                }
            })
        }
    }
}
</script>
<style scoped>
.close{
    right: -130px;
    top: -289px;
    z-index: 9999
}
</style>

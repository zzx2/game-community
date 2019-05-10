<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import articles from '@/views/socity/articles'
export default {
    name:'socity',
    data(){
        return{
           show:true
        }
    },
    components:{
        articles
    },
    methods:{
       
    }
}
</script>

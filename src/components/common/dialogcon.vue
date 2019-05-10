<template>
    <div>
        <div id="b-lo" v-if="dialogshow.persistent">
            <i class="close" @click="close">×</i>
            <slot></slot>
        </div>
        <div class="cover" v-if="dialogshow.persistent" @click="close"></div>
    </div>
</template>
<script>
import { mapState,mapMutations} from 'vuex'
export default {
    name:'dialog',
    data(){
        return{
            diashow:false,
            diaclose:{
              persistent:false
            }
        }
    },
    props:{
        show:Boolean
    },
    computed:mapState({
       dialogshow:state=>state.dialog
    }),
    watch:{

    },
    methods:{
        ...mapMutations(["showDialog"]),
        close:function(){
            this.showDialog(this.diaclose)
        },
    }
    
}
</script>
<style scoped>
  #b-lo{
    position: fixed;
    width: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background:#dfdfdf;
    border-radius: 5%;
    z-index: 999
}
.cover{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    z-index: 998;
    opacity: 0.8;
}
.close{
    position: absolute;
    right: 12px;
    display: block;
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
}
</style>

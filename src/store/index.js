import vue from 'vue'
import vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

vue.use(vuex)

const state={
    userinfo:{},  //用户名
    follow:[],
    token:'',  //秘钥
    dialog:{
        message:'',
        title:'',
        persistent:false
    }, //弹窗的状态 
}

export default new vuex.Store({
	state,
	actions,
	mutations,
})
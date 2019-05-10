import {setStore, getStore} from '../utils/mUtils'

export default{

    loginSuccess:(state,token)=>{
       setStore("token",'Bearer'+" "+token)
       state.token=localStorage.getItem("token")
    },
    changeNetwork:()=>{

    },
    showDialog(state,{message,title='',persistent=false}){
       state.dialog={
           title,
           message,
           persistent
       }
    },
    setUserinfo:(state,userinfo)=>{
       setStore("username",userinfo.username)
       state.userinfo=userinfo
       var firends=userinfo.firendsall
            for(var i=0;i<firends.length;i++){
                if(state.follow.indexOf(firends[i].fname)==-1){
                    state.follow.push(firends[i].fname)
                }
            }
    },
    LoginOut:(state)=>{
        state.token=""
        state.userinfo=""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
    },
    setToken:(state,token)=>{
        state.token=token
    }

} 
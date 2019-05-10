import axios from '../config/axios'


// 登录接口
export const sendlogin=(ac,pw)=>axios.post("/users/login",{
    account:ac,
    password:pw
})


// 注册接口
export const sendregister=(ac,pw,un,ph,ml)=>axios.post("/users/register",{
    account:ac,
    password:pw,
    username:un,
    phone:ph,
    mail:ml
  })
//登录验证
export const loginCheck=()=>axios.get("/users/logincheck")


//获取文章接口
export const getAritcle=()=>axios.get("/articles")


// 填写文章的接口
export const writeAriticle=(at,acon)=>axios.post('/articles/write',{
    atitle:at,
    acontent:acon
})

// 将文章添加到个人信息的接口
export const adduserArti=(at)=>axios.post('/users/userarti',{
    atitle:at
})
// 获取文章内容
export const getCon=(aid)=>axios.get('/articles/content?_id='+aid)









// 关注好友的接口
export const addFriend=(author)=>axios.post('users/addfriend',{
    fname:author
})

<template>
  <div>
    <div class="home">
      <Header></Header>
      <user></user>
      <articles></articles>
      <chat></chat>
      <Footer></Footer>
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import articles from '@/views/socity/articles'
import user from '@/views/user/user'
import Footer from '@/components/common/footer'
import chat from '../chat/chat'
export default {
  name: 'home',
  components:{
    Header,
    articles,
    user,
    Footer,
    chat
  }
}
</script>
<style scoped>
 .home{
   background: #000000;
 }
</style>
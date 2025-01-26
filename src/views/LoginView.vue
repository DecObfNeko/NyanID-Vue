<template>
<div class="hero glass min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <p class="py-8 footer-title">
        Login to NyanID for full online service support ฅ(＞﹏＜) 
      </p>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
  <div class="divider lg:divider-horizontal"></div>
</div>
    <div class="card w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body footer-title">
        <h2 class="text-2xl font-bold">Login NyanID</h2>
        <fieldset class="fieldset">
          <label class="fieldset-label">Email</label>
          <input type="email" name="email" class="input" placeholder="Email" v-model="email" required />
          <label class="fieldset-label">Password</label>
          <input type="password" class="input" placeholder="Password" v-model="password" required />
          <div><RouterLink to="/findpwd" class="link link-hover">Forgot password?</RouterLink>  <RouterLink to="/register" class="link link-hover">Register Now!</RouterLink> </div>
          <button class="btn btn-neutral mt-4" @click="Login" >Login</button>
        </fieldset>
        
      </div>
    </div>
  </div>
</div>


</template>



<script setup lang="ts" name="LoginView">
import { ref, onMounted } from 'vue'
import { login } from '@/api/login.d'
import { ElNotification } from 'element-plus'

const email = ref('')
const password = ref('')

function open(title:any,msg:any,type:any) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

const Login = () => {
  login(email.value, password.value).then(res => {
    if (res.status === 200) {
      console.log(res.data)
      const cookieValue = res.data.token;
      const cookieName = 'myCookie';
      const expiresDays = 7; // Cookie will expire in 7 days
      const expires = new Date(Date.now() + expiresDays * 864e5).toUTCString();
      document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${expires}; path=/`;
      alert('Cookie set successfully!');
    } else {
      console.log(res)
      open('Error', res.data.message, 'error')
    }
  })
}



</script>


<style scoped>




</style>
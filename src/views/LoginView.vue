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
          <div role="alert" class="alert alert-error" v-show="!validateEmail(email) && email.length > 0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error!
              <br />
              The mailbox is malformed!</span>
          </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login.d'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'
import { getUserInfo } from '@/api/userInfo.d'

const email = ref('')
const password = ref('')

const router = useRouter()

// 检查是否存在 LoginToken，如果存在则跳转到主页
const LoginToken = Cookies.get('LoginToken')
const isLogin = ref()
getUserInfo(LoginToken).then(res => {
  if (res.status === 200) {
    isLogin.value = false
  }else{
    Cookies.remove('LoginToken')
    isLogin.value = true
  }
})

if (isLogin.value) {
  open('Error', 'You are already logged in', 'error')
  router.push({ path: "/",replace : true })
}

function open(title: any, msg: any, type: any) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const Login = () => {
  if (!validateEmail(email.value)) {
    open('Error', 'Invalid email format', 'error')
    return
  }

  login(email.value, password.value).then(res => {
    if (res.status === 200) {
      console.log(res.data)
      const LoginCookieValue = res.data.token
      const LoginCookieName = 'LoginToken'
      const expiresDays = 7 // 设置cookie过期时间为7天 
      const expires = new Date(Date.now() + expiresDays * 864e5).toUTCString()
      document.cookie = `${LoginCookieName}=${encodeURIComponent(LoginCookieValue)}; expires=${expires}; path=/`
      open('Success', 'Login successful', 'success')
      setTimeout(() => {
      window.location.href = "/";
      }, 500)
    } else {
      open('Error', res.data.message, 'error')
    }
  }).catch(err => {
    console.error(err)
    open('Error', 'An error occurred', 'error')
  })
}



</script>


<style scoped>




</style>

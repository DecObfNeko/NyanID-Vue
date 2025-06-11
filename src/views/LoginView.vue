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
    <div class="card w-full max-w-sm shrink-0 shadow-2xl bg-amber-50">
      <div class="card-body footer-title">
        <h2 class="text-2xl font-bold">登录到 NyanID 通行证</h2>
        <fieldset class="fieldset" v-if="!VTFA">
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
        
        </fieldset >

        <fieldset class="fieldset" v-else>
          <label class="fieldset-label">2FA验证码</label>
          <input type="text" class="input" placeholder="Code" v-model="code" required />
          <div><RouterLink to="/findpwd" class="link link-hover">Forgot password?</RouterLink>  <RouterLink to="/register" class="link link-hover">Register Now!</RouterLink> </div>
          <button class="btn btn-neutral mt-4" @click="Verify2FA" >验证</button>
        </fieldset>
  
        
      </div>
    </div>
  </div>
</div>
</template>



<script setup lang="ts" name="LoginView">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login,getUserInfo,verify2FA } from '@/api/netcore.d'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'

const email = ref('')
const password = ref('')
const router = useRouter()
const Have2FA = ref([])
const VTFA = ref()

const code = ref('')
const Token = ref([])

onMounted(() => {
getUserInfo(LoginToken).then(res => {
  if (res.status === 200) {
    isLogin1.value = false
    open('Error', 'You are already logged in', 'error')
    router.push({ path: "/",replace : true })
  }else{
    Cookies.remove('LoginToken')
    isLogin1.value = true
  }
})    

});

// 检查是否存在 LoginToken，如果存在则跳转到主页
const LoginToken = Cookies.get('LoginToken')
const isLogin1 = ref()


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


const Verify2FA = () => {
  verify2FA(code.value, Token.value).then(res => {
    if (res.status === 200) {
      const LoginCookieValue = res.data.token
      const LoginCookieName = 'LoginToken'
      const expiresDays = 7
      const expires = new Date(Date.now() + expiresDays * 864e5).toUTCString()
      document.cookie = `${LoginCookieName}=${encodeURIComponent(LoginCookieValue)}; expires=${expires}; path=/`
      open('Success', 'Login successful', 'success')
      setTimeout(() => {
        window.location.href = "/";
      })
    }else{ 
          open('Error', "2FA验证码错误或已过期喵!", 'error')
    }
  })
}



const Login = () => {
  if (!validateEmail(email.value)) {
    open('Error', 'Invalid email format', 'error')
    return
  }

  login(email.value, password.value).then(res => {
    if (res.status === 200) {
      if (res.data.have2fa) {
        VTFA.value = res.data.have2fa
        Token.value = res.data.Token
      }else{  
        VTFA.value = false
        const LoginCookieValue = res.data.token
        Have2FA.value = res.data.have2fa
        const LoginCookieName = 'LoginToken'
        const expiresDays = 7 // 设置cookie过期时间为7天 
        const expires = new Date(Date.now() + expiresDays * 864e5).toUTCString()
        document.cookie = `${LoginCookieName}=${encodeURIComponent(LoginCookieValue)}; expires=${expires}; path=/`
        open('Success', 'Login successful', 'success')
        setTimeout(() => {
        window.location.href = "/";
        }, 300)
      }
    } else {
      open('Error', res.data.message, 'error')
    }
  }).catch(err => {
    console.error(err)
    open('Error', 'An error occurred', 'error')
  })
}
</script>
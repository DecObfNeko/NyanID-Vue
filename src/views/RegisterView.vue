<template>
<div class="hero glass min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <p class="py-8 footer-title">
        Register NyanID  ฅ(＞﹏＜) 
      </p>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
  <div class="divider lg:divider-horizontal"></div>
</div>
    <div class="card w-full max-w-sm shrink-0 shadow-2xl bg-amber-50">
      <div class="card-body footer-title">
        <h2 class="text-2xl font-bold">Register NyanID</h2>
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
          <label class="fieldset-label">Username</label>
          <input type="text" class="input" placeholder="Username" v-model="username" required />
          <label class="fieldset-label">Password</label>
          <input type="password" class="input" placeholder="Password" v-model="password" required />
          <RouterLink to="/PrivacyPolicy" class="link link-hover">You should read our Privacy Policy before registering</RouterLink>
          <div><RouterLink to="/findpwd" class="link link-hover">Forgot password?</RouterLink>  <RouterLink to="/login" class="link link-hover">Login Now!</RouterLink> </div>
          <button class="btn btn-neutral mt-4" @click="Register" >Register</button>
        </fieldset>
        
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'
import { register } from '@/api/netcore.d'

const email = ref('')
const password = ref('')
const username = ref('')

const router = useRouter()

// 检查是否存在 LoginToken，如果存在则跳转到主页
const LoginToken = Cookies.get('LoginToken')

if (LoginToken) {
  open('Error', 'You are already logged in', 'error')
  router.push({ path: "/user" })
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

function Register() {
  register(username.value, password.value, email.value).then(res => {
  if (res.status === 200) {
    open('Success', res.data.message, 'success')
  } else {
    open('Error', res.data.message, 'error')
  }
  }).catch(err => {
    open('Error', 'Network error', 'error')
  })
}


</script>
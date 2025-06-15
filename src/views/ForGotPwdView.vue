<template>
  <div class="hero glass min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <p class="py-8 footer-title">
          {{ $t('ForGotPwdView-title') }}
        </p>
      </div>
      <div class="flex w-full flex-col lg:flex-row">
    <div class="divider lg:divider-horizontal"></div>
  </div>
      <div class="card w-full max-w-sm shrink-0 shadow-2xl bg-amber-50">
        <div class="card-body footer-title">
          <h2 class="text-2xl font-bold">{{ $t('ForGotPwdView-fgp') }}</h2>
          <fieldset class="fieldset">
            <label class="fieldset-label">{{ $t('ForGotPwdView-email') }}</label>
            <input type="email" name="email" class="input" placeholder="Email" required  v-model="email"/>
            <div role="alert" class="alert alert-error" v-show="!validateEmail(email) && email.length > 0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ $t('ForGotPwdView-err') }}
              <br />
              {{ $t('ForGotPwdView-errmsg') }}</span>
            </div>

            <div><RouterLink to="/login" class="link link-hover">{{ $t('ForGotPwdView-login') }}</RouterLink>  <RouterLink to="/register" class="link link-hover">{{ $t('ForGotPwdView-reg') }}</RouterLink> </div>
            <button class="btn btn-neutral mt-4" @click="ForgotPwd">{{ $t('ResetPwd-rrpwd') }}</button>
          </fieldset>
          
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
<script setup lang="ts" name="ForgotPasswordView">
import { onMounted, ref } from 'vue';
import { ForGotPwd } from '@/api/netcore.d'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const email = ref('')

const router = useRouter()

onMounted(() => {
  document.title = 'NyanID | 忘记密码'
})

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

const ForgotPwd = () => {
  if (!validateEmail(email.value)) {
    open('Error', 'Invalid email format', 'error')
    return
  }

  ForGotPwd(email.value).then(res => {
    if (res.status === 200) {
      open('Success', 'Password reset email sent successfully', 'success')
      router.push({ path: `/resetpwd/${email.value}` })
    } else {
      open('Error', res.data.message, 'error')
    }
  })
}

</script>

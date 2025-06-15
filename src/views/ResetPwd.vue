<template>
  <div class="hero glass min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <p class="py-8 footer-title">
          {{ $t('ResetPwd-title') }}
        </p>
      </div>
      <div class="flex w-full flex-col lg:flex-row">
    <div class="divider lg:divider-horizontal"></div>
  </div>
      <div class="card w-full max-w-sm shrink-0 shadow-2xl bg-amber-50">
        <div class="card-body footer-title">
          <h2 class="text-2xl font-bold">{{ $t('ResetPwd-rrpwd') }}</h2>
          <fieldset class="fieldset">
            <label class="fieldset-label">{{ $t('ResetPwd-email') }}</label>
            <input type="email" name="text" class="input" :placeholder='ResetEmail' :disabled="true" />
            <label class="fieldset-label">{{ $t('ResetPwd-VerificationCode') }}</label>
            <input type="code" name="code" class="input" placeholder='Code' v-model="code" />
            <label class="fieldset-label">{{ $t('ResetPwd-npwd') }}</label>
            <input type="pwd" name="pwd" class="input" placeholder='New Password' v-model="pwd"/>

            <div><RouterLink to="/login" class="link link-hover">{{ $t('ForGotPwdView-login') }}</RouterLink>  <RouterLink to="/register" class="link link-hover">{{ $t('ForGotPwdView-reg') }}</RouterLink> </div>
            <button class="btn btn-neutral mt-4" @click="i_RestPwd">{{ $t('ResetPwd-rpwd') }}</button>
          </fieldset>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ResetPwd">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { ResetPwd } from '@/api/netcore.d'
import { ElNotification } from 'element-plus'

const router = useRouter()
const route = useRoute()

const pwd = ref('')
const code = ref('')
const ResetEmail = ref('')
ResetEmail.value = route.params.email as string

onMounted(() => {
  document.title = 'NyanID | 重置密码'
})

const open = (title: any, msg: any, type: any) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

const i_RestPwd = () => {
  ResetPwd(ResetEmail.value, code.value, pwd.value).then(res => {
  if (res.status === 200) {
    open('Success', 'Password reset successfully', 'success')
    router.push('/login')
  } else {
      open('Error', res.data.message, 'error')
  }
}).catch(err => {
  open('Error', 'Server Error', 'error')
})}

</script>
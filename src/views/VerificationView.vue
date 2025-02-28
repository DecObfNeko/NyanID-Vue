<template>
<div class="card lg:card-side shadow-sm flex  md:flex-row ">
  <div class="relative">
    <h2 class="absolute left-[400px] top-[412px] rotate-335 rounded scale-300 footer-title" style="color: darkred;">{{ msg }}</h2>
    <h2 class="absolute left-[400px] top-[650px] rotate-350 rounded  scale-250 footer-title" style="color: darkred;"><span class="loading loading-spinner loading-xl"></span></h2>
    <img
      style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;"
      src="@/assets/img/Image_1740734995013.png"
      alt="Album" />
      
  </div>
</div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { verification } from '@/api/verification.d'
import { ElNotification } from 'element-plus'
const router = useRouter()
const route = useRoute()
const token = ref('')
const msg = ref('')

const open = (title: any, msg: any, type: any) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}


onMounted(() => {
  msg.value = "Verifying the legitimacy of your email address"
  token.value = route.params.token as string
  verification(token.value).then(res => {
    if (res.status === 200) {
      msg.value = "Verifying.........................."
      open('Success', 'Verification success', 'success')
      setTimeout(() => {
        router.push({ path: "/login" })
      }, 1900)
    } else {
      msg.value = "Validation failed :("
      open('Error', res.data.message, 'error')
      setTimeout(() => {
        router.push({ path: "/" })
      }, 900)
    }
  }).catch(err => {
    msg.value = "Validation failed :("
    open('Error', 'Network error', 'error')
    setTimeout(() => {
        router.push({ path: "/" })
      }, 900)
  })
  }
)
</script>
<template>
<div class="card card-border bg-base-100 w-96">
  <div class="card-body">
    <h2 class="card-title"><span class="loading loading-spinner loading-xl"></span></h2>
    <p>{{ msg }}</p>
    <div class="card-actions justify-end">
    </div>
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
      }, 900)
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
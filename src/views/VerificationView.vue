<template>
    <span class="loading loading-ring h-80 w-80"></span>
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

const open = (title: any, msg: any, type: any) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

onMounted(() => {
  token.value = route.params.token as string
  verification(token.value).then(res => {
    if (res.status === 200) {
      open('Success', 'Verification success', 'success')
      router.push({ path: "/login" })
    } else {
      open('Error', res.data.message, 'error')
    }
  }).catch(err => {
    open('Error', 'Network error', 'error')
  })
})
</script>
<template>
  <div class="hero bg-base-200 min-h-screen" id="section">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="@/assets/img/95146846_p0_trans.png" :class="['max-w-sm', { 'animate-fly-in': isMounted }]" />
      <div :class="[{ 'animate-fly-in': isMounted }]">
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 创建一个响应式变量来控制动画
const isMounted = ref(false)

// 在组件挂载时设置 isMounted 为 true
onMounted(() => {
  isMounted.value = true
})
</script>
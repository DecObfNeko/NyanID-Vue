<template>
<footer class="footer sm:footer-horizontal text-base-content p-10 glass fixed-bottom">
  <aside>
    <img src="@/assets/img/logo.png" class="w-16" />
    <p class="footer-title">
        NyaCat Cloud Software Studio.<br />
      <br />
      Copyleft 2018-2025 DecobfnekoDev LTD. All Rights Reserved.
      <br />
    </p>
  </aside>
  <figure>  
 
   <button @click="ClickCat()">
    <p class="footer-title">
    <img src="@/assets/img/9d29c274472bfd1e58bf4e7a2efb180f.png" class="w-40" />
        这是猫猫,你可以摸摸她awa
    </p>
   </button>
  </figure>
  <div class="divider divider-horizontal"></div>

  <nav>
    <h6 class="footer-title">Services & Links</h6>
    <RouterLink to="/aboutus" class="link link-hover">About Us</RouterLink>
    <RouterLink to="/joinus" class="link link-hover">Join us</RouterLink>
    <RouterLink to="/PrivacyPolicy" class="link link-hover">Privacy Policy</RouterLink>
    <RouterLink to="/tos" class="link link-hover">Terms of Service</RouterLink>
    <RouterLink to="/DMCA" class="link link-hover">DMCA</RouterLink>
  </nav>


</footer>

<transition-group name="toast" tag="div">
    <div v-for="(toast, index) in toasts" :key="index" class="toast toast-end" @click="closeToast(index)">
      <div class="alert alert-info" @click="closeToast(index)">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
         </svg>
        <span>{{ clickmsg }}</span>
      </div>
    </div>
  </transition-group>
</template>

<style lang="css" scoped>
.footer {
  background-image: #17436e;
  opacity: 0.9;
}
img {
    -webkit-user-drag: none;
    -moz-user-drag: none;
    -ms-user-drag: none;
    -user-drag: none;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.toast-move {
  transition: transform 0.5s ease;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

// 使用内置的类型定义
const toasts = ref<Array<{ id: number, timer: ReturnType<typeof setTimeout> }>>([])

let toastId = 0
let clickmsg = ref()

function ClickCat() {
    clickmsg.value = "喵喵喵~"


  const id = toastId++
  const timer = setTimeout(() => {
    closeToast(id)
  }, 1000) 

  toasts.value.push({ id, timer })
}

function closeToast(id: number) {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    clearTimeout(toasts.value[index].timer)
    toasts.value.splice(index, 1)
  }
}
</script>
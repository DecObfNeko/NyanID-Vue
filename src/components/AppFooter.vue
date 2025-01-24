<template>
<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 glass ">
  <aside>
    <img src="@/assets/img/logo.png" class="w-16" />
    <p class="footer-title">
        NyaCat Cloud Software Studio.<br />
      <br />
      Copyleft 2018-2024 DecobfnekoDev Industries, LLC. All Rights Reserved.
      <br />
      The source of the picture resources used on this site is the Internet,<br /> if there is any infringement, please contact us to delete.
    </p>
  </aside>
  <figure>  
 
   <button @click="ClickCat()">
    <p class="footer-title">
    <img src="@/assets/img/miaonai.png" class="w-40 animate-bounce" />
        这是猫猫,你可以摸摸她awa
    </p>
   </button>
  </figure>
  <div class="divider divider-horizontal"></div>

  <nav>
    <h6 class="footer-title">Services & Links</h6>
    <a class="link link-hover">Join us</a>
    <a class="link link-hover">Privacy Policy</a>
    <a class="link link-hover">Terms of Service</a>
    <a class="link link-hover">Advertisement</a>
  </nav>


</footer>

<transition-group name="toast" tag="div">
    <div v-for="(toast, index) in toasts" :key="index" class="toast toast-end" @click="closeToast(index)">
      <div class="alert alert-info" @click="closeToast(index)">
        <span>{{ clickmeg }}</span>
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

// 使用内置的类型定义
const toasts = ref<Array<{ id: number, timer: ReturnType<typeof setTimeout> }>>([])

let toastId = 0
let clickmeg = ref()

function ClickCat() {
    clickmeg.value = "喵喵喵~"


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
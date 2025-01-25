<template>
  <transition-group name="toast" tag="div">
    <div v-for="(toast, index) in toasts" :key="toast.id" class="toast toast-end" @click="closeToast(toast.id)">
      <div :class="toast.alertClass" @click="closeToast(toast.id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ toast.msg }}</span>
      </div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Toast {
  id: number;
  msg: string;
  alertClass: string;
  timer: ReturnType<typeof setTimeout>;
}

const toasts = ref<Toast[]>([]);

let toastId = 0;

function Alert(msg: string, typea: string) {
  const id = toastId++;
  const alertClass = `alert alert-${typea}`;
  const timer = setTimeout(() => {
    closeToast(id);
  }, 1000);

  toasts.value.push({ id, msg, alertClass, timer });
}

function closeToast(id: number) {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index !== -1) {
    clearTimeout(toasts.value[index].timer);
    toasts.value.splice(index, 1);
  }
}

// 提供给全局插件使用的接口
defineExpose({
  toasts,
  Alert,
  closeToast
});
</script>

<style scoped>
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
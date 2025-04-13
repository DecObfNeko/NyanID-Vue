<template html>
  <div class="base-300 dark:bg-base-300" v-loading.fullscreen.lock="fullscreenLoading" 
       element-loading-text="喵喵喵? 在加载呢杂鱼awa" type="primary">
    <AppHeader #="body" html data-theme="" :key="Refs"/> 

    <div style="height: 50px; opacity: 0;"></div>

    <div id="section">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>

    <AppFooter />
  </div>
</template>

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus'
import { getServerInfo } from '@/api/netcore.d'

import Cookies from 'js-cookie';

const Refs = ref(Cookies.get('LoginToken'))

const isRouterActive = ref(true)

const fullscreenLoading = ref(false)
const openFullScreen = () => {
  fullscreenLoading.value = true
}
   openFullScreen();
const closeFullScreen = () => {
    fullscreenLoading.value = false
}

    /* 初始化 */
    const initialize = async () => {
       
      await randomImg();
      setTimeout(() => {
        console.log(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠶⠖⠒⠶⠶⠤⣄⣀⠀⠀⢀⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⢀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢲⢮⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠈⠒⠤⡀⠀⠀⠀⠀⣠⠏⠀⠈⠳⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⠀⠀⠀⠈⠑⠢⣄⣴⠃⠀⠀⠀⠀⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣤⣤⣤⣤⣤⡤⡴⢲⠆⣤⣤⢄⣤⣤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣷⣴⣶⣶⣶⣤⢄⡼⠋⠲⢄⡀⠀⠀⠀⠀⠈⢦⣶⣶⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⡶⣤⣤⣤⣤⣤⣤⣤⣾⣾⠃⠀
⠀⠀⠀⠀⠐⠛⠛⠛⠛⠛⣿⣿⡟⢀⣾⣿⢋⣾⣿⠃⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠛⠛⠛⠛⠛⣻⣿⡿⢋⡾⠁⠀⠀⠀⢈⣑⣤⣀⠻⣿⣿⣿⣿⣿⣿⣿⠏⢀⣀⣤⣴⣶⣿⡿⠟⠋⠚⠛⠛⠛⠛⢻⣿⣿⠟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⠏⢀⣾⡿⢣⣾⡿⢃⣾⡿⢣⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⢀⣼⣿⣿⣿⡿⠛⢡⡟⢠⣿⣿⣿⣿⣿⣿⠃⠀⣁⣊⠛⠋⣩⣿⣿⣿⣿⡿⢿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⠋⠀⠀⠀⠀
⠀⠀⢠⣤⣤⣤⣤⣶⣿⠟⢁⣴⣿⠟⣡⣿⣿⣷⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣴⣾⡿⠋⠁⠀⠀⣠⠏⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⢿⣤⣴⣿⡿⠋⠉⠀⢠⣿⣿⠏⠀⠀⠀⣤⣤⣤⣤⣶⣾⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠐⠛⠛⠛⠛⠋⠉⠀⠀⠛⠋⠁⠐⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠿⠿⠛⠋⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠸⠟⠛⠉⠀⠛⠛⠛⠉⠀⠀⠀⠠⠿⠿⠃⠀⠀⠀⠚⠿⠟⠛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠁⣤⣤⣤⡄⣠⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡄⠀⠀⠀⠀⠀⠀⣠⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠜⢀⡾⠷⣶⡏⣼⢣⡟⢀⡾⣵⣿⣿⢃⣴⣯⣿⢀⡾⢋⡾⠛⠛⣼⠛⣿⢣⡞⢸⣇⡼⣫⣾⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠚⠛⠛⠋⠘⠁⠛⠛⠋⠘⠛⠛⠓⠋⠀⠘⠃⠛⠀⠘⠛⠛⠘⠁⠘⠃⠛⠀⠛⠋⠀⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    NyanID - Vue3 DevReBuild 0.3v                      我是玩蔚蓝档案的
      `);}, 200);


    
          };


          onMounted(() => {
            initialize();
          

      });

      function open(title: any, msg: any, type: any) {
        ElNotification({
          title: title,
          message: msg,
          type: type,
        })
      }

      //全站通知
      getServerInfo().then(res => {  
        closeFullScreen();
      if (res.status === 200) {
        if(res.data.Notification !== false) {
          open(res.data.NotificationTypeName,res.data.NotificationData,res.data.NotificationType);
        }
      } else {
        open('Error','Notify that the service is offline!','error');
      }
    
})



    /* 随机背景图片 */
    const imgUrl = ref('');

    const randomImg = async () => {
      // let randomint = Math.floor(Math.random() * 31) + 1;
      const randomint = 4;
      try {
        let m = await import(`@/assets/rimages/${randomint}.png`);
        imgUrl.value = m.default;
        const sectionElement = document.getElementById('section');
        if (sectionElement) {
          sectionElement.style.backgroundImage = `url(${imgUrl.value})`;
        }
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };


// Asynchronous IIFE

</script>

<style scoped>
#section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>/* Fade 动画 - 更适合垂直淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: 
    opacity 0.3s ease-in-out,
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* 保持公共属性 */
  opacity: 1;
  transform: translateY(0);
  border: none;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px); /* 更合理的起始位置 */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* 保持对称运动 */
}

/* Toast 动画 - 更适合侧边滑入提示 */
.toast-enter-active {
  transition: 
    opacity 0.5s ease-out,
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: 
    opacity 0.3s ease-in,
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%); /* 从右侧完全滑入 */
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(50%) scale(0.95); /* 更自然的离开效果 */
}

.toast-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
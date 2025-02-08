<template html>
  <div class="base-300 dark:bg-base-300" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="喵喵喵? 在加载呢杂鱼awa" type="primary">
    <AppHeader #="body" html data-theme="" /> 
  <div style="height: 50px; opacity: 0;"></div>
    <router-view  mode="out-in" v-slot="{ Component }" >
       <div id="section">
       <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
  </div>
</router-view>
  <AppFooter />
</div>
</template>
//把页面拆成一个个component和view然后在这里引入

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { ref, onMounted, reactive } from 'vue';
import { ElNotification } from 'element-plus'
import { getServerInfo } from '@/api/serverInfo.d'


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
      const randomint = 1;
      try {
        let m = await import(`@/assets/rimages/${randomint}.jpg`);
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

<style>
.fade-enter-active {
  transition: opacity 0.3s ease;
  opacity: 1;
  transform: translateY(0);
  border: none;

}
.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateZ(90px);
  border: none;
  background-color: transparent;
}

.fade-enter-from {
  transition: opacity 0.5s ease;
  opacity: 0;
  transform: translateY(80px);
  transition-timing-function: ease-in-out;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s ease;
  transition-timing-function: ease-out;
  transition-property: opacity, transform;
  border: none;
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
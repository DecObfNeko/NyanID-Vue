<template html>
  <div class="base-300 dark:bg-base-300">
    <router-view  mode="out-in" v-slot="{ Component }" >
      <AppHeader #="body" html data-theme=""> 
      </AppHeader>
       <div id="section">
       <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
  </div>
  <AppFooter />
</router-view>
</div>
</template>
//把页面拆成一个个component和view然后在这里引入

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { Application, Assets } from 'pixi.js';
import '@esotericsoftware/spine-pixi-v8';
import {useBgggS} from '@/config/bgenv.d';
import { ref, onMounted, reactive } from 'vue';


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
    NyanID - Vue3 DevReBuild 0.3v                      
`);}, 200);
    };


    onMounted(() => {
      initialize();
});



    /* 随机背景图片 */
    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
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
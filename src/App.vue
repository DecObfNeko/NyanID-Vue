<template html id="section">
    <router-view v-slot="{ Component }">
        <AppHeader #="body" html data-theme=""> 
  </AppHeader>
  <div id="section" mode="out-in">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</div>
       <AppFooter />
</router-view>
</template>
//把页面拆成一个个component和view然后在这里引入

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppBodyImg from '@/components/AppBodyImg.vue';
import AppFooter from './components/AppFooter.vue';
import HomeView from './views/home.vue';


</script>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import config from '@/config/config';

    /* 随机背景图片 */
    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
      console.log(randomint);
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

    /* 初始化 */
    randomImg();


</script>


<style scoped>
#section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
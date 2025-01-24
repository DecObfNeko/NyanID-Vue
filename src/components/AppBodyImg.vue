<template>
<section id="section">
</section>
</template>

<style>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import config from '@/config/config';

    /* 随机背景图片 */
    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
      console.log(randomint);
      try {
        let m = await import(`../assets/rimages/${randomint}.jpg`);
        imgUrl.value = m.default;
        const sectionElement = document.getElementById('section');
        if (sectionElement) {
          sectionElement.style.backgroundImage = `url(${imgUrl.value})`;
        }
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };

    /* 请求 */
    const getServerInfo = async () => {
      try {
        const res = await axios({
          url: `${config.apiUrl}/api/zako/v2/server`,
          method: 'get',
        });
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    /* 初始化 */
    randomImg();
    getServerInfo();


</script>
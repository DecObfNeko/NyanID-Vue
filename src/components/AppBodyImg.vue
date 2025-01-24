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

    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
      console.log(randomint);
      try {
        let m = await import(`../assets/rimages/${randomint}.jpg`);
        imgUrl.value = m.default;
        document.getElementById('section').style.backgroundImage = `url(${imgUrl.value})`;
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };

    randomImg();


</script>
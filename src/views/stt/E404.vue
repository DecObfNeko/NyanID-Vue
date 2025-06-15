<template>
<div class="card lg:card-side shadow-sm flex  md:flex-row ">
  <div class="relative">
    <h2 class="absolute left-[400px] top-[412px] rotate-333 rounded scale-1000 footer-title" style="color: darkred;">{{ $t('E404-title') }}</h2>
    <h2 class="absolute left-[350px] top-[650px] rotate-333 rounded  scale-300 footer-title" style="color: darkred;">{{ $t('E404-msg') }}</h2>
    <RouterLink to="/" class="absolute left-[400px] top-[502px] rotate-333 rounded scale-200 footer-title" style="color: darkred;">{{ $t('E404-back') }}</RouterLink>

    <img
      style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;"
      src="@/assets/img/Image_1740734995013.png"
      alt="Album" />
      
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'NyanID | 404'
})
</script>
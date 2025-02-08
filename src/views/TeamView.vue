<template>
  <div class="container mx-auto py-8">
    <div class="card w-full h-195 shadow-xl bg-base-100">
      <h1 class="text-3xl font-semibold text-center mb-8 mt-10">关于我们</h1>
      <p></p>
      <p style="font-size: 35px;" class="font-semibold text-center">由一群可爱的猫猫创建的工作室DecobfnekoDev</p>
      <p style="font-size: 35px;" class="font-semibold text-center">MahiroHackerฅ(＞﹏＜) No Dimples#1337 here :(</p>
      <div class="card-body">
        <div class="grid lg:grid-cols-4 gap-4">
          <div v-for="developer in developers" :key="developer.id" class="card bg-base-100 h-120 w-90 shadow-xl">
            <figure class="px-10 pt-10">
              <img :src="developer.avatar" alt="Developer Avatar" class="rounded-xl w-35 h-60 object-cover" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title" :style="{color : developer.namecolor}">{{ developer.name }}</h2>
              <p class="text-xl" :style="{color : developer.titlecolor}">{{ developer.title }}</p>
              <p>{{ developer.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const developers = ref([
  {
    id: 1,
    avatar: 'https://visage.surgeplay.com/full/256/96c6500f-4c9c-4fd2-86a5-e633862022be',
    name: 'MahiroONIMAI_',
    title: 'OWNER',
    description: 'NETWORKS冬雪喵奈',
    namecolor: 'red',
    titlecolor: 'red'
  },
  {
    id: 2,
    avatar: 'https://visage.surgeplay.com/full/256/a99bc286-ee62-44d8-ae1a-281a3bbe1d65',
    name: 'icelly_QAQ',
    title: 'ADMIN',
    description: 'APPLICATION蓝冰',
    namecolor: 'skyblue',
    titlecolor: 'skyblue'
  },
  {
    id: 3,
    avatar: 'https://visage.surgeplay.com/full/256/2216fa32-ddb9-4e59-8df0-909e37e16342',
    name: 'Aiden_Hopkins',
    title: 'ADMIN',
    description: 'APPLICATION舟.',
    namecolor: 'blue',
    titlecolor: 'blue'
  },
  {
    id: 4,
    avatar: 'https://visage.surgeplay.com/full/256/f766bf5b-7a4c-4397-aed9-5e60558ee05e',
    name: 'Tears_afb',
    title: 'MODERATOR',
    description: 'CHEAT伊城',
    namecolor: 'orange',
    titlecolor: 'orange'
  }
]);
</script>
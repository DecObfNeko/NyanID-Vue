<template>
  <div>
  <div class="hero  min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="@/assets/img/95146846_p0_trans.png" :class="['max-w-sm', { 'animate-fly-in': isMounted }]" />
      <div :class="[{ 'animate-fly-in': isMounted }]">
        <h1 class="text-5xl font-bold">NyaCat Cloud</h1>
        <p class="py-6">
          由一群可爱的猫猫创建的工作室DecobfnekoDev
          MahiroHackerฅ(＞﹏＜) No Dimples#1337 here :
          <br>
          {{ serverInfo }}
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
      <div class="stats-container">
    <div class="stats shadow bg-white">
      <div class="stat place-items-center">
        <div class="stat-title">AllUser</div>
        <div class="stat-value text-secondary">{{ AllUser }}</div>
        <div class="stat-desc text-secondary">I like this, this is Cute</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">AllApplication</div>
        <div class="stat-value">{{ AllApplication }}</div>
        <div class="stat-desc">↗︎ 40 (2%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">NumberOfEvents</div>
        <div class="stat-value">{{ NumberOfEvents }}</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  </div>
    </div>
  </div>
  </div>
  
</template>


<style scoped>
#section {
  width: 100%;
  height: 100vh; /* 设置高度为视口高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
}

/* 数据看板容器 */
.stats-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* 数据看板样式 */
.stats {
  background-color: white; /* 设置背景颜色为白色 */
  opacity: 1; /* 设置不透明 */
  border-radius: 8px; /* 可选：设置圆角 */
  padding: 20px; /* 可选：设置内边距 */
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import config from '@/config/configenv.d';

// 创建一个响应式变量来存储服务器信息
const serverInfo = ref('');
const AllUser = ref('');
const AllApplication = ref('');
const NumberOfEvents = ref('');


// 请求
const getServerInfo = async () => {
  try {
    const res = await axios({
      url: `${config}/api/zako/v2/server`,
      method: 'GET'
    });
    serverInfo.value = 'Here is NyaCat Cloud!';
    AllUser.value = res.data.AllUser;
    AllApplication.value = res.data.AllApplication;
    NumberOfEvents.value = res.data.NumberOfEvents;
  } catch (error) {
    serverInfo.value = 'Server is down!';
    AllUser.value = '0';
    AllApplication.value = '0';
    NumberOfEvents.value = '0';
  }
};

// 创建一个响应式变量来控制动画
const isMounted = ref(false)

// 在组件挂载时设置 isMounted 为 true
onMounted(() => {
  isMounted.value = true
  getServerInfo()
})
</script>
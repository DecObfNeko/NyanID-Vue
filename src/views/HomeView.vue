<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="@/assets/img/95146846_p0_trans.png" :class="['max-w-sm', { 'animate-fly-in': isMounted }]" />
        <div :class="[{ 'animate-fly-in': isMounted }]">
          <h1 class="text-5xl font-bold">NyaCat Cloud</h1>
          <p class="py-6">
            由一群可爱的猫猫创建的工作室DecobfnekoDev MahiroHackerฅ(＞﹏＜) No Dimples#1337 here :
            <br>
            <span v-if="AllApplicationState" class="loading loading-ring loading-xl"  ></span>
            <transition name="el-fade-in">
            <div   v-html="serverInfo" class="transition-box"></div>
            </transition>
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
        <transition name="el-zoom-in-bottom">
        <div class="stats-container transition-box" v-show="show" v-if="NumberOfEventsState" >
          <div class="stats shadow glass">
            <div class="stat place-items-center w-90">
              <div class="stat-title">AllUser</div>
              <span v-if="AllUserState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value text-secondary">{{ AllUser }}</div>
              <div class="stat-desc text-secondary">AllUser</div>
            </div>

            <div class="stat place-items-center w-90">
              <div class="stat-title">AllApplication</div>
              <span v-if="AllApplicationState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value">{{ AllApplication }}</div>
              <div class="stat-desc">AllApplication</div>
            </div>

            <div class="stat place-items-center w-90">
              <div class="stat-title">NumberOfEvents</div>
              <span v-if="AllApplicationState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value">{{ NumberOfEvents }}</div>
              <div class="stat-desc">NumberOfEvents</div>
            </div>
          </div>
        </div>
        </transition>
      </div>
    </div>
  </div>
  
</template>


<style scoped>
/* 数据看板容器 */
.stats-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import config from '@/config/configenv.d';
import { ElNotification } from 'element-plus'

// 创建响应式变量来存储服务器信息
const serverInfo = ref('');
const AllUser = ref('');
const AllApplication = ref('');
const NumberOfEvents = ref('');
const show = ref(true)
const AllUserState = ref(true);
const AllApplicationState = ref(true);
const NumberOfEventsState = ref(true);


function open(title:any,msg:any,type:any) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}
// 请求
const getServerInfo = async () => {
  try {
    const res = await axios({
      url: `${config}/api/zako/v2/server`,
      method: 'GET',
      timeout: 5000,
    });
    if (res.status === 200) {
      serverInfo.value = 'Here is NyaCat Cloud!';
      AllUser.value = res.data.AllUser;
      AllApplication.value = res.data.AllApplication;
      NumberOfEvents.value = res.data.NumberOfEvents;

      AllUserState.value = false;
      AllApplicationState.value = false;
      NumberOfEventsState.value = true;
    } else {
      serverInfo.value = 'Server is down!';
      AllUser.value = '0';
      AllApplication.value = '0';
      NumberOfEvents.value = '0';

      AllUserState.value = false;
      AllApplicationState.value = false;
      NumberOfEventsState.value = false;
    }
  } catch (error) {
    serverInfo.value = '<p style="color: brown">Server is down!</p>';
    AllUser.value = '0';
    AllApplication.value = '0';
    NumberOfEvents.value = '0';
    open('Error', 'Failed to fetch:'+error, 'error')
    AllUserState.value = false;
    AllApplicationState.value = false;
    NumberOfEventsState.value = false;
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
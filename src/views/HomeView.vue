<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="@/assets/img/9d29c274472bfd1e58bf4e7a2efb180f.png" :class="['max-w-sm', { 'animate-fly-in': isMounted }]" />
        <div :class="[{ 'animate-fly-in': isMounted }]">
          <h1 class="text-5xl font-bold">NyaCat Cloud</h1>
          <p class="py-6">
            由一群可爱的猫猫创建的工作室DecobfnekoDev MahiroHackerฅ(＞﹏＜) No Dimples#1337 here :
            <br>
            <span v-if="serverInfoState" class="loading loading-ring loading-xl"></span>
            <transition name="el-fade-in">
            <div   v-html="serverInfo" class="transition-box"></div>
            </transition>
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
        <transition name="el-zoom-in-bottom">
        <div class="stats-container transition-box" v-show="show">
          <div class="stats shadow glass">
            <div class="stat place-items-center w-90">
              <div class="stat-title">AllUser</div>
              <span v-if="AllUserState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value text-secondary">{{ AllUser }}</div>
            </div>
            <div class="stat place-items-center w-90">
              <div class="stat-title">AllApplication</div>
              <span v-if="AllApplicationState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value">{{ AllApplication }}</div>
            </div>
            <div class="stat place-items-center w-90">
              <div class="stat-title">NumberOfEvents</div>
              <span v-if="AllApplicationState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value">{{ NumberOfEvents }}</div>
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
import { getServerInfo } from '@/api/serverInfo.d'
import { ElNotification } from 'element-plus'

// 创建响应式变量来存储服务器信息
const serverInfo = ref('');
const AllUser = ref('');
const AllApplication = ref('');
const NumberOfEvents = ref('');
const serverInfoState = ref(true);
const show = ref(true);
const AllUserState = ref(true);
const AllApplicationState = ref(true);
const NumberOfEventsState = ref(true);

// 错误弹窗
function open(title:any,msg:any,type:any) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}
// 处理请求
getServerInfo().then(res => {
  if (res.status === 200) {
    serverInfo.value = res.data.msg;

    AllUser.value = res.data.AllUser;
    AllApplication.value = res.data.AllApplication;
    NumberOfEvents.value = res.data.NumberOfEvents;
    
    serverInfoState.value = false;
    AllUserState.value = false;
    AllApplicationState.value = false;
    NumberOfEventsState.value = false;
  } else {
    open('Error','Server is down!','error');
    serverInfo.value = 'Server is down!';

    show.value = false;
    serverInfoState.value = false;
  }
})

// 创建一个响应式变量来控制动画
const isMounted = ref(false)

// 在组件挂载时设置 isMounted 为 true
onMounted(() => {
  isMounted.value = true
})
</script>
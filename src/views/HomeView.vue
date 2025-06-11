<template>    
    <div class="hero min-h-screen glass flex-auto">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="@/assets/img/3a614988d5e2c37ff40d29e232066f86.png" :class="['max-w-sm', { 'animate-fly-in': isMounted }]" style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" />
        <div :class="[{ 'animate-fly-in': isMounted }]">
          <h1 class="text-5xl font-bold" style="color: azure;">猫猫云开放通行证平台NyaCat Cloud</h1>
          <p class="py-6" style="color: azure;">
            Meet a better version of yourself ！
            <br>
            <span v-if="serverInfoState" class="loading loading-ring loading-xl"></span>
            <transition name="el-fade-in">
            <div   v-html="serverInfo" style="color: plum;" class="transition-box"></div>
            </transition>
          </p>
          <button onclick="Started.showModal()" class="btn btn-primary">Get Started</button>
          <dialog id="Started" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-lg font-bold">Hello! 这里是NAYNCAT 杂鱼喵~ </h3>
            <div class="divider"></div>
            <RouterLink to="/oauth2" class="py-4">我是应用程序开发者,我需要Oauth2服务</RouterLink>
            <div class="divider">OR</div>            
            <RouterLink to="/server" class="py-4">我是我的世界玩家,我需要了解NyaCat Cloud的Minecraft服务器</RouterLink>
            <div class="divider"></div>

          </div>
        </dialog>
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
              <div class="stat-title">NumberOfServerEvents</div>
              <span v-if="AllApplicationState" class="loading loading-ring loading-xl"></span>
              <div class="stat-value">{{ NumberOfEvents }}</div>
            </div>
          </div>
        </div>
        </transition>
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
import { getServerInfo } from '@/api/netcore.d'
import { ElNotification } from 'element-plus'
import { RouterLink } from 'vue-router';

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
    serverInfo.value = res.data.msg

    AllUser.value = res.data.AllUser;
    AllApplication.value = res.data.AllApplication;
    NumberOfEvents.value = res.data.NumberOfEvents;

    serverInfoState.value = false;
    AllUserState.value = false;
    AllApplicationState.value = false;
    NumberOfEventsState.value = false;
  } else {
    open('Error',res.data,'error');
    serverInfo.value = '与后端服务器建立连接失败喵~';

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
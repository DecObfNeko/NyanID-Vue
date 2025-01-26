<template html> 
  <div class="base-300 dark:bg-base-300">
    <transition-group name="toast" tag="div">
    <div v-for="(toast, index) in toasts" :key="index" class="toast toast-end" @click="closeToast(index)">
      <div :class="alertclass" @click="closeToast(index)">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
         </svg>
        <span>{{ msga }}</span>
      </div>
    </div>
  </transition-group>
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
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import config from '@/config/configenv.d';


const toasts = ref<Array<{ id: number, timer: ReturnType<typeof setTimeout> }>>([])

let toastId = 0
let msga = ref()
let alertclass = reactive(["alert","alert-info"])
function Alert(msg:string,typea:string) {
    msga.value = msg
    Object.assign(alertclass, ["alert",typea]);

  const id = toastId++
  const timer = setTimeout(() => {
    closeToast(id)
  }, 1000) 


  toasts.value.push({ id, timer })
}

function closeToast(id: number) {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    clearTimeout(toasts.value[index].timer)
    toasts.value.splice(index, 1)
  }
}
    /* 初始化 */
    const initialize = async () => {
      await randomImg();
      await getServerInfo();

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

       /* 请求 */
       const getServerInfo = async () => {
      try {
        const res = await axios({
          url: `${config}/api/zako/v2/server`,
          method: 'get',
        });
        Alert(res.data,"alert-info");

        console.log(res);
      } catch (error) {
        Alert('Failed to fetch:'+error,"alert-error");
        console.error('Failed to fetch:', error);
      }
    };

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
<template>
  <header :class="headerClass">
    <div class="navbar shadow-sm" :class="navbarClass">
      <div class="navbar-start ">
        <RouterLink to="/" class="flex-0.5 btn btn-ghost px-3 h-13">
          <div class="avatar ">
            <div class="w-10 rounded">
              <img src="@/assets/img/logo.png" />
            </div>
          </div>
          <div class="font-title inline-flex text-lg md:text-2xl">NyaCat Cloud</div>
        </RouterLink>
      </div>

      <div class="navbar-center hidden lg:flex  ">
        <ul class="menu menu-horizontal px-1">
          <li><RouterLink to="/" >HOME</RouterLink></li>
          <li><RouterLink to="/server" >McServer</RouterLink></li>
          <li>
            <details class="dropdown dropdown-end">
              <summary>API/应用程序接入</summary>
              <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                <li>
                  <a class="justify-between">
                    Docs
                    <span class="badge">New</span>
                  </a>
                </li>
                <li><a class="justify-between">
                    Developer Platform
                    <span class="badge">New</span>
                  </a></li>
                <li><a>API</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>LEADERBOARDS</summary>
              <ul class="p-2">
                <li><a>猫粮排行榜</a></li>
                <li><a>Ranked</a></li>
              </ul>
            </details>
          </li>
          <li><a>NAMEMC</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="flex gap-4">
        <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="SearchPlayer"
              @select="handleSelect"
              clearable="true"
      >
        <template #loading>
          <el-icon class="is-loading">
            <svg class="circular" viewBox="0 0 20 20">
              <g
                class="path2 loading-path"
                stroke-width="0"
                style="animation: none; stroke: none"
              >
                <circle r="3.375" class="dot1" rx="0" ry="0" />
                <circle r="3.375" class="dot2" rx="0" ry="0" />
                <circle r="3.375" class="dot4" rx="0" ry="0" />
                <circle r="3.375" class="dot3" rx="0" ry="0" />
              </g>
            </svg>
          </el-icon>
        </template>
      </el-autocomplete>
     </div>

        <label class="swap swap-rotate menu">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" class="theme-controller" value="dark" />
          <!-- sun icon -->
          <svg
            class="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <RouterLink  class="btn" to="/login" :hidden="isLogin" :="isLogin1" >Login</RouterLink>
        <div class="dropdown dropdown-end" :hidden="!isLogin">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full avatar-transition">
          <img 
            v-if="!noAvatar"
            alt="avatar"
            :src="avatarUrl"
            class="transition-opacity duration-300" />
            <svg v-if="noAvatar" viewBox="0 0 30 29" id="user-circle" class="icon line" width="48" height="48"><path style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21Zm0-6a5,5,0,0,0-5,4.5,9,9,0,0,0,9.94,0A5,5,0,0,0,12,15Zm0-8a4,4,0,1,0,4,4A4,4,0,0,0,12,7Z" id="primary"></path></svg>
        </div>
      </div>
      <ul
        :hidden="!isLogin"
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <RouterLink class="justify-between" :to=link+uid>
            <p class="text-xs" :style="{ color: isDeveloper ? 'pink' : '' }">{{ UserName }}</p>
            <span class="badge">Profile</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/user/home">
            <p class="text-xs" >UserHome</p>
            
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/user/friend">
            <p class="text-xs" >Friend</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/user/friend">
            <p class="text-xs" >Neko Club</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="settinglink">
            <a>Settings</a>
          </RouterLink>
        </li>
        <li><a v-on:click="Logout">Logout</a></li>
      </ul>
    </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  z-index: 1000;
}

.avatar-transition {
  position: relative;
}

.avatar-transition img {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.avatar-transition img[src=''] {
  opacity: 0;
}
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}
.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import eventBus from '@/utils/mitt.d'
import { getUserInfo,SearchUser } from '@/api/netcore.d'
import Cookies from 'js-cookie'
import config from '@/config/configenv.d'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const headerClass = ref('glass')
const navbarClass = ref('glass')

const isLogin = ref(false)
const isLogin1= ref([])


const avatarUrl = ref('')
const UserName = ref('')
const isDeveloper = ref()
const LoginToken = Cookies.get('LoginToken')
const uid = ref()

const noAvatar = ref(true)

const link = "/user/"
const settinglink = "/user/setting"

const handleScroll = () => {
  if (window.scrollY > 0) {
    headerClass.value = 'white'
    navbarClass.value = ''
  } else {
    headerClass.value = 'glass'
    navbarClass.value = 'glass'
  }
}
function Logout() {
  Cookies.remove('LoginToken')
  open('Logout Success', 'success')
  isLogin.value = false
}

const open = (msg: any, type: any) => {
  ElMessage({
    message: msg,
    type: type,
  })
}
getUserInfo(LoginToken).then(res => {
  if (res.status === 200) {
    isLogin.value = true
    avatarUrl.value = `${config.apiUrl}/api/zako/res/avatar/${res.data.uid}`
    UserName.value = res.data.nickname
    isDeveloper.value = res.data.isDeveloper
    uid.value = res.data.uid
    fetchAvatar(res.data.uid)
  }
})

const fetchAvatar = async (uid: string) => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/zako/res/avatar/${uid}`)
    if (response.status === 200 && response.data) {
      noAvatar.value = false
    } else {
      noAvatar.value = true
    }
  } catch (error) {
    noAvatar.value = true
  }
}

eventBus.on('avatar-updated', () => {
  // 使用异步函数立即更新头像
  if (uid.value) {
    fetchAvatar(uid.value)
    avatarUrl.value = `${config.apiUrl}/api/zako/res/avatar/${uid.value}?t=${new Date().getTime()}`
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
onMounted(() => {
  getUserInfo(LoginToken).then(res => {
  if (res.status === 200) {
    isLogin.value = true
    avatarUrl.value = `${config.apiUrl}/api/zako/res/avatar/${res.data.uid}`
    UserName.value = res.data.nickname
    isDeveloper.value = res.data.isDeveloper
    uid.value = res.data.uid
    fetchAvatar(res.data.uid)
  }
})   
});

interface UserSuggestion {
  value: string
  uid: string
}

// 组件状态
const state = ref('')
const loading = ref(false)
let currentRequest: AbortController | null = null

// 自动完成处理逻辑
const querySearchAsync = async (queryString: string, cb: (arg: UserSuggestion[]) => void) => {

  try {
    loading.value = true
    // 取消前一个请求
    if (currentRequest) {
      currentRequest.abort()
    }
    currentRequest = new AbortController()

    // 空值处理
    if (!queryString.trim()) {
      cb([])
      return
    }
    // 调用封装的SearchUser方法
    const { status, data } = await SearchUser(queryString)

    if (status === 200) {
      cb(data)
      loading.value = false
    } else {
      setTimeout(() => {
        loading.value = true
        ElMessage.error(`搜索失败 (状态码: ${status}用户不存在)`)
        cb([])
      }, 350)
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('请求已取消')
    } else {
      console.error('搜索请求异常:', error)
      ElMessage.error('搜索服务不可用')
    }
    cb([])
  } finally {
    loading.value = false
    currentRequest = null
  }
}

// 选择处理
const handleSelect = (item: UserSuggestion) => {
  console.log('选中用户:', item.value)
  if (item.uid) {
    router.push(`/user/${item.uid}`)
    // window.open(item.uid, '_blank')
  }
}
</script>

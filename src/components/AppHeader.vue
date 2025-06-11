<template>
  <header :class="headerClass">
    <div class="navbar shadow-sm flex-auto" :class="navbarClass">
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
          <li><RouterLink to="/" >{{ $t('AppHeader-home') }}</RouterLink></li>
          <li>
            <details class="dropdown dropdown-end">
              <summary>{{ $t('AppHeader-api') }}</summary>
              <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                <li>
                  <a class="justify-between">
                    {{ $t('AppHeader-api-docs') }}
                    <span class="badge">New</span>
                  </a>
                </li>
                <li><a class="justify-between">
                    {{ $t('AppHeader-api-developer-platform') }}
                    <span class="badge">New</span>
                  </a></li>
                <li><a>API</a></li>
              </ul>
            </details>
          </li>
          <!--li>
            < details>
              <summary>{{ $t('AppHeader-LEADERBOARDS') }}</summary>
              <ul class="p-2">
                <li><a>{{ $t('AppHeader-LEADERBOARDS-catfood') }}</a></li>
                <li><a>{{ $t('AppHeader-LEADERBOARDS-ranked') }}</a></li >
              </ul>
            </details >
          </li-->
          <!-- <li><a>NAMEMC</a></li> -->
          <li>
            <details class="dropdown dropdown-end">
              <summary>{{ $t('AppHeader-service') }}</summary>
              <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                <li>
                  <a class="justify-between">
                    {{ $t('AppHeader-service-project1') }}
                    <span class="badge">Game</span>
                  </a>
                </li>
                <li><a class="justify-between">
                    {{ $t('AppHeader-service-project2') }}
                    <span class="badge">MQ</span>
                  </a></li>
                <li><RouterLink to="/server" >Mc{{ $t('AppHeader-server') }}</RouterLink></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="flex gap-5 ">
        <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              :placeholder="$t('AppHeader-SearchPlayer')"
              @select="handleSelect"
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
     <label class="flex w-10"></label>
        <RouterLink  class="btn" to="/login" :hidden="isLogin" :="isLogin1" >{{ $t('AppHeader-LOGIN') }}</RouterLink>
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
          <RouterLink class="justify-between" :to="`/user/` + uid">
            <p class="text-xs" :style="{ color: isDeveloper ? 'pink' : '' }">{{ UserName }}</p>
            <span class="badge">{{ $t('AppHeader-user-profile') }}</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/user/home">
            <p class="text-xs" >{{ $t('AppHeader-user-userhome') }}</p>
            
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/user/friend">
            <p class="text-xs" >{{ $t('AppHeader-user-friends') }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="justify-between" to="/cgi-bin/community">
            <p class="text-xs" >{{ $t('AppHeader-user-nekoclub') }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="settinglink">
            <a>{{ $t('AppHeader-user-settings') }}</a>
          </RouterLink>
        </li>
        <li><a v-on:click="Logout">{{ $t('AppHeader-user-logout') }}</a></li>
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
import { getUserInfo, SearchUser } from '@/api/netcore.d'
import Cookies from 'js-cookie'
import config from '@/config/configenv.d'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const headerClass = ref('glass')
const navbarClass = ref('glass')

const isLogin = ref(false)
const isLogin1 = ref([])


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
  window.location.reload()
  open('Logout Success', 'success')
  isLogin.value = false
}

const open = (msg: any, type: any) => {
  ElMessage({
    message: msg,
    type: type,
  })
}
// getUserInfo(LoginToken).then(res => {
//   if (res.status === 200) {
//     isLogin.value = true
//     avatarUrl.value = `${config.apiUrl}/api/zako/res/avatar/${res.data.uid}`
//     UserName.value = res.data.nickname
//     isDeveloper.value = res.data.isDeveloper
//     uid.value = res.data.uid
//     fetchAvatar(res.data.uid)
//   }
// })

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
  if (Cookies.get('LoginToken') != null) {
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
  }
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

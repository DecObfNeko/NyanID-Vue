<template>
  <header :class="headerClass">
    <div class="navbar shadow-sm" :class="navbarClass">
      <div class="navbar-start ">
        <a class="flex-0.5 btn btn-ghost px-3 h-13">
          <div class="avatar">
            <div class="w-10 rounded">
              <img src="@/assets/img/logo.png" />
            </div>
          </div>
          <div class="font-title inline-flex text-lg md:text-2xl">NyaCat Cloud</div>
        </a>
      </div>

      <div class="navbar-center hidden lg:flex ">
        <ul class="menu menu-horizontal px-1">
          <li><a>HOME</a></li>
          <li><a>McServer</a></li>
          <li>
            <details>
              <summary>API/应用程序接入</summary>
              <ul class="p-2">
                <li><a>开发者中心</a></li>
                <li><a>API文档</a></li>
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
        <a class="btn">Login</a>
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

</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerClass = ref('glass')
const navbarClass = ref('glass')

const handleScroll = () => {
  if (window.scrollY > 0) {
    headerClass.value = 'white'
    navbarClass.value = ''
  } else {
    headerClass.value = 'glass'
    navbarClass.value = 'glass'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
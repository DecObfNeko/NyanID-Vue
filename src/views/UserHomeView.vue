<template>
  <div class="md:col-span-1 wave-container">
      <div class="card bg-base-100 shadow-xl">
          <div class="card-body flex flex-row items-start gap-6">
              <div class="avatar">
              <div class="w-24 rounded-xl">
                      <img :src="noAvatar ? davatar : avatarUrl" alt="User Avatar" style="-webkit-user-drag: none;">
                  </div>
               </div>

              <!-- 内容部分 -->
              <div class="flex-1 items-baseline gap-2">
                  <h2 class="card-title mt-1" :style="{ color: isDeveloper ? 'pink' : '' }">{{ UserName }}</h2>
                  <p :hidden="!isDeveloper" class="developer-text">
                      The developer identity has been verified.
                  </p>
                  <img src="@/assets/img/dev.png" :hidden="!isDeveloper" class="w-4 h-4 translate-y-[-13px] translate-x-[0px] opacity-95 hover:opacity-100 transition-opacity" style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" >
                <p class="text-sm">个性签名: {{ description }}</p>
                <p class="text-xs text-gray-500 mt-1">uid: {{uid}} · Username: {{ username }}</p>
                <p class="text-xs text-gray-500 mt-1">Level: {{exp/2000}}</p>

              </div>
          </div>
      </div>
  </div>
</template>


<script setup lang="ts" name="UserHomeView">
import config from '@/config/configenv.d'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getPublicUserInfo } from '@/api/netcore.d'
import { ref } from 'vue'
import axios from 'axios'
import davatar from "@/assets/img/avatar.png"

const router = useRouter()
const route = useRoute()

const noAvatar = ref(true)

const avatarUrl = ref('')
const UserName = ref('')
const isDeveloper = ref()
const description = ref('')
const uid = ref("")
const exp = ref()
const username = ref("")
const uuid = ref('')
uuid.value = route.params.uuid as string



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

getPublicUserInfo(uuid.value).then(res => {
  
  if (res.status === 200) {
    avatarUrl.value = `${config.apiUrl}/api/zako/res/avatar/${res.data.uid}`
    UserName.value = res.data.nickname
    isDeveloper.value = res.data.isDeveloper
    description.value = res.data.description
    uid.value = res.data.uid
    username.value = res.data.username
    exp.value = res.data.exp
    fetchAvatar(res.data.uid)
  }else{
    open('Error', 'The user does not exist', 'error')
    router.push({ path: "/",replace : true })
  }
})


function open(title: any, msg: any, type: any) {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}



</script>

<style scoped>
@keyframes rgb-wave {
    0% { color: rgb(255, 0, 0); }
    33% { color: rgb(0, 255, 0); }
    66% { color: rgb(0, 0, 255); }
    100% { color: rgb(255, 0, 0); }
}

.developer-text {
    animation: rgb-wave 3s linear infinite;
    -webkit-animation: rgb-wave 3s linear infinite;
    transform: translate(20px, 6px);
    opacity: 0.95;
    transition: opacity 0.5s;
}


</style>


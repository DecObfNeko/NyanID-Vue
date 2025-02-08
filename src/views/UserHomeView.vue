<template>
    <div class="md:col-span-1">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body flex flex-row items-start gap-6"> <!-- 改为横向flex布局 -->
            <div class="flex-shrink-0 avatar" to="/user">
            <div class="w-20 rounded-xl">
              <img v-if="!noAvatar" :src="avatarUrl" alt="User Avatar"  style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" />
              <svg v-if="noAvatar" viewBox="2.5 7 20 10" id="user-circle" class="icon line" width="80" height="80"><path style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21Zm0-6a5,5,0,0,0-5,4.5,9,9,0,0,0,9.94,0A5,5,0,0,0,12,15Zm0-8a4,4,0,1,0,4,4A4,4,0,0,0,12,7Z" id="primary"></path></svg>
            </div>
          </div>

            <!-- 内容部分 -->
            <div class="flex-1 items-baseline gap-2">
                <h2 class="card-title mt-4" :style="{ color: isDeveloper ? 'pink' : '' }">{{ UserName }}</h2>
                <img src="@/assets/img/dev.png" :hidden="!isDeveloper" class="w-4 h-4 translate-y-[-21px] translate-x-[150px] opacity-95 hover:opacity-100 transition-opacity" style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;">
                <p class="text-sm">{{ description }}</p>
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
import { getPublicUserInfo } from '@/api/getpubuser.d'
import { ref } from 'vue'
import axios from 'axios'

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
    avatarUrl.value = `${config}/api/zako/res/avatar/${res.data.uid}`
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
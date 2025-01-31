<template>
    <div class="md:col-span-1">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body flex flex-row items-start gap-6"> <!-- 改为横向flex布局 -->
            <div class="flex-shrink-0 avatar" to="/user">
            <div class="w-20 rounded-xl">
              <img :src="avatarUrl" alt="User Avatar"  style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" />
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

const router = useRouter()
const route = useRoute()


const avatarUrl = ref('')
const UserName = ref('')
const isDeveloper = ref()
const description = ref('')
const uid = ref("")
const exp = ref()
const username = ref("")
const uuid = ref('')
uuid.value = route.params.uuid as string

getPublicUserInfo(uuid.value).then(res => {
  
  if (res.status === 200) {
    avatarUrl.value = `${config}/api/zako/res/avatar/${res.data.uid}`
    UserName.value = res.data.nickname
    isDeveloper.value = res.data.isDeveloper
    description.value = res.data.description
    uid.value = res.data.uid
    username.value = res.data.username
    exp.value = res.data.exp
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
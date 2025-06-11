<template> 
<div class="card lg:card-side shadow-sm flex  md:flex-row ">
  <div class="relative">
    <h2 class="absolute left-[400px] top-[412px] rotate-333 rounded scale-1000 footer-title" style="color: darkred;">{{ $t('E404-title') }}</h2>
    <h2 class="absolute left-[350px] top-[650px] rotate-333 rounded  scale-300 footer-title" style="color: darkred;">{{ $t('E404-msg') }}</h2>
    <RouterLink to="/" class="absolute left-[400px] top-[502px] rotate-333 rounded scale-200 footer-title" style="color: darkred;">{{ $t('E404-back') }}ad</RouterLink>

    <img
      style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;"
      src="@/assets/img/Image_1740734995013.png"
      alt="Album" />
      
  </div>
</div>

</template>



<script setup lang="ts" name="ManagerHomeView"> 
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import { ElNotification } from 'element-plus'
const router = useRouter()
const route = useRoute()
const key = ref('')
const action = ref('')

const LoginToken = Cookies.get('LoginToken')

onMounted(() => {
  key.value = route.params.key as string
  action.value = route.params.action as string
})
</script>
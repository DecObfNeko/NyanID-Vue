<template>
  <AppHeader #="body" html data-theme=""> 
    <router-view />
  </AppHeader>
     <AppBodyImg >
      </AppBodyImg>

  <AppFooter>
  </AppFooter>
</template>
//把页面拆成一个个component和view然后在这里引入

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppBodyImg from '@/components/AppBodyImg.vue';
import AppFooter from './components/AppFooter.vue';


</script>


<style scoped>

</style>
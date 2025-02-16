<template>

</template>

<script setup lang="ts" name="UserHomeSettingView">
import { ref } from 'vue';
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const uuid = ref('')
uuid.value = route.params.uuid as string
</script>

<style scoped>

</style>
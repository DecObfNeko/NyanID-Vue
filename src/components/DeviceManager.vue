<template>
  <!-- 登录设备管理窗口 -->
  <dialog class="modal" :class="{ 'modal-open': visible }">
    <div class="modal-box bg-gradient-to-br from-gray-50 to-gray-100 p-0 overflow-hidden w-auto max-w-none">
      <form method="dialog" class="absolute right-4 top-4 z-10">
        <button class="btn btn-circle btn-ghost btn-sm hover:bg-red-100" @click="close">
          <i class="fas fa-times text-gray-500">X</i>
        </button>
      </form>
      
      <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div class="flex items-center">
          <i class="fas fa-laptop-code text-3xl mr-3 text-indigo-600"></i>
          <h3 class="text-2xl font-bold text-gray-800">登录设备管理</h3>
        </div>
        <p class="mt-1 text-gray-600">以下是您登录过的设备信息</p>
      </div>
      
      <div class="p-6">
        <!-- 设备表格 -->
        <div class="table-container rounded-lg border border-gray-200 bg-white overflow-x-auto">
          <table class="table">
            <!-- 表头 -->
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th class="font-semibold text-gray-700">设备名称</th>
                <th class="font-semibold text-gray-700">机器码(Web登录为空)</th>
                <th class="font-semibold text-gray-700">会话ID</th>
                <th class="font-semibold text-gray-700">登录时间</th>
                <th class="font-semibold text-gray-700">IP地址</th>
                <th class="font-semibold text-gray-700 text-center">状态</th>
                <th class="font-semibold text-gray-700 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <!-- 设备行 -->
              <tr v-for="device in devices" :key="device.id" class="hover:bg-gray-50 transition-colors">
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">{{ device.devicesName }}</div>
                    </div>
                  </div>
                </td>
                <td class="font-mono text-sm">
                  {{ device.hwid || 'Web登录为空' }}
                </td>
                  <td>
                  <div class="flex items-center gap-1">
                    <i class="fas fa-map-marker-alt text-blue-500"></i>
                    <span>{{ device.session }}</span>
                  </div>
                </td>
                <td>
                  <div>{{ device.loginTime }}</div>
                </td>
                <td>
                  <div class="flex items-center gap-1">
                    <i class="fas fa-map-marker-alt text-blue-500"></i>
                    <span>{{ device.ip }}</span>
                  </div>
                </td>
                <td class="text-center">
                  <span :class="device.active ? 'badge badge-success gap-1' : 'badge badge-neutral gap-1'">
                    <i class="fas fa-circle text-[8px]"></i> 
                    {{ device.active ? '活跃' : '非活跃' }}
                  </span>
                </td>
                <td class="text-center">
                  <button 
                    class="btn btn-error btn-xs px-4"
                    @click="deleteDevice(device.session)"
                  >
                    <i class="fas fa-trash mr-1">删除</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <div class="text-sm text-gray-500">
            <i class="fas fa-shield-alt text-indigo-500 mr-1"></i> 您的登录信息已加密保护
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop" @click="close">
      <button></button>
    </form>
  </dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Cookies from 'js-cookie'

const LoginToken = Cookies.get('LoginToken')
const props = defineProps({
  visible: Boolean,
  devices: Array
});

const emit = defineEmits(['close', 'delete']);

// 关闭模态框
const close = () => {
  emit('close');
};

// 删除设备
const deleteDevice = (device) => {
    emit ('delete', device);
};
</script>

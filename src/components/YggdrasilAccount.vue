<template>
  <!-- 登录设备管理窗口 -->
  <dialog class="modal" :class="{ 'modal-open': visible }">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-lg font-bold">Yggdrasil AuthServer 外置登录服务</h3>
    <p class="py-4"></p>
    <span class="py-4" id="dndLabel" draggable="true" @dragstart="dndLabel_dragstart($event)">本站Yggdrasil认证地址:{{ YggdrasilUrl+"/api/yggdrasil" }} <== 可拖动到启动器</span>
    <p class="py-4">启用状态: {{ HasYggdrasilAcc ? '已启用':'未启用' }}</p>
    <span class="py-4" v-if="HasYggdrasilAcc">玩家UUID: {{ UUID }}</span>
     <p class="py-4">==+= </p>
    <button v-if="!HasYggdrasilAcc" class="btn" @click="openacc">创建Yggdrasil账户</button>
    <RouterLink v-if="HasYggdrasilAcc" class="btn" @click="close" to="/cgi-bin/yggdrasil">前往Yggdrasil账户设置页</RouterLink>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn" @click="close">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
function dndLabel_dragstart(event) {
	let yggdrasilApiRoot = props.YggdrasilUrl+"/api/yggdrasil";
	let uri = "authlib-injector:yggdrasil-server:" + encodeURIComponent(yggdrasilApiRoot);
	event.dataTransfer.setData("text/plain", uri);
	event.dataTransfer.dropEffect = "copy";
}

const props = defineProps({
  visible: Boolean,
  UUID: Array,
  YggdrasilUrl:  String,
  HasYggdrasilAcc: Boolean,
});

const emit = defineEmits(['close', 'openacc']);

const openacc = () => { 
  emit('openacc',);
};

const close = () => {
  emit('close');
};
</script>

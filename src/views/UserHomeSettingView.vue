<template>
    <div>
      <div class="card bg-base-100 w-96 shadow-xl">
        <h2 class="card-title ml-5 mt-5">重置头像</h2>
        <div class="px-10 pt-10">
            <!-- 当没有选择图片时显示默认头像 -->
            <img v-if="!previewImage" :src="defaultAvatar" class="avatar-preview" alt="默认头像" />
                
            <!-- 当选择图片后显示 VueCropper -->
            <div v-else class="cropper-container">
              <VueCropper
                ref="cropperRef"
                :src="previewImage"
                :aspect-ratio="1"
                :view-mode="1"
                :background="false"
                :fixed-box="false"
                :can-move="true"
                :can-scale="true"
                :auto-crop-area="1"
              />
            </div>
        </div>
        <div class="card-body mt-10">
          <input type="file" @change="handleFileChange" accept="image/*" class="file-input file-input-bordered w-full max-w-xs" />
          <div class="card-actions justify-end mt-5">
            <button class="btn btn-primary" @click="cropImage">变更</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import defaultAvatar from '@/assets/img/avatar.png';
import { SetAvatar } from '@/api/SetUserAvatar.d'
import Cookies from 'js-cookie'

const selectedFile = ref(null);
const previewImage = ref(null);
const croppedImage = ref(null);
const cropperRef = ref(null);

const LoginToken = Cookies.get('LoginToken')


const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
    
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      nextTick(() => {
        if (cropperRef.value) {
          cropperRef.value.replace(e.target.result);
        }
      });
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const cropImage = () => {
  if (cropperRef.value) {
    // 获取裁剪后的 canvas
    const canvas = cropperRef.value.getCroppedCanvas();
    
    // 将 canvas 转换为 PNG 格式的 blob
    canvas.toBlob((blob) => {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('avatar', blob, 'avatar.png'); // 'avatar' 是字段名，'avatar.png' 是文件名
      
      // 将 FormData 对象传给 API
      SetAvatar(LoginToken, formData).then(res => {
        console.log('头像上传结果:', res);
      }).catch(err => { 
        console.error('头像上传失败:', err);
      });
    }, 'image/png');
  }
};
</script>

<style scoped>
.cropper-container {
  max-width: 100%;
  height: 300px;
}
</style>
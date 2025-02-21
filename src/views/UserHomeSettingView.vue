<template>
    <div class="mr-45">
      <div class="container mx-auto px-4">
        <!-- 原有内容 -->
        <div class="">
          <!-- 用户头像 -->
          <div class="card bg-base-100 w-96 h-156 shadow-xl float-left">
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
    
          <div class="grid grid-cols-1 content-start gap-1 w-200">
            <div class="grid grid-cols-2 content-between">
              <!-- 用户名 -->
              <div class="card glass image-full w-91 shadow-xl float-left ml-5">
                <figure>
                  <img
                    src="../assets/img/9d29c274472bfd1e58bf4e7a2efb180f.png"
                    alt="background" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Reset User Nmae</h2>
                  <p>If you want to reset you user name!</p>
                  <input type="text" class="input" placeholder="Your new name" />
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">变更</button>
                  </div>
                </div>
              </div>
    
              <!-- 用户背景 -->
              <div class="carousel rounded-box w-145 float-left">
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                    class="w-full" />
                </div>
                <div class="carousel-item w-1/2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                    class="w-full" />
                </div>
              </div>
            </div>
    
            <!-- 用户签名 -->
            <div class="card card-side bg-base-100 h-54 w-240 ml-5 mt-5">
              <div class="card-body">
                <h2 class="card-title">Set your sign!</h2>
                <p>If you want to set your sign!</p>
                <textarea class="textarea textarea-bordered" placeholder="Your sign"></textarea>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">变更</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, nextTick, inject } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import defaultAvatar from '@/assets/img/avatar.png';
import { SetAvatar } from '@/api/SetUserAvatar.d'
import Cookies from 'js-cookie'
import { ElNotification } from 'element-plus'

const selectedFile = ref(null);
const previewImage = ref(null);
const cropperRef = ref(null);

const LoginToken = Cookies.get('LoginToken')

const open = (title, msg, type) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

// 设置头像 start
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
        if (res.status === 200){
          open("Success", "Set avatar successfully", "success")
        } else {
          open('Error', res.data.message, 'error')
        }
      }).catch(err => { 
        open('Error', res.data.message, 'error')
      });
    }, 'image/png');
  } else {
    open('Error', 'You haven\'t uploaded the file yet.', 'error')
  }
};
// 设置头像 end

// 设置用户名 start

// 设置用户名 end
</script>

<style scoped>
.cropper-container {
  max-width: 100%;
  height: 300px;
}

/* 添加输入框样式 */
.input {
  background-color: #f5f5f5 !important;
  color: black !important;
}

/* 如果需要在输入框获得焦点时保持相同的背景色 */
.input:focus {
  background-color: #f5f5f5 !important;
}

/* 添加文本框高度样式 */
.textarea {
  width: 890px;
  height: 100px !important;
  min-height: 55px !important;  /* 防止被 textarea 的最小高度限制 */
  resize: none;  /* 禁用拖拽调整大小 */
}
</style>
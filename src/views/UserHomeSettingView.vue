<template>
    <div class="mr-45">
      <div class="container mx-auto px-4">
        <!-- 小窗口 -->

        <!-- 头像重置窗口 -->
        <dialog id="avatar" class="modal">
        <div class="modal-box overflow-x-auto">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="text-lg font-bold">重置头像</h3>
          <!-- 用户头像 -->
                <div class="card bg-base-100 w-95 shadow-xl">
                  <div :hidden="!previewImage" class="px-10 pt-10">
                      <!-- 当没有选择图片时显示默认头像 -->
                      <img v-if="!previewImage" :hidden="!previewImage" class="avatar-preview"  alt="默认头像" />
                          
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
                          @change="handleFileChange" accept="image/*"
                        />
                      </div>
                  </div>
                  <div class="card-body mt-5">
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">Pick a file</legend>
                      <input type="file" @change="handleFileChange" accept="image/*" class="file-input file-input-sm w-full max-w-xs" />
                      <label class="fieldset-label">Max size 2MB</label>
                    </fieldset>
                    <div class="card-actions justify-end mt-5">
                      <button class="btn" :hidden="!previewImage" @click="cropImage">
                        变更
                      </button>
                    </div>
                  </div>
                </div>
        </div>
      </dialog>

      <!-- 绑定Minecraft账户窗口 -->
      <dialog id="BindMinecraft" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="text-lg font-bold">Bind your Minecraft account</h3>
          <p class="py-4">请在Minecraft服务器中输入指令 /bindwebaccount 获取授权码</p>
          <input type="text" class="input float-left" placeholder="Code" />
          <button class="btn " onclick=" ">Bind</button>
        </div>
      </dialog>

       <!-- 授权服务窗口 -->
       <dialog id="Authorized" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="text-lg font-bold">Authorized Services</h3>
          <p class="py-4">以下是您通过Oauth2登录过的Application</p>
          <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>Application</th>
                <th>Authorization time</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">TestApp</div>
                    </div>
                  </div>
                </td>
                <td>
                  2025.01.01 09:00:00
                </td>
                <td>True</td>
                <th>
                  <button class="btn btn-ghost btn-xs">取消授权</button>
                </th>
              </tr>
              <!-- row 2 -->

              
            </tbody>
          </table>
        </div>
        </div>
      </dialog>

       <!-- 登录设备管理窗口 -->
       <dialog id="Device" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="text-lg font-bold">Log in to Device Management</h3>
          <p class="py-4">以下是您登录过的设备信息</p>
          <div class="card bg-base-100 w-95 shadow-xl overflow-x-auto">
          <table class="table overflow-x-auto">
            <!-- head -->
            <thead>
              <tr>
                <th>Devices Name</th>
                <th>ClientID</th>
                <th>LoginTime</th>
                <th>Ip</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">WebApp</div>
                    </div>
                  </div>
                </td>
                <td>jNRH4WQYwywiPLPiy1cbQNpTdvIRRWnmzGnOiwAndHYcdu2GHHyIRg3bYcFDkoE2aEkoCucdZwv8LY7ONLJPJ6MT1SOyuCgN2Ob8FwjYyYba88uA7m4pYDzLufV9PWjj</td>
                <td>2025-03-01 16:46:45.596294</td>
                <td>127.0.0.1</td>
                <td>True</td>
                <th>
                  <button class="btn btn-ghost ">删除</button>
                </th>
              </tr>
              <!-- row 2 -->

            </tbody>
          </table>
        </div>
        </div>
      </dialog>

       <!-- 违规历史窗口 -->
       <dialog id="Violation" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="text-lg font-bold">Violation history</h3>
          <p class="py-4">Press ESC key or click on ✕ button to close</p>
          <div class="card bg-base-100 w-95 shadow-xl overflow-x-auto">
          <table class="table overflow-x-auto">
            <!-- head -->
            <thead>
              <tr>
                <th>BanID</th>
                <th>Time</th>
                <th>Reason</th>
                <th>BannedBy</th>
                <th>Type</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">SDFSFE234DS</div>
                    </div>
                  </div>
                </td>
                <td>2025-03-01 16:46:45.596294</td>
                <td>》Cheating through the use of unfair game advantages</td>
                <td>System</td>
                <td>1</td>
                <td>False</td>
              </tr>
              <!-- row 2 -->

            </tbody>
          </table>
        </div>
        </div>
      </dialog>

       <!-- 冻结账号窗口 -->
       <dialog id="Freeze" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 class="text-lg font-bold" style="color: red;">Freeze your account</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current float-left" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="py-1 menu-title footer-title" style="color: red;">Warning, you have a one-week period to reverse the freezing of your account, after which your account will be permanently deleted!!!!! 杂鱼喵~</p>
          <p class="py-1 menu-title footer-title" style="color: red;">We will handle your residual privacy data in accordance with the<RouterLink class="py-1 menu-title footer-title" style="color: red;" to="PrivacyPolicy">P̲r̲i̲v̲a̲c̲y̲ A̲g̲r̲e̲e̲m̲e̲n̲t̲</RouterLink>Pages 3</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current float-left" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="py-1 menu-title footer-title" style="color: red;">警告，您有一周的时间来撤销对您账户的冻结，之后您的账户将被永久删除!!!!! 杂鱼喵~</p>
          <p class="py-1 menu-title footer-title" style="color: red;">我们将根据<RouterLink class="py-1 menu-title footer-title" style="color: red;" to="PrivacyPolicy">P̲r̲i̲v̲a̲c̲y̲ A̲g̲r̲e̲e̲m̲e̲n̲t̲</RouterLink>Pages 3处理您的隐私数据。</p>  
          <form method="dialog">
          <button class="btn " style="color: red;" onclick="Freezec.showModal(); ">Freeze</button>
          </form>
        </div>
      </dialog>

       <!-- 冻结账号窗口 confirm -->
       <dialog id="Freezec" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 class="text-lg font-bold" style="color: red;">Account Freeze - Confirm again</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current float-left" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="py-1 menu-title footer-title" style="color: red;">You should be aware of what you are doing; this operation has a one-week grace period for cancellation, after which any actions cannot be undone!!!!! 杂鱼喵~</p>
          <p class="py-1 menu-title footer-title" style="color: red;">你应该知道你在做什么,此操作有一周的取消宽限期，之后任何操作都无法撤消!!!!! 杂鱼喵~</p>
          <p class="py-1 menu-title footer-title" style="color: red;">If you have understood the implications of this action and are determined to delete your account, please enter " D̲e̲l̲e̲t̲e̲ m̲y̲ a̲c̲c̲o̲u̲n̲t̲" in the box below and click the confirm button.</p>
            <input type="text" v-model="ConfirmAccountFreeze" class="input" placeholder="Confirm" />
            <button class="btn"  style="color: red;" :onclick="ConfirmDeleteAccount">Confirm</button>
        </div>
      </dialog>



        <!-- 原有内容 -->
            
        <div class="float-right">
          <div class=" content-start flex  md:flex-row gap-4 p-4 w-200">
            <div class="flex content-between">
              <fieldset class="shadow-xl float-left fieldset ml-5 w-xs glass border border-base-300 p-4 rounded-box">
                <legend class="fieldset-legend menu-title" style="color: white;">Account Setting</legend>
                <label class="fieldset-label" style="color: white;">在这里更改您的账户信息</label>

             
            
                <label class="fieldset-label card-title float-left" style="color: white;">Username:</label>
                <input v-model="newuserName" type="text" class="input float-left" :placeholder="username" />
                     <div class="card-actions justify-end">
                  </div>
                
                <label class="fieldset-label card-title float-left" style="color: white;">NickName:</label>
                <input v-model="newnickname" type="text" class="input float-left" :placeholder="nickname" />
          
                  <h2 class="card-title" style="color: white;">Set your sign!</h2>
                  <p >If you want to set your sign!</p>
                  <textarea v-model="newdescription" class="textarea textarea-bordered" :placeholder="description"></textarea>
           

                <button class="btn btn-neutral mt-4 w-25" :onclick="changeuserInfo">Sava</button>
              </fieldset>
            </div>            
          </div>
        </div>
        <fieldset class="fieldset w-xs glass border border-base-300 p-4 rounded-box float-right">
        <legend class="fieldset-legend menu-title" style="color: white;">Advanced Account Settings</legend>
            <div class="join">   
            <div class="card">
              <label class="fieldset-label card-title " style="color: white;">绑定Minecraft账户:</label>
              <button class="btn btn-neutral flex-1" onclick="BindMinecraft.showModal()">BindMinecraft</button>

            <label class="fieldset-label card-title " style="color: white;">重置头像:</label>
            <button class="btn btn-neutral flex-1" onclick="avatar.showModal()">Avatar</button>
           
              <label class="fieldset-label card-title " style="color: white;">授权服务:</label>
              <button class="btn btn-neutral flex-1" onclick="Authorized.showModal()">Authorized Services</button>

              <label class="fieldset-label card-title " style="color: white;">登录设备管理:</label>
              <button class="btn btn-neutral flex-1" onclick="Device.showModal()">Device Management</button>

              <label class="fieldset-label card-title " style="color: white;">违规历史:</label>
              <button class="btn btn-neutral flex-1" onclick="Violation.showModal()">Violation history</button>

              <label class="fieldset-label card-title " style="color: red;">冻结账号:</label>
              <button class="btn btn-neutral flex-1" style="color: red;" onclick="Freeze.showModal()">Freeze</button>
            </div>
          </div>
        </fieldset>

      </div>
    </div>
</template>

<script setup>
import { ref, nextTick, inject, onMounted } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { SetAvatar } from '@/api/SetUserAvatar.d'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import eventBus from '@/utils/mitt.d'
import { getUserInfo } from '@/api/userInfo.d'
import { SetUserName } from '@/api/SetUsername.d'
import { SetNickName } from '@/api/SetNickName.d';
import { SetSign } from '@/api/Setsign.d';

const selectedFile = ref(null);
const previewImage = ref(null);
const cropperRef = ref(null);

const LoginToken = Cookies.get('LoginToken')

const nickname = ref([])
const description = ref([])
const username = ref([])

const newuserName = ref([])
const newnickname = ref([])
const newdescription = ref([])


function changeuserInfo() {
  if (newuserName.value === username.value || newuserName.value.length === 0) {
  }else{
       SetUserName(newuserName.value,LoginToken).then(res => {
      if (res.status === 200) {
        open('Success', 'Your username has been successfully changed.', 'success')
        setTimeout(() => {
          window.location.reload()
          }, 2000)
      }else{
        open('Error', 'Your username has not been changed.', 'error')
      }
    })
  }


  if (newnickname.value === nickname.value || newnickname.value.length === 0) {
  }else{
    SetNickName(newnickname.value,LoginToken).then(res => {
      if (res.status === 200) {
        open('Success', 'Your nickname has been successfully changed.', 'success')
        setTimeout(() => {
          window.location.reload()
          }, 2000)
      }else{
        open('Error', 'Your nickname has not been changed.', 'error')
      }
    })
  }


  if (newdescription.value === description.value || newdescription.value.length === 0) {
  }else{
      SetSign(newdescription.value,LoginToken).then(res => {
      if (res.status === 200) {
        open('Success', 'Your description has been successfully changed.', 'success')
        setTimeout(() => {
          window.location.reload()
          }, 2000)
      }else{
        open('Error', 'Your description has not been changed.', 'error')
      }
    })
  }

  }
const ConfirmAccountFreeze = ref([])

const router = useRouter()

onMounted(() => {
  checkLoginToken()
})


// 检查是否存在 LoginToken，如果存在则跳转到主页
const isLogin = ref()
function checkLoginToken() {
getUserInfo(LoginToken).then(res => {
  if (res.status === 200) {
    nickname.value = res.data.nickname
    description.value = res.data.description
    username.value = res.data.username
    isLogin.value = false
  }else{
    Cookies.remove('LoginToken')
    window.location.href = "/";
  }
})

}


const open = (title, msg, type) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}

function ConfirmDeleteAccount() {
  const trx = 'DELETE MY ACCOUNT'
  if(trx === ConfirmAccountFreeze.value){
    Cookies.remove('LoginToken')
    open('Success', 'Your account has been successfully frozen.', 'success')
    setTimeout(() => {
      window.location.reload()
      }, 2000)
  }else{
    open('Error', 'Incorrect input, please try again.', 'error')
    setTimeout(() => {
      window.location.reload()
      }, 1000)
  }
}




// 设置头像
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
        if (res.status === 200) {
          open("Success", "Set avatar successfully", "success")
          eventBus.emit("avatar-updated")
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

// 设置用户名


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
  min-height: 55px !important;
  /* 防止被 textarea 的最小高度限制 */
  resize: none;
  /* 禁用拖拽调整大小 */
}
</style>
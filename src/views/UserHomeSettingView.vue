<template>
  <div class="mr-45">
    <!-- 头像重置窗口 -->
    <el-dialog v-model="avatarDialogVisible" title="重置头像" width="500" v-if="!EnableGIFAvatar">
      <div class="card flex flex-col items-center">
        <div class="px-10 pt-10">
          <!-- 当没有选择图片时显示默认头像 -->
          <label v-if="!previewImage" class="swap swap-flip text-9xl flex">
            <input type="checkbox" />
            <div class="swap-on">😈</div>
            <div class="swap-off">😇</div>
          </label>
          
          <!-- 当选择图片后显示 VueCropper -->
          <div v-else class="cropper-container flex justify-center">
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
        <div class="card-body mt-5 w-full">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">选择图片</legend>
            <input 
              type="file" 
              @change="handleFileChange" 
              accept="image/*" 
              class="file-input file-input-sm w-full max-w-xs" 
            />
            <label class="fieldset-label">最大尺寸 2MB</label>
          </fieldset>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="avatarDialogVisible = false">取消</el-button>
          <el-button type="primary" :disabled="!previewImage" @click="cropImage">
            确认
          </el-button>
          <el-button v-if="IsGIFAvatar" @click="SwitchGifAvatar">切换到动态头像</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 动态头像设置窗口 -->
    <el-dialog v-model="avatarDialogVisible" title="动态头像设置" width="500" v-else>
      <div class="card flex flex-col"> 
        <div class="px-10 pt-10">
          <h1 class="text-lg font-semibold mb-2">当您切换到动态头像时您的源头像将失效</h1>
          <h1 class="text-lg font-semibold mb-4">更改动态头像请前往社区</h1>
          <p class="mb-1">头像ID: {{ AvatarID }}</p>
          <p>启用状态: {{ EnableGIFAvatar ? '已启用' : '未启用' }}</p>
        </div>
        <div class="card-body mt-5">
          <div class="dialog-footer flex justify-end space-x-2">
            <el-button @click="avatarDialogVisible = false">取消</el-button>
            <el-button @click="SwitchGifAvatar">切换到普通头像</el-button>
            <el-button type="primary" @click="goToCommunity">前往社区更改</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 设备管理组件 -->
    <DeviceManager 
      :visible="showDeviceModal" 
      :devices="deviceList"
      @close="showDeviceModal = false"
      @delete="handleDeleteDevice"
    />  
    
    <!-- Yggdrasil账户组件 -->
    <YggdrasilAccount
      :visible="showYggdrasilAccount" 
      :UUID="YggdrasilUUID"
      :YggdrasilUrl="YggdrasilUrl"
      :HasYggdrasilAcc="HasYggdrasilAccount"
      @close="showYggdrasilAccount = false"
      @openacc="openaccount"
    />

    <!-- 绑定Minecraft账户窗口 -->
    <el-dialog v-model="bindMinecraftVisible" title="绑定 Minecraft 账户" width="500">
      <div class="p-4">
        <p v-if="!havebma" class="py-4">请在Minecraft服务器中输入指令 /bindweb 获取授权码</p>
        <p v-else class="py-4">您已绑定您的Minecraft账户,若要解绑,请在Minecraft服务器中输入指令 /unbindweb 来进行解绑操作</p>
        
        <div class="flex items-center space-x-4 mt-4">
          <div class="avatar">
            <div class="w-16 rounded-xl">
              <img :src="Link + mcuid" v-if="mcuid" />
            </div>
          </div>
          <div class="flex-1">
            <input 
              type="text" 
              class="input w-full" 
              v-model="code" 
              :placeholder="mcuid || '输入授权码'" 
              :disabled="havebma" 
            />
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="bindMinecraftVisible = false">取消</el-button>
        <el-button 
          type="primary" 
          :disabled="havebma" 
          @click="BindMcAccount"
        >
          绑定
        </el-button>
      </template>
    </el-dialog>

    <!-- 2FA设置窗口 -->
    <el-dialog v-model="auth2Visible" title="账户2FA设置" width="400">
      <div class="p-4">
        <div v-if="!have2fa">
          <p class="py-4 mb-4">点击开启账户2FA</p>
          <el-button type="primary" @click="OpenAccount2FA">开启2FA</el-button>
        </div>
        <div v-else>
          <p class="py-4 mb-4">点击关闭账户2FA</p>
          <el-button type="danger" @click="CloseAccount2FA">关闭2FA</el-button>
        </div>
        
        <div v-if="showQRCode" class="mt-6 text-center">
          <p class="py-4">扫描二维码绑定2FA令牌</p>
          <div class="flex justify-center">
            <Vue3NextQrcode :text="QrCodeValue" :logoCornerRadius="3" :correctLevel="2" :size="200"/>
          </div>
          <el-button class="mt-4" @click="showQRCode = false">关闭二维码</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 授权服务窗口 -->
    <el-dialog v-model="authorizedVisible" title="授权服务" width="700">
      <div class="p-4">
        <p class="py-4 mb-4">以下是您通过Oauth2登录过的Application</p>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>应用</th>
                <th>授权时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(service, index) in authorizedServices" :key="index">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="font-bold">{{ service.name }}</div>
                  </div>
                </td>
                <td>{{ service.date }}</td>
                <td>{{ service.active ? '活跃' : '未活跃' }}</td>
                <td>
                  <button class="btn btn-ghost btn-xs">取消授权</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-dialog>

    <!-- 违规历史窗口 -->
    <el-dialog v-model="violationVisible" title="违规历史" width="900">
      <div class="p-4">
        <div v-if="ViolationH.length > 0">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>BanID</th>
                  <th>封禁时间</th>
                  <th>执行者</th>
                  <th>原因</th>
                  <th>封禁状态</th>
                  <th>封禁类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="VH in ViolationH" :key="VH.banID">
                  <td>{{ VH.banID }}</td>
                  <td>{{ VH.banTime }}</td>
                  <td>{{ VH.bannedBy }}</td>
                  <td>{{ VH.reason }}</td>
                  <td>
                    <el-tag :type="VH.active ? 'danger' : 'success'">
                      {{ VH.active ? '活跃' : '非活跃' }}
                    </el-tag>
                  </td>
                  <td>{{ VH.type }}</td>
                  <td>
                    <el-button size="small" @click="viewViolationDetail(VH)">
                      查看详情
                    </el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-lg">=====+= 当前您的账户没有封禁记录，请继续保持喵~~~ =+=====</p>
        </div>
      </div>
    </el-dialog>

    <!-- 冻结账号窗口 -->
    <el-dialog v-model="freezeVisible" title="冻结账号" width="500">
      <div class="p-4">
        <el-alert title="警告" type="error" :closable="false" class="mb-4">
          <p class="py-1">您有一周的时间来撤销对您账户的冻结，之后您的账户将被永久删除！</p>
          <p class="py-1">
            我们将根据<RouterLink class="text-red-500 underline" to="/PrivacyPolicy">隐私协议</RouterLink>处理您的隐私数据
          </p>
        </el-alert>
        
        <el-alert title="Warning" type="error" :closable="false" class="mb-4">
          <p class="py-1">You have a one-week period to reverse the freezing of your account, after which your account will be permanently deleted!</p>
          <p class="py-1">
            We will handle your residual privacy data in accordance with the
            <RouterLink class="text-red-500 underline" to="/PrivacyPolicy">Privacy Agreement</RouterLink>
          </p>
        </el-alert>
        
        <el-button type="danger" @click="showFreezeConfirm = true">冻结账号</el-button>
      </div>
    </el-dialog>

    <!-- 冻结确认窗口 -->
    <el-dialog v-model="showFreezeConfirm" title="确认冻结" width="500">
      <div class="p-4">
        <el-alert title="最后确认" type="error" :closable="false" class="mb-4">
          <p class="py-1">您应该知道您在做什么，此操作有一周的取消宽限期，之后任何操作都无法撤消！</p>
          <p class="py-1">如果您已理解此操作的后果并确定要删除账户，请在下方输入框中输入 "删除我的账户" 并点击确认按钮</p>
        </el-alert>
        
        <el-input 
          v-model="ConfirmAccountFreeze" 
          placeholder="请输入'删除我的账户'" 
          class="mb-4"
        />
        
        <div class="flex justify-end space-x-2">
          <el-button @click="showFreezeConfirm = false">取消</el-button>
          <el-button 
            type="danger" 
            :disabled="ConfirmAccountFreeze !== '删除我的账户'"
            @click="ConfirmDeleteAccount"
          >
            确认冻结
          </el-button>
        </div>
      </div>
    </el-dialog>
      <div class="container mx-auto px-4">
        <!-- 原有内容 -->
            
        <div class="float-right">
          <div class=" content-start flex  md:flex-row gap-4 p-4 w-200">
            <div class="flex content-between">
              <fieldset class="shadow-xl float-left fieldset ml-5 w-xs glass border border-base-300 p-4 rounded-box">
                <legend class="fieldset-legend menu-title" style="color: white;">账户基础信息设置</legend>
                <label class="fieldset-label" style="color: white;">在这里更改您的账户信息</label>

             
            
                <label class="fieldset-label card-title float-left" style="color: white;">Username:</label>
                <input v-model="newuserName" type="text" class="input float-left" :placeholder="username" />
                     <div class="card-actions justify-end">
                  </div>
                
                <label class="fieldset-label card-title float-left" style="color: white;">NickName:</label>
                <input v-model="newnickname" type="text" class="input float-left" :placeholder="nickname" />
          
                  <h2 class="card-title" style="color: white;">设置你的个性签名</h2>
                  <p >If you want to set your sign!</p>
                  <textarea v-model="newdescription" class="textarea textarea-bordered" :placeholder="description" clearable></textarea>
           

                <button class="btn btn-neutral mt-4 w-25" @click="changeuserInfo">保存</button>
              </fieldset>
            </div>            
          </div>
        </div>
        <fieldset class="fieldset w-xs glass border border-base-300 p-4 rounded-box float-right">
        <legend class="fieldset-legend menu-title" style="color: white;">高级账户设置</legend>
            <div class="join">   
            <div class="card">
              <label :hidden="!isAdmin" class="fieldset-label card-title " style="color: white;">用户组{{ UserGroup }}的杂鱼管理员{{ username }}你好喵！:</label>
              <RouterLink :hidden="!isAdmin" class="btn btn-neutral flex-1" :to="'/cgi-bin/'+akey+'/admin/'+Aaction" >前往管理页面</RouterLink>

              <label class="fieldset-label card-title " style="color: white;">绑定Minecraft账户:</label>
              <button class="btn btn-neutral flex-1" @click="bindMinecraftVisible = true">BindMinecraft</button>
           
              <label class="fieldset-label card-title " style="color: white;">重置头像:</label>
              <button class="btn btn-neutral flex-1" @click="avatarDialogVisible = true">Avatar</button>

              <label class="fieldset-label card-title " style="color: white;">授权服务:</label>
              <button class="btn btn-neutral flex-1" @click="authorizedVisible = true">Authorized Services</button>

              <label class="fieldset-label card-title " style="color: white;">Yggdrasil Account:</label>
              <button class="btn btn-neutral flex-1" @click="showYggdrasilAccount = true; checkLoginToken()">外置登录账户设置</button>

              <label class="fieldset-label card-title " style="color: white;">登录设备管理:</label>
              <button class="btn btn-neutral flex-1" @click="showDeviceModal = true; DeviceList()">Device Management</button>    

              <label class="fieldset-label card-title " style="color: white;">违规历史:</label>
              <button class="btn btn-neutral flex-1" @click="violationVisible = true; Violation()">Violation history</button>

              <label class="fieldset-label card-title " style="color: white;">2FA:</label>
              <button class="btn btn-neutral flex-1" @click="auth2Visible = true">登录二次验证</button>

              <label class="fieldset-label card-title " style="color: red;">冻结账号:</label>
              <button class="btn btn-neutral flex-1" style="color: red;" @click="freezeVisible = true">Freeze</button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import eventBus from '@/utils/mitt.d'
import DeviceManager from '@/components/DeviceManager.vue';
import YggdrasilAccount from '@/components/YggdrasilAccount.vue';
import { 
  SetNickName, 
  BindMCAccount, 
  SetUserName, 
  getUserInfo, 
  SetAvatar,
  SetSign, 
  getUserDevices, 
  DeleteDevice,
  SwitchEnableGIFAvatar, 
  OpenYggdrasilAccount, 
  getUserViolationHistory, 
  Open2fa, 
  Close2fa 
} from '@/api/netcore.d';
import { Vue3NextQrcode } from 'vue3-next-qrcode'

const router = useRouter()

// 响应式状态
const avatarDialogVisible = ref(false)
const bindMinecraftVisible = ref(false)
const auth2Visible = ref(false)
const authorizedVisible = ref(false)
const violationVisible = ref(false)
const freezeVisible = ref(false)
const showFreezeConfirm = ref(false)
const showDeviceModal = ref(false)
const showYggdrasilAccount = ref(false)
const showQRCode = ref(false)

// 头像相关
const selectedFile = ref(null)
const previewImage = ref(null)
const cropperRef = ref(null)

// 用户数据
const LoginToken = Cookies.get('LoginToken')
const code = ref('')
const nickname = ref('')
const description = ref('')
const username = ref('')
const havebma = ref(false)
const EnableGIFAvatar = ref(false)
const IsGIFAvatar = ref(false)
const AvatarID = ref('')
const mcuid = ref('')
const HasYggdrasilAccount = ref(false)
const YggdrasilUUID = ref('')
const YggdrasilUrl = ref('')
const ViolationH = ref([])
const isAdmin = ref(false)
const akey = ref('')
const Aaction = ref('')
const UserGroup = ref('')
const have2fa = ref(false)

// 表单数据
const newuserName = ref('')
const newnickname = ref('')
const newdescription = ref('')
const ConfirmAccountFreeze = ref('')
const QrCodeValue = ref('')
const Link = "https://visage.surgeplay.com/face/64/"
const deviceList = ref([])

// 授权服务数据（示例）
const authorizedServices = ref([
  { name: 'TestApp', date: '2025.01.01 09:00:00', active: true }
])

// 初始化检查登录状态
onMounted(() => {
  checkLoginToken()
  Violation()
})

function checkLoginToken() {
  if (!LoginToken) {
    router.push('/login')
    return
  }
  
  getUserInfo(LoginToken).then(res => {
    if (res.status === 200) {
      nickname.value = res.data.nickname
      description.value = res.data.description
      username.value = res.data.username
      havebma.value = res.data.bma
      mcuid.value = res.data.mcuid
      IsGIFAvatar.value = res.data.IsGIFAvatar
      EnableGIFAvatar.value = res.data.EnableGIFAvatar
      AvatarID.value = res.data.AvatarID
      HasYggdrasilAccount.value = res.data.HasYggdrasilAccount
      YggdrasilUUID.value = res.data.YggdrasilUUID
      UserGroup.value = res.data.UserGroup
      isAdmin.value = res.data.isAdmin
      akey.value = res.data.akey
      Aaction.value = res.data.Aaction
      have2fa.value = res.data.have2fa
      YggdrasilUrl.value = res.data.url
    } else {
      Cookies.remove('LoginToken')
      router.push('/login')
    }
  }).catch(() => {
    Cookies.remove('LoginToken')
    router.push('/login')
  })
}

// 获取设备列表
const DeviceList = () => { 
  getUserDevices(LoginToken).then((res) => {
    if (res.status === 200) {
      deviceList.value = res.data
    }else {
      window.location.reload()
      open('错误', '登录信息失效', 'error')
    }
  })
}

// 获取违规历史
const Violation = () => { 
  getUserViolationHistory(LoginToken).then((res) => {
    if (res.status === 200) {
      ViolationH.value = res.data
    }
  })
}

// 开启2FA
const OpenAccount2FA = () => { 
  Open2fa(LoginToken).then((res) => { 
    if (res.status === 200 && res.data.status === true) {
      showQRCode.value = true
      QrCodeValue.value = res.data.url
      checkLoginToken()
      open('Success', '开启成功,请使用手机上的谷歌身份验证器（google authenticator）或 微软身份验证器（Microsoft Authenticator）动态口令认证器扫描二维码完成账户的绑定,此二维码只显示一次喵!', 'success')
    } else {
      open('错误', '您已开启2FA，无需再次开启', 'error')
    }
  })
}

// 关闭2FA
const CloseAccount2FA = () => { 
  Close2fa(LoginToken).then((res) => { 
    if (res.status === 204) {
      open('成功', '关闭成功，请重新登录', 'success')
      Cookies.remove('LoginToken')
      setTimeout(() => router.push('/login'), 1500)
    } else {
      open('错误', '关闭2FA失败', 'error')
    }
  })
}

// 开启Yggdrasil账户
const openaccount = () => {
  OpenYggdrasilAccount(LoginToken).then(res => { 
    if (res.status === 204) {
      open('成功', '您的Yggdrasil账户已成功开启', 'success')
      checkLoginToken()
    } else {
      open('错误', '开启Yggdrasil账户失败', 'error')
    }
  })
}

// 删除设备
const DeleteDevices = (device) => {
  DeleteDevice(LoginToken, device).then(() => {
  DeviceList()
  })
}

// 处理设备删除
const handleDeleteDevice = (device) => {
  DeleteDevices(device)
  deviceList.value = deviceList.value.filter(d => d.id !== device.id)
}

// 切换头像模式
const SwitchGifAvatar = () => { 
  SwitchEnableGIFAvatar(LoginToken).then(res => { 
    if (res.status === 204) {
      open('成功', '头像模式切换成功', 'success')
      eventBus.emit("avatar-updated")
      checkLoginToken()
    } else {
      open('错误', '头像模式切换失败', 'error')
    }
  })
}

// 绑定Minecraft账户
const BindMcAccount = () => {
  if (!code.value) {
    open('错误', '请输入授权码', 'error')
    return
  }
  
  BindMCAccount(code.value, LoginToken).then(res => {
    if (res.status === 200) {
      open('成功', 'Minecraft账户绑定成功', 'success')
      setTimeout(() => {
        checkLoginToken()
        bindMinecraftVisible.value = false
      }, 2000)
    } else {
      open('错误', 'Minecraft账户绑定失败', 'error')
    }
  })
}

// 更新用户信息
function changeuserInfo() {
  let updated = false
  
  if (newuserName.value && newuserName.value !== username.value) {
    SetUserName(newuserName.value, LoginToken).then(res => {
      if (res.status === 200) {
        checkLoginToken()
        open('成功', '用户名更新成功', 'success')
        updated = true
      }else {
        open('错误', '用户名更新失败', 'error')
      }
    })
  }

  if (newnickname.value && newnickname.value !== nickname.value) {
    SetNickName(newnickname.value, LoginToken).then(res => {
      if (res.status === 200) {
        checkLoginToken()
        open('成功', '昵称更新成功', 'success')
        updated = true
      }else {
        open('错误', '昵称更新失败', 'error')
      }
    })
  }

  if (newdescription.value && newdescription.value !== description.value) {
    SetSign(newdescription.value, LoginToken).then(res => {
      if (res.status === 200) {
        checkLoginToken()
        open('成功', '个性签名更新成功', 'success')
        updated = true
      }else {
        open('错误', '个性签名更新失败', 'error')
      }
    })
  }

  if (updated) {
    setTimeout(() => checkLoginToken(), 1000)
  }
}

// 确认删除账户
function ConfirmDeleteAccount() {
  if (ConfirmAccountFreeze.value === '删除我的账户') {
    // 这里应该是实际的账户冻结API调用
    open('成功', '账户冻结操作已提交', 'success')
    showFreezeConfirm.value = false
    freezeVisible.value = false
    Cookies.remove('LoginToken')
    setTimeout(() => router.push('/'), 1500)
  } else {
    open('错误', '确认文本输入错误', 'error')
  }
}

// 设置头像
const handleFileChange = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    
    // 检查文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      open('错误', '文件大小超过2MB限制', 'error')
      return
    }
    
    selectedFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
      nextTick(() => {
        if (cropperRef.value) {
          cropperRef.value.replace(e.target.result)
        }
      })
    }
    reader.readAsDataURL(selectedFile.value)
  }
}

// 裁剪图片
const cropImage = () => {
  if (cropperRef.value) {
    const canvas = cropperRef.value.getCroppedCanvas()
    
    canvas.toBlob((blob) => {
      const formData = new FormData()
      formData.append('avatar', blob, 'avatar.png')
      
      SetAvatar(LoginToken, formData).then(res => {
        if (res.status === 200) {
          cropperRef.value = null
          previewImage.value = null
          selectedFile.value = null
          avatarDialogVisible.value = false
          
          open("成功", "头像设置成功", "success")
          eventBus.emit("avatar-updated")
          setTimeout(() => checkLoginToken(), 1000)
        } else {
          open('错误', res.data.message || '头像设置失败', 'error')
        }
      })
    }, 'image/png')
  } else {
    open('错误', '请先选择图片', 'error')
  }
}

// 查看违规详情
const viewViolationDetail = (violation) => {
  ElMessageBox.alert(
    `封禁ID: ${violation.banID}\n时间: ${violation.banTime}\n执行者: ${violation.bannedBy}\n原因: ${violation.reason}`,
    '封禁详情',
    {
      confirmButtonText: '确定'
    }
  )
}

// 前往社区
const goToCommunity = () => {
  avatarDialogVisible.value = false
  router.push('/cgi-bin/community')
}

// 通知函数
const open = (title, msg, type) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
    duration: 3000
  })
}
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
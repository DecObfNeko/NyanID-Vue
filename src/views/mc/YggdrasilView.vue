<template>
    <div class="flex md:flex-row gap-4 p-4">
    <el-dialog v-model="skinDialogVisible" title="更改皮肤" width="500">
      <div class="card flex flex-col items-center">
        <div class="px-10 ">
        </div>
        <div class="card-body mt-5 w-full">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">选择图片</legend>
            <input 
              type="file" 
              @change="Skinselected" 
              accept="image/*" 
              class="file-input file-input-sm w-full max-w-xs" 
            />
            <label class="fieldset-label">上传限制 2MB</label>
          </fieldset>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="skinDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSkinChange" >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="capeDialogVisible" title="更改披风" width="500">
      <div class="card flex flex-col items-center">
        <div class="px-10 ">
        </div>
        <div class="card-body mt-5 w-full">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">选择图片</legend>
            <input 
              type="file" 
              @change="Capeselected" 
              accept="image/*" 
              class="file-input file-input-sm w-full max-w-xs" 
            />
            <label class="fieldset-label">上传限制 2MB</label>
          </fieldset>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="capeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCapeChange" >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
<div class="card card-border bg-base-100 overflow-x-auto h-80">
  <div class="card-body">
    <h2 class="card-title">Yggdrasil AuthServer 外置登录服务</h2>
    <p></p>
    <span id="dndLabel" draggable="true" @dragstart="dndLabel_dragstart($event)">本站Yggdrasil认证地址:{{ YggdrasilUrl+"/api/yggdrasil" }}  <== 可拖动到启动器</span>
    <p >启用状态: {{ HasYggdrasilAccount ? '已启用':'未启用' }}</p>
    <span v-if="HasYggdrasilAccount">玩家UUID: {{ YggdrasilUUID }}</span>
     <p>==+= </p>
    <div class="card-actions justify-end">
        <button v-if="!HasYggdrasilAccount" class="btn" @click="openaccount">创建Yggdrasil账户</button>
        <button v-if="HasYggdrasilAccount" class="btn" @click="skinDialogVisible = true">上传皮肤</button>
        <button v-if="HasYggdrasilAccount" class="btn" @click="capeDialogVisible = true">上传披风</button>
        <button v-if="HasYggdrasilAccount" class="btn btn-warning" @click="">删除所有材质</button>
    </div>
  </div>
</div>
<div class="card card-border glass row-reverse">
  <div class="card-body">
    <h2 class="card-title">皮肤预览</h2>
    <canvas id="skin_container"></canvas>
  </div>
</div>
</div>
</template>

<script setup lang="ts" name="YggdrasilView">
import { getUserInfo, OpenYggdrasilAccount, SetSkin,SetCape } from '@/api/netcore.d'
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import * as skinview3d from 'skinview3d'
import axios from 'axios';
import { ElNotification, ElMessageBox } from 'element-plus'
const LoginToken = Cookies.get('LoginToken')

interface MinecraftProfile {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    value: string;
    signature?: string | null;
  }>;
}
interface TexturesPayload {
  textures: {
    SKIN?: {
      url: string;
      metadata?: {
        model: 'slim' | 'default';
      };
    };
    CAPE?: {
      url: string;
    };
  };
}
const router = useRouter()

const username  = ref('')
const HasYggdrasilAccount  = ref(false)
const skinDialogVisible  = ref(false)
const capeDialogVisible  = ref(false)
const YggdrasilUUID  = ref('')
const YggdrasilUrl  = ref('')
const skinurl = ref()
const capeurl = ref()
const model = ref('slim')
const selectedSkin = ref(Blob.prototype)
const selectedCape = ref(Blob.prototype)


const Skinselected = (event : any) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    if (file.size > 2 * 1024 * 1024) {
      open('错误', '文件大小超过2MB限制', 'error')
      return
    }
    selectedSkin.value = file
}
}

const Capeselected = (event : any) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    if (file.size > 2 * 1024 * 1024) {
      open('错误', '文件大小超过2MB限制', 'error')
      return
    }
    selectedCape.value = file
}
}

const handleSkinChange = () => { 
    const formData = new FormData()
    formData.append('skin',selectedSkin.value , 'skin.png')
    formData.append('modle',model.value)
    SetSkin(LoginToken, formData).then(res => { 
        if (res.status === 204) {
            open("成功", "皮肤设置成功", "success")
            skinDialogVisible.value = false
            setTimeout(() => checkLoginToken(), 1000)
        } else {
            open('错误', res.data.message || '皮肤设置失败', 'error')
        }
    })
}

const handleCapeChange = () => { 
    const formData = new FormData()
    formData.append('cape',selectedCape.value , 'cape.png')
    SetCape(LoginToken, formData).then(res => { 
        if (res.status === 204) {
            open("成功", "披风设置成功", "success")
            capeDialogVisible.value = false
            setTimeout(() => checkLoginToken(), 1000)
        } else {
            open('错误', res.data.message || '披风设置失败', 'error')
        }
        }
        
    )
}

const open = ( title: any, msg: any, type: any) => {
  ElNotification({
    title: title,
    message: msg,
    type: type,
    duration: 3000
  })
}


function checkLoginToken() {
  if (!LoginToken) {
    router.push('/login')
    return
  }
  
  getUserInfo(LoginToken).then(res => {
    if (res.status === 200) {
      username.value = res.data.username
      HasYggdrasilAccount.value = res.data.HasYggdrasilAccount
      YggdrasilUUID.value = res.data.YggdrasilUUID
      YggdrasilUrl.value = res.data.url
      fetchSkinData(res.data.YggdrasilUUID,res.data.username)

    } else {
      Cookies.remove('LoginToken')
      router.push('/login')
    }
  }).catch(() => {
    Cookies.remove('LoginToken')
    router.push('/login')
  })
}

async function fetchSkinData(uuid : string,name : string) {
  const apiUrl = YggdrasilUrl.value+"/api/yggdrasil"+`/sessionserver/session/minecraft/profile/${uuid}`;
  try {
    const response = await axios.get<MinecraftProfile>(apiUrl);
    const profile = response.data;

    const texturesProperty = profile.properties.find(p => p.name === 'textures');
    if (!texturesProperty) {
      throw new Error('Textures property not found');
    }

    const decodedValue = atob(texturesProperty.value);
    const texturesData: TexturesPayload = JSON.parse(decodedValue);

    skinurl.value = texturesData.textures.SKIN?.url
    capeurl.value = texturesData.textures.CAPE?.url
          const skinViewer = new skinview3d.SkinViewer({
            canvas: document.getElementById("skin_container") as HTMLCanvasElement, 
            skin: "data:image/png;base64,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"
        });
        skinViewer.loadSkin(skinurl.value);
        skinViewer.loadCape(capeurl.value);
        skinViewer.width = 500;
        skinViewer.height = 400;
        skinViewer.fov = 70;
        skinViewer.zoom = 0.6;
        skinViewer.animation = new skinview3d.WalkingAnimation();
        skinViewer.animation.speed = 1;
        skinViewer.nameTag = name;
  } catch (error) {
    console.error('Error fetching skin data:', error);
    skinurl.value = "null"
    capeurl.value = "null"
  }
}
function dndLabel_dragstart(event : any) {
	let yggdrasilApiRoot = YggdrasilUrl.value+"/api/yggdrasil";
	let uri = "authlib-injector:yggdrasil-server:" + encodeURIComponent(yggdrasilApiRoot);
	event.dataTransfer.setData("text/plain", uri);
	event.dataTransfer.dropEffect = "copy";
}



onMounted(() => {
  checkLoginToken()
  document.title = 'NyanID | Yggdrasil外置登录服务'
})


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

 
</script>
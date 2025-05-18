<template>
<footer class="footer sm:footer-horizontal text-base-content p-10 glass fixed-bottom">
  <aside>
    <img src="@/assets/img/logo.png" class="w-16" />
    <p class="footer-title">
        NyaCat Cloud Software Studio.<br />
      <br />
      {{ $t('AppFooter-cr') }} 2018-2025 DecobfnekoDev LTD. ©NyanCat Cloud
      <br />
      <br />
    </p>
    <div class="locale-changer">
  </div>
  </aside>
  <figure>  
 
   <button @click="ClickCat()" >
    <p class="footer-title">
    <img src="@/assets/img/9d29c274472bfd1e58bf4e7a2efb180f.png" class="w-40" />
        {{ $t('AppFooter-clickcatmsg') }}
    </p>
   </button>
  </figure>
  <div class="divider divider-horizontal"></div>

  <nav>
    <h6 class="footer-title">( •̀ ω •́ )✧{{ $t('AppFooter-Services') }}</h6>
    <RouterLink to="/aboutus" class="link link-hover">⇒{{ $t('AppFooter-aboutus') }}</RouterLink>
    <RouterLink to="/PrivacyPolicy" class="link link-hover">⇒{{ $t('AppFooter-pp') }}</RouterLink>
    <RouterLink to="/tos" class="link link-hover">⇒{{ $t('AppFooter-tos') }}</RouterLink>
    <RouterLink to="/DMCA" class="link link-hover">⇒{{ $t('AppFooter-dmca') }}</RouterLink>
    <h8 class="footer-title">🌏{{ $t('AppFooter-switchLang') }}:</h8>
      <select 
    v-model="$i18n.locale"
    class="select select-xs"
  >
    <option 
      v-for="locale in availableLocales"
      :key="locale"
      :value="locale"
    >
      {{ getLocaleName(locale) }}
    </option>
  </select>
  </nav>


</footer>

<transition-group name="toast" tag="div">
    <div v-for="(toast, index) in toasts" :key="index" class="toast toast-end" @click="closeToast(index)">
      <div class="alert alert-info" @click="closeToast(index)">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
         </svg>
        <span>{{ clickmsg }}</span>
      </div>
    </div>
  </transition-group>
</template>

<style lang="css" scoped>
.footer {
  background-image: #17436e;
  opacity: 0.9;
}
img {
    -webkit-user-drag: none;
    -moz-user-drag: none;
    -ms-user-drag: none;
    -user-drag: none;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.toast-move {
  transition: transform 0.5s ease;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

type SupportedLocale = 'en' | 'zh' | 'ja' | 'ko'

const { t, locale, availableLocales } = useI18n()
const router = useRouter()

const currentLocale = ref<SupportedLocale>(locale.value as SupportedLocale)

const getLocaleName = (code: SupportedLocale) => {
  const names: Record<SupportedLocale, string> = {
    en: 'English',
    zh: '中文',
    ja: '日本語',
    ko: '한국어'
  }
  return names[code] || code.toUpperCase()
}

const toasts = ref<Array<{ id: number, timer: ReturnType<typeof setTimeout> }>>([])
const lang = ref({})

let toastId = 0
let clickmsg = ref()


function ClickCat() {
  clickmsg.value = "喵喵喵~"
  const id = toastId++
  const timer = setTimeout(() => {
    closeToast(id)
  }, 1000) 

  toasts.value.push({ id, timer })
}

function closeToast(id: number) {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    clearTimeout(toasts.value[index].timer)
    toasts.value.splice(index, 1)
  }
}
</script>
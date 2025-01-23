<template>
<header>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <a class="flex-0.5 btn btn-ghost px-3 h-13">
        <div class="avatar">
          <div class="w-10 rounded">
            <img src="@/assets/img/logo.png" />
          </div>
        </div>
        <div class="font-title inline-flex text-lg md:text-2xl">NyaCat Cloud</div>
      </a>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>HOME</a></li>
        <li><a>McServer</a></li>
        <li>
          <details>
            <summary>API/应用程序接入</summary>
            <ul class="p-2">
              <li><a>开发者中心</a></li>
              <li><a>API文档</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>LEADERBOARDS</summary>
            <ul class="p-2">
              <li><a>猫粮排行榜</a></li>
              <li><a>Ranked</a></li>
            </ul>
          </details>
        </li>
        <li><a>NAMEMC</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Login</a>
    </div>
  </div>
</header>
<section id="section">
</section>
</template>

<style>
#section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
      console.log(randomint);
      try {
        let m = await import(`@/assets/rimages/${randomint}.jpg`);
        imgUrl.value = m.default;
        document.getElementById('section').style.backgroundImage = `url(${imgUrl.value})`;
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };

    onMounted(() => {
      randomImg();
    });

    return {
    };
  }
};
</script>
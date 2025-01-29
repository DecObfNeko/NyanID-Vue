<template html>
  <div class="base-300 dark:bg-base-300">
    <div ref="spineContainer" id="spine-container"> <!-- 添加这个 div -->
    <router-view  mode="out-in" v-slot="{ Component }" >
      <AppHeader #="body" html data-theme=""> 
      </AppHeader>
      
       <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
  <AppFooter />
</router-view>
</div>
</div>
</template>
//把页面拆成一个个component和view然后在这里引入

<script name="App" lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { Application, Assets } from 'pixi.js';
import '@esotericsoftware/spine-pixi-v8';
import { BgggS } from '@/config/bgenv.d';
import { ref, onMounted, reactive } from 'vue';


    /* 初始化 */
    const initialize = async () => {
      await randomImg();

      setTimeout(() => {
        console.log(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠶⠖⠒⠶⠶⠤⣄⣀⠀⠀⢀⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⢀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢲⢮⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠈⠒⠤⡀⠀⠀⠀⠀⣠⠏⠀⠈⠳⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⠀⠀⠀⠈⠑⠢⣄⣴⠃⠀⠀⠀⠀⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣤⣤⣤⣤⣤⡤⡴⢲⠆⣤⣤⢄⣤⣤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣷⣴⣶⣶⣶⣤⢄⡼⠋⠲⢄⡀⠀⠀⠀⠀⠈⢦⣶⣶⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⡶⣤⣤⣤⣤⣤⣤⣤⣾⣾⠃⠀
⠀⠀⠀⠀⠐⠛⠛⠛⠛⠛⣿⣿⡟⢀⣾⣿⢋⣾⣿⠃⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠛⠛⠛⠛⠛⣻⣿⡿⢋⡾⠁⠀⠀⠀⢈⣑⣤⣀⠻⣿⣿⣿⣿⣿⣿⣿⠏⢀⣀⣤⣴⣶⣿⡿⠟⠋⠚⠛⠛⠛⠛⢻⣿⣿⠟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⠏⢀⣾⡿⢣⣾⡿⢃⣾⡿⢣⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⢀⣼⣿⣿⣿⡿⠛⢡⡟⢠⣿⣿⣿⣿⣿⣿⠃⠀⣁⣊⠛⠋⣩⣿⣿⣿⣿⡿⢿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⠋⠀⠀⠀⠀
⠀⠀⢠⣤⣤⣤⣤⣶⣿⠟⢁⣴⣿⠟⣡⣿⣿⣷⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣴⣾⡿⠋⠁⠀⠀⣠⠏⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⢿⣤⣴⣿⡿⠋⠉⠀⢠⣿⣿⠏⠀⠀⠀⣤⣤⣤⣤⣶⣾⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠐⠛⠛⠛⠛⠋⠉⠀⠀⠛⠋⠁⠐⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠿⠿⠛⠋⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠸⠟⠛⠉⠀⠛⠛⠛⠉⠀⠀⠀⠠⠿⠿⠃⠀⠀⠀⠚⠿⠟⠛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠁⣤⣤⣤⡄⣠⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡄⠀⠀⠀⠀⠀⠀⣠⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠜⢀⡾⠷⣶⡏⣼⢣⡟⢀⡾⣵⣿⣿⢃⣴⣯⣿⢀⡾⢋⡾⠛⠛⣼⠛⣿⢣⡞⢸⣇⡼⣫⣾⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠚⠛⠛⠋⠘⠁⠛⠛⠋⠘⠛⠛⠓⠋⠀⠘⠃⠛⠀⠘⠛⠛⠘⠁⠘⠃⠛⠀⠛⠋⠀⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    NyanID - Vue3 DevReBuild 0.3v                      
`);}, 200);
    };


      (async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Load the assets.
    await Assets.load([
        {
            alias: 'spineSkeleton',
            src: '/assets/4k/CH0258_home.json',
        },
        {
            alias: 'spineAtlas',
            src: '/assets/4k/CH0258_home.atlas',
        },

    ]);

 

    // Create our character
    const bg1 = new BgggS();

    // Adjust views' transformation.
    bg1.view.x = app.screen.width -900;
    bg1.view.y = app.screen.height ;
    bg1.spine.scale.set(0.3);
    
    // Add character to the stage.
    app.stage.addChild(bg1.view);

    // Trigger character's spawn animation.
    bg1.spawn();


    // Animate the character based on the controller's input.
})();
    






    

    onMounted(() => {
      initialize();
});



    /* 随机背景图片 */
    const imgUrl = ref('');

    const randomImg = async () => {
      let randomint = Math.floor(Math.random() * 31) + 1;
      try {
        let m = await import(`@/assets/rimages/${randomint}.jpg`);
        imgUrl.value = m.default;
        const sectionElement = document.getElementById('section');
        if (sectionElement) {
          sectionElement.style.backgroundImage = `url(${imgUrl.value})`;
        }
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };


// Asynchronous IIFE

</script>

<style scoped>
#section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease;
  opacity: 1;
  transform: translateY(0);
  border: none;

}
.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateZ(90px);
  border: none;
  background-color: transparent;
}

.fade-enter-from {
  transition: opacity 0.5s ease;
  opacity: 0;
  transform: translateY(80px);
  transition-timing-function: ease-in-out;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s ease;
  transition-timing-function: ease-out;
  transition-property: opacity, transform;
  border: none;
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
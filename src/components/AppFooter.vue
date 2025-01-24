<template>
<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 glass ">
  <aside>
    <img src="@/assets/img/logo.png" class="w-16" />
    <p class="footer-title">
        NyaCat Cloud Software Studio.<br />
      <br />
      Copyleft 2018-2024 DecobfnekoDev Industries, LLC. All Rights Reserved.
      <br />
      The source of the picture resources used on this site is the Internet,<br /> if there is any infringement, please contact us to delete.
    </p>
  </aside>
  <figure>  
 
   <button @click="ClickCat()">
    <p class="footer-title">
    <img src="@/assets/img/miaonai.png" class="w-40 animate-bounce" />
        这是猫猫,你可以摸摸她awa
    </p>
   </button>
  </figure>
  <div class="divider divider-horizontal"></div>

  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Design</a>
    <a class="link link-hover">Marketing</a>
    <a class="link link-hover">Advertisement</a>
  </nav>


</footer>


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
</style>

<script setup lang="ts">
function ClickCat() {


}





</script>
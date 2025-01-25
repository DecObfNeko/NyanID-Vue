<template>
<div class="hero glass min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <p class="py-8 footer-title">
        Login to NyanID for full online service support ฅ(＞﹏＜) 
      </p>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
  <div class="divider lg:divider-horizontal"></div>
</div>
    <div class="card w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body footer-title">
        <h2 class="text-2xl font-bold">Login NyanID</h2>
        <fieldset class="fieldset">
          <label class="fieldset-label">Email</label>
          <input type="email" name="email" class="input" placeholder="Email" required />
          <label class="fieldset-label">Password</label>
          <input type="password" class="input" placeholder="Password" required />
          <div><RouterLink to="/findpwd" class="link link-hover">Forgot password?</RouterLink>  <RouterLink to="/register" class="link link-hover">Register Now!</RouterLink> </div>
          <button class="btn btn-neutral mt-4" >Login</button>
        </fieldset>
        
      </div>
    </div>
  </div>
</div>


</template>



<script setup lang="ts" name="LoginView">




</script>


<style scoped>




</style>
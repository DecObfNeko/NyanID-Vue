<template>
    <div class="flex p-9">
    <div class="hero ">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div>
      <h1 class="text-5xl font-bold" style="color: azure;">The NyanCat NetWork</h1>
      <p class="py-6" style="color: azure;">
        A Minecraft 1.8.9-1.20.1 Mix GameModes Server
      </p>
      <button class="btn btn-primary">CopyIp</button>
    </div>
  </div>
</div>
<ul class="list bg-base-100 rounded-box shadow-md">
  
  <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">ServerList</li>
  
  <li class="list-row">
    <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profilqwee/demo/1@94.webp"/></div>
    <div>
      <div>PVP Practice Server</div>
      <div class="text-xs uppercase font-semibold opacity-60">OnlinePlayers: {{ ServerInfo[0]?.onlinePlayers.pvp }}</div>
    </div>
    <p class="list-col-wrap text-xs">
      "1.8.9 PVP服务器,Lower AntiCheat Check Version f cj djhsd jh djshkhdskj fh hjkh dsfjkhsdfh jk dsjfjk dsf"
    </p>
    <button class="btn btn-primary">MoreInfo</button>
  </li>
  
  <li class="list-row">
    <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/prowqefile/demo/4@94.webp"/></div>
    <div>
      <div>SMP Server</div>
      <div class="text-xs uppercase font-semibold opacity-60">OnlinePlayers: </div>
    </div>
    <p class="list-col-wrap text-xs">
      1.20.1生电服务器
    </p>
    <button class="btn btn-primary">MoreInfo</button>
  </li>
  
</ul>

</div>

</template>

<script setup lang="ts">



const ServerInfo = [
  {
    onlinePlayers: {
        pvp: 20,
        smp: 20

    }
  }
]



</script>
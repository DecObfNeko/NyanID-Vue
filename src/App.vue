<template>
  <body name="app" class="app">
    <h1>{{a}}</h1>
    <button v-on:click="test()">clickme</button>

  </body>



</template>


<script name="App" lang="ts" setup>
import { reactive } from 'vue';

let a = reactive([])

function test() {
 Object.assign(a, ["asdasdasdasd"])
}


</script>





<script lang="ts">

</script>






<style scoped>

</style>
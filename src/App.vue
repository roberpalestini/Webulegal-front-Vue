 
<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet">


  <vue-progress-bar></vue-progress-bar>


  <!-- <TransitionGroup name="list" tag="div"> -->
  <RouterView />
  <!-- </TransitionGroup> -->

  <a href="https://wa.me/5493518604251?text=" class="whatsapp" target="_blank">
    <img src="@/assets/whatsapp.svg" style="height:30px;width:30px;filter:invert()" />
  </a>


</template>
 


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html,
body {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
<style>
.modal-xl {
  max-width: 1200px !important;
}

.whatsapp {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  left: 40px;
  background-color: #25d366;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  z-index: 100;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.whatsapp-icon {
  margin-top: 13px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'
</script>
<script>
export default {
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        if (to.meta.auth) {
          if (localStorage.getItem('auth') == null || localStorage.getItem('auth') == '' || localStorage.getItem('auth') == ' ' || localStorage.getItem('auth') == undefined)
            window.location.href = "/";
        }

      },
    },
  },
  setup() {

  },
}
</script>
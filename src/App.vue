<template>
  <AppHeader />

  <!-- <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :is="Component"></Component>
    </Transition>
  </RouterView> -->
  <RouterView />

  <AppPlayer />

  <Auth />
</template>

<script>
import AppHeader from '@/components/Header.vue'
import Auth from '@/components/Auth.vue'
import AppPlayer from './components/Player.vue'

import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import { auth } from './includes/firebase'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
    AppPlayer,
    RouterView
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<!-- <style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style> -->

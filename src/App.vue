<template>
  <HeaderComponent />
  <main>
    <app-ask/>
    <AnswersByCategory />
    <WhatWeDo />
  </main>
  <FooterComponent />
  <CookieModal v-if="showCookieModal" />
</template>

<script>
import { ref, onMounted, onBeforeMount } from 'vue'
import store from './store'
 
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import AnswersByCategory from './components/answers/AnswersByCategory.vue';
import WhatWeDo from './components/WhatWeDo.vue';
import FooterComponent from './components/Footer.vue';
import CookieModal from './components/CookieModal.vue';
import '@/assets/styles/style.scss';


export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    AnswersByCategory,
    WhatWeDo,
    FooterComponent,
    CookieModal
  },
  setup() {
    const showCookieModal = ref(true)

    onBeforeMount(() => {
      store.dispatch('isAuthenticated')
    })
    onMounted(() => {
      isCookieHidden()
    })

    function isCookieHidden() {
      getCookie('hideCookieModal') || window.sessionStorage.getItem('hideCookieModal') ? showCookieModal.value = false : showCookieModal.value = true
    }
    function getCookie(name) {
      const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    return {
      showCookieModal
    }
  }
}
</script>


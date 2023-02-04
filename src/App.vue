<template>
	<HeaderComponent />
  <main>
    <router-view />
  </main>
  <FooterComponent />
  <CookieModal v-if="showCookieModal" />
</template>

<script>
import { ref, onMounted } from 'vue'
 
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue';
import CookieModal from './components/CookieModal.vue';
import '@/assets/styles/style.scss';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    CookieModal
  },
  setup() {
    const showCookieModal = ref(true)

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

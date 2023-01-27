<template>
  <HeaderComponent />
  <main>
    <app-ask/>
    <FindsAnswers />
    <WhatWeDo />
  </main>
  <FooterComponent />
  <CookieModal v-if="showCookieModal" />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FindsAnswers from './components/answers/FindsAnswers.vue';
import WhatWeDo from './components/WhatWeDo.vue';
import FooterComponent from './components/Footer.vue';
import CookieModal from './components/CookieModal.vue';
import '@/assets/styles/style.scss';

// import { onMounted } from 'vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FindsAnswers,
    WhatWeDo,
    FooterComponent,
    CookieModal
  },
  data() {
    return {
      showCookieModal: true,
    }
  },
  mounted() {
    this.isCookieHidden()
    console.log('222');
  },
  methods: {
    isCookieHidden() {
      this.getCookie('hideCookieModal') || window.sessionStorage.getItem('hideCookieModal') ? this.showCookieModal = false : this.showCookieModal = true
    },
    getCookie(name) {
      const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }
}
</script>


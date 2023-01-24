<template>
  <HeaderComponent />
  <main>
    <app-ask/>
    <FindsAnswers />
    <WhatWeDo />
  </main>
  <FooterComponent />
  <CookieModal v-if="false" />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FindsAnswers from './components/answers/FindsAnswers.vue';
import WhatWeDo from './components/WhatWeDo.vue';
import FooterComponent from './components/Footer.vue';
import CookieModal from './components/CookieModal.vue';
import '@/assets/styles/style.scss'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FindsAnswers,
    WhatWeDo,
    FooterComponent,
    CookieModal
  }
}
</script>


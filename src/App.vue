<template>
  <HeaderComponent />
  <main>
    <app-ask/>
    <FindsAnswers />
    <WhatWeDo />
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FindsAnswers from './components/answers/FindsAnswers.vue';
import WhatWeDo from './components/WhatWeDo.vue';
import FooterComponent from './components/Footer.vue'
import '@/assets/styles/style.scss'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FindsAnswers,
    WhatWeDo,
    FooterComponent,
  }
}
</script>


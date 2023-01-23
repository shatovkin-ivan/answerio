<template>
  <HeaderComponent />
  <main>
    <app-ask/>
    <FindsAnswers />
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FindsAnswers from './components/answers/FindsAnswers.vue';
import FooterComponent from './components/Footer.vue'
import '@/assets/styles/style.scss'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FindsAnswers,
    FooterComponent,
  }
}
</script>


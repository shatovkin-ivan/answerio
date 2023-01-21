<template>
  <HeaderComponent />
  <app-ask/>
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FooterComponent from './components/Footer.vue'
import '@/assets/styles/style.scss'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FooterComponent,
  }
}
</script>


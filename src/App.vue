<template>
  <HeaderComponent />
  <app-ask/>
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/Header.vue'
import AppAsk from './components/AppAsk.vue';
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AppAsk,
    FooterComponent,
  }
}
</script>


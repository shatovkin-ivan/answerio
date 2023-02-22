<template>
  <header class="header">
    <div class="container flex gap-50">
      <a href="#" @click="toHome" class="header__title">
        <svg class="header__logo">
          <use xlink:href="@/assets/images/sprites.svg#logo"></use>
        </svg>
      </a>
      <button
        @click="!isAuth ? login() : logout()"
        class="header__button"
        v-text="!isAuth ? 'Sign In' : 'Sign Out'"
      ></button>
    </div>
  </header>
</template>

<script>
import { signIn, signOut } from '@/plugin/authPopup'
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'

import store from '@/store'

export default {
  name: 'HeaderComponent',
  setup() {
    const getIsAuth = computed(() => {
      return store.getters.getAuthenticated
    })

    const router = useRouter()

    const isAuth = ref(getIsAuth)

    function login() {
      signIn(loginCompleted)
    }
    function loginCompleted() {
      store.dispatch('setAuthenticated')
    }
    function logoutCompleted() {
      store.dispatch('removeAuthenticated')
    }
    function logout() {
      signOut(logoutCompleted)
    }
    function toHome() {
      window.location.href = '/'
    }
    return {
      isAuth,
      login,
      logout,
      toHome,
      router,
    }
  },
}
</script>

<style scoped lang="scss">
.header {
  padding-top: 24px;
  margin-bottom: 131px;

  &__title {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 240%;
  }
  &__logo {
    max-width: 112px;
    height: 34px;
  }

  &__button {
    font-size: 2rem;
    font-weight: 500;
    color: #7f8186;
    background: #1d1f20;
    box-shadow: 0px 34px 64px rgba(0, 0, 0, 0.25);
    border-style: none;
    border-radius: 18px;
    padding: 20px 50px;
    transition: 0.3s color ease-in-out, 0.3s background-color ease-in-out;

    &:hover {
      color: rgba(255, 255, 255, 0.4);
      background-color: var(--theme-color-1);
    }
  }
}

@media screen and (max-width: 1440px) {
  .header {
    margin-bottom: 116px;
  }
}

@media screen and (max-width: 1440px) and (min-width: 991px), screen and (max-height: 900px) {
  .header {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 991px) {
  .header {
    margin-bottom: 77px;

    &__button {
      padding: 20px 30px;
    }
  }
}

@media screen and (max-width: 560px) {
  .header {
    margin-bottom: 60px;
    &__button {
      padding: 15px 18px;
      font-size: 1.8rem;
    }
  }
}
</style>

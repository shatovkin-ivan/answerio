<template>
  <section class="sign-up">
    <div class="container">
      <div class="sign-up__wrap">
        <div class="sign-up__inner-wrap">
          <p class="sign-up__title">Sign up to get unlimited access</p>
          <button type="button" @click="login" class="sign-up__button">
            <span>Sign Up with Google</span>
            <div class="sign-up__icon-gmail"></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@/store'

import { signIn } from '@/plugin/authPopup'

export default {
  setup() {
    function login() {
      signIn(loginCompleted)
    }
    function loginCompleted() {
      store.dispatch('setAuthenticated')
    }
    return {
      login,
    }
  }
}
</script>

<style lang="scss">
.sign-up {
  padding-top: 122px;

  &__wrap {
    position: relative;
    background: #224efe;
    border-radius: 30px;
    padding: 122px 0;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &::before {
      bottom: 0;
      left: 0;
      width: 480px;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='570' height='480' viewBox='0 0 570 480' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_90_612' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='570' height='480'%3E%3Crect x='569.335' y='0.665278' width='478.669' height='568.669' transform='rotate(90 569.335 0.665278)' fill='%23C4C4C4' stroke='white' stroke-width='1.33056'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_90_612)'%3E%3Cpath opacity='0.2' d='M198.683 603.469C106.432 603.469 31.6458 528.578 31.6458 436.194C31.6458 343.81 106.432 268.92 198.683 268.92C290.934 268.92 365.72 343.81 365.72 436.194C365.72 528.578 290.934 603.469 198.683 603.469Z' stroke='white' stroke-width='1.33056'/%3E%3Cpath opacity='0.2' d='M216.336 610.098C113.117 610.098 29.4393 526.303 29.4393 422.935C29.4393 319.568 113.117 235.773 216.336 235.773C319.555 235.773 403.233 319.568 403.233 422.935C403.233 526.303 319.555 610.098 216.336 610.098Z' stroke='white' stroke-width='1.33056'/%3E%3Cpath opacity='0.2' d='M230.679 616.727C117.71 616.727 26.1292 525.018 26.1292 411.887C26.1292 298.756 117.71 207.047 230.679 207.047C343.648 207.047 435.228 298.756 435.228 411.887C435.228 525.018 343.648 616.727 230.679 616.727Z' stroke='white' stroke-width='1.33056'/%3E%3Cpath opacity='0.2' d='M251.642 621.147C130.143 621.147 31.6463 522.512 31.6463 400.839C31.6463 279.165 130.143 180.53 251.642 180.531C373.142 180.531 471.638 279.165 471.638 400.839C471.638 522.512 373.142 621.147 251.642 621.147Z' stroke='white' stroke-width='1.33056'/%3E%3Cpath opacity='0.2' d='M272.053 625.566C142.328 625.566 37.1626 520.254 37.1626 390.342C37.1626 260.431 142.328 155.118 272.053 155.118C401.779 155.118 506.944 260.431 506.944 390.342C506.944 520.254 401.779 625.566 272.053 625.566Z' stroke='white' stroke-width='1.33056'/%3E%3Cpath opacity='0.2' d='M295.222 631.091C152.701 631.091 37.1626 515.39 37.1626 372.665C37.1626 229.939 152.701 114.239 295.222 114.239C437.744 114.239 553.282 229.939 553.282 372.665C553.282 515.39 437.744 631.091 295.222 631.091Z' stroke='white' stroke-width='1.33056'/%3E%3C/g%3E%3C/svg%3E%0A");
      background-position: left bottom;
    }

    &::after {
      top: 0;
      right: 0;
      width: 360px;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='361' height='480' viewBox='0 0 361 480' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.2'%3E%3Cmask id='mask0_90_620' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='361' height='480'%3E%3Cpath d='M0.665278 0.681391H328.333C345.602 0.681391 359.601 14.6806 359.601 31.9494V479.054H66.5278C30.1529 479.054 0.665278 449.566 0.665278 413.191V0.681391Z' fill='url(%23paint0_linear_90_620)' stroke='white' stroke-width='1.33056'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_90_620)'%3E%3Ccircle cx='326.171' cy='243.36' r='125.296' stroke='white' stroke-width='1.33056'/%3E%3Ccircle cx='316.227' cy='230.101' r='140.213' stroke='white' stroke-width='1.33056'/%3E%3Ccircle cx='307.94' cy='219.328' r='153.472' stroke='white' stroke-width='1.33056'/%3E%3Ccircle cx='299.653' cy='203.582' r='165.073' stroke='white' stroke-width='1.33056'/%3E%3Ccircle cx='291.78' cy='188.252' r='176.261' stroke='white' stroke-width='1.33056'/%3E%3Ccircle cx='278.521' cy='170.849' r='193.663' stroke='white' stroke-width='1.33056'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_90_620' x1='255.515' y1='13.4747' x2='7.14004' y2='483.492' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23747DEF'/%3E%3Cstop offset='1' stop-color='%235E3BE1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
      background-position: right bottom;
    }
  }

  &__inner-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1437px;
    width: 100%;
    margin: 0 auto;
    z-index: 1;
  }

  &__title {
    font-size: 8.4rem;
    max-width: 835px;
    width: 100%;
  }

  &__button {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    position: relative;
    padding: 0 55px;
    background: var(--white-color);
    border-radius: 18px;
    transition: 0.3s background-color ease-in-out, 0.3s color ease-in-out;

    &:hover {
      color: var(--white-color);
      background-color: #1d1f20;
    }
  }

  &__button span {
    font-size: 2rem;
    font-weight: 500;
    color: #224efe;
    line-height: 320%;
  }

  &__icon-gmail {
    width: 34px;
    height: 25px;
    background-image: url('../assets/images/gmail.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

@media screen and (max-width: 1440px) {
  .sign-up {
    padding-top: 150px;

    &__wrap {
      padding: 73px 53px;
    }

    &__button {
      max-width: 295px;
      width: 100%;
      padding: 0 50px 0 32px;
    }

    &__title {
      max-width: 507px;
    }
  }
}

@media screen and (max-width: 991px) {
  .sign-up {
    padding-top: 70px;

    &__wrap {
      padding: 54px 24px;
    }

    &__inner-wrap {
      flex-direction: column;
      gap: 36px;
    }

    &__title {
      font-size: 4.2rem;
      text-align: center;
      max-width: none;
    }

    &__button {
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 560px) {
  .sign-up {
    padding-top: 50px;

    &__wrap {
      padding: 40px 15px 60px 17px;

      &::before {
        width: 100%;
      }

      &::after {
        content: none;
      }
    }

    &__button {
      padding: 0 15px;

      & span {
        font-size: 1.8rem;
      }
    }

    &__inner-wrap {
      gap: 40px;
    }
  }
}
</style>
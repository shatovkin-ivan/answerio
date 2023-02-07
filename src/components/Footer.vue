<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__rights">
        <p class="footer__rights-text">All Rights Reserved © 2023</p>
        <div class="footer__rights-line"></div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped lang="scss">
.footer {
  padding: 110px 0 46px 0;

  &__rights {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    opacity: 0.4;

    &-text {
      max-width: 246px;
      width: 100%;
      font-size: 2rem;
      font-weight: 500;
      line-height: 240%;
      color: #a0a1a6;
      position: relative;
    }

    &-line {
      height: 2px;
      width: 100%;
      background: #ffffff;
    }
  }
}

@media screen and (max-width: 1440px) {
  .footer {
    padding: 150px 0 42px 0;
  }
}

@media screen and (max-width: 991px) {
  .footer {
    padding: 70px 0 14px 0;

    &__rights-text {
      font-size: 1.6rem;
      max-width: 197px;
    }

    &__rights-line {
      opacity: 0.1;
    }
  }
}

@media screen and (max-width: 560px) {
  .footer {
    padding: 50px 0 8px 0;

    &__rights {
      justify-content: center;

      &-line {
        display: none;
      }
    }
  }
}
</style>

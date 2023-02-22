<template>
  <div class="card-bottom">
    <span class="card-bottom__tag">
      {{ item.category }}
    </span>
    <div class="card-bottom__social">
      <ShareButton 
        :url="item.url"
      />
    </div>
  </div>
</template>

<script>
import ShareButton from '@/components/ui/ShareButton.vue'

export default {
  components: {
    ShareButton
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 16px 16px;
  padding: 27px 24px;
  background-color: #292a2c;

  &__tag {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(94, 96, 99, 0.6);
    border-radius: 68px;
    padding: 5px 18px;
    min-height: 32px;
    font-size: 1.4rem;
    font-style: italic;
    color: #5e6063;
    text-align: center;
  }

  &__social {
    position: relative;
    margin-left: auto;
  }

  &__links {
    position: absolute;
    top: -65px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 21px;
    border-radius: 10px;
    padding: 13px 18px;
    max-height: 50px;
    background-color: rgba(196, 196, 196, 0.4);
    backdrop-filter: blur(2px);
  }

  &__link {
    & :is(a) {
      display: block;
    }

    & :is(svg) {
      display: block;
      width: 25px;
      height: 25px;
      fill: #fff;
      opacity: 0.6;
      transition: 0.3s opacity ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .card-bottom {
    padding: 11px 15px;

    &__tag {
      max-width: 130px;
      font-size: 1.2rem;
      text-align: center;
    }
  }
}
</style>

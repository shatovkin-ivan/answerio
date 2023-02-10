<template>
  <div @click.self="clickOnModal" class="overlay" v-if="visible">
    <div class="answer-modal">
      <div class="answer-modal__head">
        <p class="answer-modal__title">
          {{ item.question }}
        </p>
        <p class="answer-modal__text">
          {{ item.answer }}
        </p>
      </div>
      <AnswerCardFooter :item="item" />
      <button @click.self="clickOnModal" type="button" class="answer-modal__close"></button>
    </div>
  </div>
</template>

<script>
import AnswerCardFooter from '@/components/answers/AnswerCardFooter.vue'

export default {
  components: {
    AnswerCardFooter,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const clickOnModal = () => {
      emit('hideModalOverlay', props.visible)
    }
    return {
      clickOnModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(18, 20, 22, 0.8);
  z-index: 1000;
}

.answer-modal {
  position: relative;
  border: 2px solid #5e6063;
  border-radius: 16px;
  max-width: 670px;
  width: 100%;
  &__head {
    border-radius: 16px 16px 0 0;
    padding: 49px 36px 40px 36px;
    background-color: #d9d9d9;
  }

  &__title {
    margin-bottom: 27px;
    color: var(--theme-color-1);
  }

  &__text {
    position: relative;
    padding-left: 20px;
    line-height: 1.25;
    color: #5e6063;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 2px;
      display: block;
      width: 2px;
      height: 100%;
      background-color: #5e6063;
    }
  }

  &__close {
    position: absolute;
    top: -43px;
    right: 3px;
    display: block;
    width: 30px;
    height: 30px;
    background-color: transparent;
    transition: 0.3s opacity ease-in-out;

    &:hover {
      opacity: 0.6;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 40px;
      height: 2.5px;
      background-color: var(--theme-color-1);
      transition: 0.3s;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>

<template>
  <button @click="toggleModal(index)" class="card__button">
    <svg>
      <use xlink:href="@/assets/images/sprites.svg#plus"></use>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    index: Number,
  },
  setup(props, { emit }) {
    const toggleModal = (i) => {
      emit('BtnToggleModal', { index: i })
    }
    return {
      toggleModal,
    }
  },
}
</script>

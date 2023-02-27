<template>
  <li class="card" :key="index">
    <div class="card__top">
      <div class="card__head">
        <p class="card__subtitle">
          {{ item.question }}
        </p>
      </div>
      <div ref="wrap" class="card__wrapper">
        <p ref="text" class="card__content">
          {{ item.answer }}
        </p>
        
      </div>
      <button class="show-more" 
        v-text="isOpen ? 'hide' : 'read more'"
        @click="isOpen ? hideText() : showMore()"
      ></button>
      <a 
        @click="changePage(item.url)"
        v-show="isOpen" 
        :href="cardURL" 
        class="full-answer" >
        read full answer
      </a>
    </div>
    <AnswerCardFooter :item="item" />
  </li>
</template>

<script>
import AnswerCardFooter from '@/components/answers/AnswerCardFooter.vue'

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    AnswerCardFooter,
  },
  props: {
    item: Object,
    index: Number,
  },
  setup(props) {
    const showModal = ref(false)
    const text = ref(null)
    const wrap = ref(null)
    const height = 60
    const isOpen = ref(false)

    const router = useRouter()

    const cardURL = computed(() => {
      return window.location.origin + (process.env.NODE_ENV === 'production' ? '/' : '/#/') + props.item.url
    })

    function toggleModal() {
      showModal.value = !showModal.value
    }
    function closeModal(visibility) {
      showModal.value = !visibility
    }
    function hideText() {
      if (isOpen.value) isOpen.value = false
      wrap.value.style.maxHeight = height + 'px'
    }
    function showMore() {
      isOpen.value = true
      wrap.value.style.maxHeight = height * 2 + 'px'
    }
    function changePage(url) {
      router.push({
				name: 'home',
				params: {
          url
				}
			})
      window.scrollTo(0, 100)
    }
    onMounted(() => {
      hideText()
    })

    return {
      toggleModal,
      showModal,
      text,
      wrap,
      isOpen,
      closeModal,
      showMore,
      hideText,
      changePage,
      cardURL
    }
  },
}
</script>

<style scoped lang="scss">
.card {
  &.open :is(.card__content) {
    max-height: none;
    background: none;
    -webkit-background-clip: border-box;
    -webkit-text-fill-color: currentcolor;
  }

  &::marker {
    content: none;
  }

  &__top {
    border-radius: 16px 16px 0 0;
    padding: 16px 25px 37px 35px;
    background-color: #1d1f20;
  }

  &__head {
    display: flex;
  }

  &__subtitle {
    margin-right: 20px;
    margin-bottom: 26px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    margin-left: auto;
    max-width: 28px;
    width: 100%;
    height: 28px;
    background-color: var(--theme-color-1);
    transition: 0.3s opacity ease-in-out;

    &:hover {
      opacity: 0.6;
    }

    & :is(svg) {
      width: 11px;
      height: 11px;
      fill: var(--white-color);
    }
  }
  &__wrapper {
    margin-bottom: 15px;
    overflow: hidden;
  }
  &__content {
    position: relative;
    padding-left: 15px;
    background: linear-gradient(180deg, #a0a1a6 22.03%, rgba(160, 161, 166, 0) 157.63%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    transition: 0.3s max-height ease-in-out;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      border-radius: 2px;
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, #a0a1a6 22.03%, rgba(160, 161, 166, 0) 157.63%);
      opacity: 0.5;
    }
  }
}

.show-more, .full-answer {
  display: inline-block;
  padding: 3px 15px;
  color: var(--theme-color-1);
  font-size: 1.8rem;
  background-color: transparent;
  text-transform: uppercase;
}

@media screen and (max-width: 560px) {
  .card {
    &__top {
      padding: 16px 15px 15px 16px;
    }

    &__subtitle {
      margin-bottom: 15px;
    }
  }
}
</style>

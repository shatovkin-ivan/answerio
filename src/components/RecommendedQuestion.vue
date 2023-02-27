<template>
  <li class="recommended-question">
    <p class="recommended-question__title">{{ question }}</p>
    <p :class="answer.length > 150 && !isVisible ? 'hidden' : ''" class="recommended-question__answer">
      {{ answer }}
    </p>
    <button
      type="button"
      @click="toggleContent"
      v-text="isVisible ? 'Hide' : 'Read more'"
      v-if="answer.length > 150"
      class="recommended-question__show"
    ></button>
    <a 
      @click="changePage(url)"
      v-show="isOpen" 
      :href="cardURL" 
      class="recommended-question__link"
      >
      Read full answer
    </a>
  </li>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isVisible = ref(false)
    const isOpen = ref(false)

    const router = useRouter()

    const cardURL = computed(() => {
      return window.location.origin + (process.env.NODE_ENV === 'production' ? '/' : '/#/') + props.url
    })

    function toggleContent() {
      isVisible.value = !isVisible.value
      isOpen.value = !isOpen.value
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
    return {
      isVisible,
      isOpen,
      cardURL,
      toggleContent,
      changePage
    }
  },
}
</script>

<style lang="scss" scoped>
.recommended-question {
  min-width: 33%;
  max-width: 600px;
  height: 100%;
  display: block;
  background-color: #1d1f20;
  border-radius: 16px;
  padding: 16px 24px;
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -21px;
    left: 24px;
    width: 0;
    height: 0;
    border-top: 21px solid #1d1f20;
    border-right: 21px solid transparent;
  }
  &__title {
    margin-bottom: 20px;
  }

  &__answer {
    max-height: 240px;
    padding-left: 24px;
    line-height: 1.25;
    border-left: 2px solid #a0a1a6;
    border-radius: 2px;
    color: #a0a1a6;
    overflow: hidden;
    &.hidden {
      max-height: 120px;
      background: linear-gradient(180deg, #a0a1a6 0%, rgba(160, 161, 166, 0) 102.78%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  &__show {
    background-color: transparent;
  }
  &__show, &__link {
    display: inline-block;
    margin-top: 20px;
    padding: 3px 15px;
    margin-left: auto;
    color: var(--theme-color-1);
  }
}
@media screen and (max-width: 1440px) {
  .recommended-question {
    min-width: 45%;
  }
}
@media screen and (max-width: 991px) {
  .recommended-question {
    min-width: 50%;
  }
}
@media screen and (max-width: 560px) {
  .recommended-question {
    min-width: 75%;
    &::after {
      bottom: -14px;
      border-top: 14px solid #1d1f20;
      border-right: 14px solid transparent;
    }
    &__answer {
      padding-left: 16px;
    }
  }
}
</style>

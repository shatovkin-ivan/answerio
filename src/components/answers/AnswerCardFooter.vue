<template>
  <div class="card-bottom">
    <span class="card-bottom__tag">
      {{ item.category }}
    </span>
    <div class="card-bottom__social">
      <div class="card-bottom__share" @click="copyPageLink">
        Share
        <div class="card-bottom__icon">
          <svg>
            <use xlink:href="@/assets/images/sprites.svg#share"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <MessageModal @hideMessage="hideMessage" :showMessage="showMessage" :messageText="messageText"> </MessageModal>
  </Teleport>
</template>

<script>
import MessageModal from '../ui/MessageModal.vue'
import { ref, computed } from 'vue'

export default {
  components: {
    MessageModal
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const showMessage = ref(false)
    const messageText = 'link successfully copied'
    const cardURL = computed(() => {
      return window.location.origin + (process.env.NODE_ENV === 'production' ? '/' : '/#/') + props.item.url
    })
    function hideMessage() {
      showMessage.value = false
    }
    function copyPageLink() {
      navigator.clipboard
        .writeText(cardURL.value)
        .then(() => {
          showMessage.value = true
        })
        .catch((e) => {
          console.error(e)
        })
    }

    return {
      copyPageLink,
      showMessage,
      messageText,
      hideMessage,
    }
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

  &__share {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    background-color: transparent;
    cursor: pointer;
    user-select: none;

    & :is(svg) {
      width: 18px;
      height: 18px;
      fill: var(--white-color);
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 12px;
    width: 38px;
    height: 38px;
    background-color: #404245;
  }

  &__social {
    position: relative;
    margin-left: auto;
    width: 100%;
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

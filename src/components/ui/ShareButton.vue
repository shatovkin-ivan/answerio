<template>
    <button type="button" class="share" @click="copyPageLink">
        Share
        <div class="share__icon">
            <svg>
                <use xlink:href="@/assets/images/sprites.svg#share"></use>
            </svg>
        </div>
    </button>
</template>

<script>

import { computed } from 'vue'
import store from '@/store'

export default {
    props: {
        url: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const messageText = 'link successfully copied'
        const cardURL = computed(() => {
            return window.location.origin + (process.env.NODE_ENV === 'production' ? '/' : '/#/') + props.url
        })
        function copyPageLink() {
            navigator.clipboard
                .writeText(cardURL.value)
                .then(() => {
                    store.dispatch('openModal', messageText)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
        return {
            copyPageLink,
        }
    },
}

</script>

<style lang="scss" scoped>
.share {
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
}
</style>
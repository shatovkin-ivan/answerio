<template>
    <div @click.self="closeModal" class="overlay" v-if="getIsVisibility">
        <div class="message-modal">
            <p class="message-modal__text">
                {{ getModalMessage }}
            </p>
            <slot></slot>
            <button @click.self="closeModal" type="button" class="message-modal__close">
            </button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

import store from '@/store'
import { computed } from 'vue'

export default {
    setup() {
        const router = useRouter()

        const getIsVisibility = computed(() => {
            return store.getters.getModalVisibility
        })
        const getModalMessage = computed(() => {
            return store.getters.getModalMessage
        })
        const isError = computed(() => {
			return store.getters.getPageInfo
		})
        function closeModal() {
            store.dispatch('closeModal')
            if (isError.value) {
                router.push('/')
            }
        }
        return {
            getIsVisibility,
            getModalMessage,
            closeModal
        }
    }
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

.message-modal {
    position: relative;
    border: 2px solid #5e6063;
    border-radius: 16px;
    padding: 49px 36px 40px 36px;
    background-color: #d9d9d9;

    &__text {
        position: relative;
        padding-left: 20px;
        line-height: 1.25;
        color: #5e6063;

        &:not(:last-child) {
            margin-bottom: 25px;
        }

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

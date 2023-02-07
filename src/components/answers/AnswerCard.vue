<template>
    <li class="card" :key="index">
        <div class="card__top">
            <div class="card__head">
                <p class="card__subtitle">
                    {{ item.question }}
                </p>
                <ToggleButton :index="index" @BtnToggleModal="toggleModal" />
            </div>

            <div class="card__content">
                {{ item.answer }}
            </div>
        </div>
        <AnswerCardFooter :item="item" />
    </li>
    <Teleport to="body">
        <DetailAnswer :item="item" :visible="showModal" @hideModalOverlay="closeModal" />
    </Teleport>
</template>

<script>

import ToggleButton from '@/components/answers/ToggleButton.vue';
import AnswerCardFooter from '@/components/answers/AnswerCardFooter.vue';
import DetailAnswer from '@/components/answers/DetailAnswer.vue';

import { ref } from 'vue';

export default {
    components: {
        ToggleButton,
        AnswerCardFooter,
        DetailAnswer
    },
    props: {
        item: Object,
        index: Number,
    },
    setup() {
        let showModal = ref(false)
        function toggleModal() {
            showModal.value = !showModal.value
        }
        function closeModal(visibility) {
            showModal.value = !visibility
        }
        return {
            toggleModal,
            showModal,
            closeModal
        }
    }
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
        background-color: #1D1F20;
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
        transition: .3s opacity ease-in-out;

        &:hover {
            opacity: .6;
        }

        & :is(svg) {
            width: 11px;
            height: 11px;
            fill: var(--white-color);
        }
    }

    &__content {
        position: relative;
        padding-left: 15px;
        max-height: 60px;
        overflow: hidden;
        background: linear-gradient(180deg, #A0A1A6 22.03%, rgba(160, 161, 166, 0) 157.63%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        transition: .3s max-height ease-in-out;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            border-radius: 2px;
            width: 1px;
            height: 100%;
            background: linear-gradient(180deg, #A0A1A6 22.03%, rgba(160, 161, 166, 0) 157.63%);
            opacity: .5;
        }
    }
}

@media screen and (max-width: 560px) {
    .card {
        &__top {
            padding: 16px 15px 15px 16px;
        }

        &__subtitle {
            margin-bottom: 15px;
        }

        &__content {
            max-height: 76px;
        }
    }
}
</style>
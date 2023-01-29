<template>
    <li class="category">
        <button 
            type="button"
            class="category__button"
            :data-id="dataId"
            :class="choosenBtn ? 'choosen' : ''"
            @click="setChoosen(), sendChange($event)"
        >
            {{ text }}

            <svg class="category__icon" v-if="dataId === 0">
                <use xlink:href="@/assets/images/sprites.svg#top"></use>
            </svg>
        </button>
    </li>
</template>

<script>

import { onMounted, ref } from 'vue';

    export default {
        props: {
            text: {
                type: String,
                required: true
            },
            dataId: {
                type: Number,
                required: true
            },
            choosen: {
                type: Boolean,
                required: true
            },
            currentCategory: {
                type: Number,
                default: null,
                required: true
            }
        },
        setup(props, { emit }) {
            let choosenBtn = ref(props.choosen)
            onMounted(() => {
                if (props.dataId === 0) {
                    setChoosen()
                }
            })
            function setChoosen() {
                choosenBtn.value = true
            }
            const sendChange = (e) => {
                emit('getCategoryId', e.target)
            }
            return {
                choosenBtn,
                setChoosen,
                sendChange
            }
        }
    }
</script>

<style lang="scss" scoped>
    .category {
        &__button {
            display: flex;
            align-items: center;
            border: 2px solid var(--theme-color-1);
            border-radius: 68px;
            padding: 0 30px;
            font-size: 2rem;
            line-height: 2.7;
            color: var(--theme-color-1);
            text-align: center;
            cursor: pointer;
            background-color: transparent;
            transition: .3s background-color ease-in-out, .3s color ease-in-out;
            & :is(svg) {
                margin-left: 10px;
                width: 21px;
                height: 25px;
                fill: var(--theme-color-1);
                transition: .3s fill ease-in-out;
            }
            &:hover, &.choosen {
                background-color: var(--theme-color-1);
                color: var(--white-color);
                & :is(svg) {
                    fill: var(--white-color);
                }
            }
            &.choosen {
                pointer-events: none;
            }
        }
    }
</style>
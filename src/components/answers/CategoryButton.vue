<template>
    <li class="category">
        <button 
            type="button"
            class="category__button"
            :data-id="dataId"
            :class="isChoosen ? 'choosen' : ''"
            @click="sendChange($event)"
        >
            {{ text }}

            <svg class="category__icon" v-if="dataId === 0">
                <use xlink:href="@/assets/images/sprites.svg#top"></use>
            </svg>
        </button>
    </li>
</template>

<script>

// import { ref } from 'vue';

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
            isChoosen: {
                type: Boolean,
                required: true
            },
        },
        setup(props, { emit }) {
            const sendChange = (e) => {
                emit('getCategoryId', e.currentTarget)
            }
            return {
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
            font-style: italic;
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
    @media screen and (max-width: 1440px) {
        .category {
            &__button {
                line-height: 2.5;
            }
        }
    }
    @media screen and (max-width: 991px) {
        .category {
            &__button {
                padding: 0 15px;
                font-size: 1.4rem;
                line-height: 3.86;
            }
        }
    }
    @media screen and (max-width: 560px) {
        .category {
            &__button {
                border: none;
                padding: 0;
                line-height: 1.9;
                color: #5E6063;
                background-color: transparent;
                &.choosen, &:hover {
                    background-color: transparent;
                    color: var(--theme-color-1);
                }
            }
            &__icon {
                display: none;
            }
        }
    }
</style>
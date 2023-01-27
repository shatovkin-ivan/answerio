<template>
    <li 
        class="card" 
        :key="index"
    >
        <div class="card__top">
            <div class="card__head">
                <p class="card__subtitle">
                    {{ item.question }}
                </p>
                <ToggleButton 
                    :index="index"
                />
            </div> 
            
            <div class="card__content">
                {{ item.answer }}
            </div>
        </div>
        <div class="card__bottom">
            <span class="card__tag">
                {{ item.category }}
            </span>
            <div class="card__social">
                <div class="card__share" @click="visible=!visible">
                    Share
                    <div class="card__icon">
                        <svg>
                            <use xlink:href="@/assets/images/sprites.svg#share"></use>
                        </svg>
                    </div>
                </div>
                <ul class="card__links" v-show="visible">
                    <li class="card__link">
                        <a href="">
                            <svg>
                                <use xlink:href="@/assets/images/sprites.svg#facebook"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="card__link">
                        <a href="">
                            <svg>
                                <use xlink:href="@/assets/images/sprites.svg#telegram"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="card__link">
                        <a href="">
                            <svg>
                                <use xlink:href="@/assets/images/sprites.svg#instagram"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="card__link">
                        <a href="">
                            <svg>
                                <use xlink:href="@/assets/images/sprites.svg#twitter"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script>

import ToggleButton from '@/components/answers/ToggleButton.vue'

export default {
    components: {
        ToggleButton,
    },
    data() {
        return {
            visible: false,
        }
    },
    props: {
        item: Object,
        index: Number,
        // items: Array,
    },
    // methods: {
    //     toggleContent(i) {
    //         this.items[i.index].isOpen ? this.items[i.index].isOpen = false : this.items[i.index].isOpen = true
    //     }
    // }
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
        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 0 0 16px 16px;
            padding: 27px 24px;
            background-color: #292A2C;
        }
        &__tag {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(94, 96, 99, 0.6);
            border-radius: 68px;
            padding: 0 18px;
            height: 32px;
            font-size: 1.4rem;
            font-style: italic;
            color: #5E6063;
        }
        &__share {
            display: flex;
            align-items: center;
            font-style: italic;
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
                opacity: .6;
                transition: .3s opacity ease-in-out;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
</style>
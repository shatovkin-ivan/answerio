<template>
    <li 
        class="card" 
        :key="index"
        :class="{ 'open' : item.isOpen }"
    >
        <div class="card__top">
            <div class="card__head">
                <p class="card__subtitle">
                    {{ item.title }}
                </p>
                <ToggleButton 
                    :index="index"
                    @BtnToggleContent="toggleContent"
                />
            </div> 
            
            <div class="card__content">
                {{ item.text }}
            </div>
        </div>
        <div class="card__bottom">
            <span class="card__tag">
                {{ item.category }}
            </span>
            <div class="card__social">
                <button class="card__share">
                    Share
                    <div class="card__icon">
                        <svg>
                            <use xlink:href="@/assets/images/sprites.svg#share"></use>
                        </svg>
                    </div>
                </button>
                <ul class="card__links">
                    <li class="card__link">
                        <a href=""></a>
                    </li>
                    <li class="card__link">
                        <a href=""></a>
                    </li>
                    <li class="card__link">
                        <a href=""></a>
                    </li>
                    <li class="card__link">
                        <a href=""></a>
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
    props: {
        item: Object,
        index: Number,
        items: Array,
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
    }
</style>
<template>
    <section class="answers">
        <div class="answers__bg">
            <picture>
                <source srcset="@/assets/images/answers-bg.avif" type="image/avif">
                <source srcset="@/assets/images/answers-bg.webp" type="image/webp">
                <source srcset="@/assets/images/answers-bg.png" type="image/png">
                <img src="@/assets/images/answers-bg.png" alt="">
            </picture>
        </div>
        <div class="container">
            <h1 class="h1-title answers__title">
                Finds Answerio
            </h1>
            <p class="answers__description">
                Select one or more topics of interest
            </p>
            <ul class="answers__categories categories">
                <li 
                    v-for="(answer, index) in answerCategories" 
                    :key="index" 
                    class="categories__item"
                    :data-id="Object.values(answer)"
                    :class="index === 0 ? 'choosen' : ''"
                >
                    {{ getStringValue(answer) }}
                </li>
            </ul>
            <masonry-wall :items="topAnswers" :ssr-columns="1" :column-width="550" :gap="40">
                <template #default="{ item, index }">
                    <AnswerCard
                        :items="topAnswers"
                        :item="item"
                        :index="index"
                    />
                </template>
            </masonry-wall>
            
            <div class="answers__pagination">
                More 100 elements
                <button class="answers__show-more">
                    Show all
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import MasonryWall from '@yeger/vue-masonry-wall'

import { defineComponent } from 'vue'
import AnswerCard from '@/components/answers/AnswerCard.vue'


export default defineComponent({
    components: {
        AnswerCard,
        MasonryWall
    },
    data() {
        return {
            answerCategories: [
                // {'Other' : 0},
                // категории other на данный момент нет
                {'Top': null},
                {'Technology': 1},
                {'Science': 2},
                {'Business': 3},
                {'Health And Fitness': 4},
                {'Education': 5},
                {'Travel': 6},
                {'FoodAndDrinks': 7},
                {'Politics And Government': 8},
                {'Lifestyle And Beauty': 9},
                {'Entertainment And Music': 10},
                {'Sports': 11},
                {'Religion And Spirituality': 12},
                {'Philosophy And Psychology': 13},
                {'Culture History And Languages': 14},
                {'Relationships': 15},
                {'Finance And Investing': 16},
                {'Automobiles And Transportation': 17},
                {'Careers And Workplace': 18},
                {'Arts And Humanities': 19}
            ],
            topAnswers: [],
            choosenClass: 'choosen'
        }
    },
    mounted() {
        this.getTopQuestion('https://answerio-dev-apim.azure-api.net/answerio-dev-api//Question/TopByCategory?PageSize=9')
    },
    methods: {
        getStringValue(item) {
            return Object.keys(item).join(' ')
        },
        async getTopQuestion (url) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '08733ebda0994b709a90755651769b26',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                console.log(data);
                this.topAnswers = await data.items
            } catch(e) {
                console.log('error');
            }
        }
    },
})
</script>

<style scoped lang="scss">
    .answers {
        position: relative;
        padding: 220px 0 64px 0;
        &__bg {
            position: absolute;
            bottom: -50%;
            left: 0;
            width: 100vw;
            height: auto;
            z-index: -1;
            & :is(img) {
                display: block;
                width: 100%;
                height: auto;
            }
        }
        &__title {
            margin-bottom: 30px;
        }
        &__description {
            margin-bottom: 55px;
            line-height: 2;
            color: #A0A1A6;
        }
        &__categories {
            margin-bottom: 73px;
        }
        &__cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            margin-bottom: 77px;
        }
        &__pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #A0A1A6;
        }
        &__show-more {
            margin-left: 18px;
            background-color: transparent;
            color: var(--theme-color-1);
        }
    }
    .categories {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        max-width: 1570px;
        width: 100%;
        &__item {
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
            &:hover, &.choosen {
                background-color: var(--theme-color-1);
                color: var(--white-color);
            }
            &.choosen {
                pointer-events: none;
            }
        }
    }
</style>
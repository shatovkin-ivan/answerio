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
                <CategoryButton 
                    v-for="(answer, index) in answerCategories" 
                    :key="index" 
                    :dataId="+Object.values(answer)"
                    :text="getStringValue(answer)"
                    :choosen="choosen"
                    :currentCategory="currentCategory"
                    @getCategoryId="setCategoryId"
                />
            </ul>
            <masonry-wall :items="topAnswers" :ssr-columns="1" :column-width="550" :gap="40">
                <template #default="{ item, index }">
                    <AnswerCard
                        :item="item"
                        :index="index"
                    />
                </template>
            </masonry-wall>
            
            <div class="answers__pagination">
                More 100 elements
                <button 
                    @click="showMore(`https://answerio-dev-apim.azure-api.net/answerio-dev-api/Question/TopByCategory?PageSize=9&${continuationToken}`)"
                    class="answers__show-more"
                >
                    Show all
                </button>
            </div>
        </div>
    </section>
</template>

<script>

import MasonryWall from '@yeger/vue-masonry-wall'
import { defineComponent, ref, onMounted } from 'vue'
import AnswerCard from '@/components/answers/AnswerCard.vue'
import CategoryButton from '@/components/answers/CategoryButton.vue'

export default defineComponent({
    components: {
        AnswerCard,
        MasonryWall,
        CategoryButton
    },
    setup() {
        let choosen = ref(false)
        let currentCategory = ref(null)
        const answerCategories = [
            // {'Other' : 0},
            // категории other на данный момент нет
            {'Top': null},
            {'Technology': 1},
            {'Science': 2},
            {'Business': 3},
            {'Health And Fitness': 4},
            {'Education': 5},
            {'Travel': 6},
            {'Food And Drinks': 7},
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
        ]
        const topAnswers = ref([])
        const continuationToken = ref('')
        async function getQuestions(url) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '08733ebda0994b709a90755651769b26',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                console.log(data);
                topAnswers.value = await data.items
                continuationToken.value = await data.continuationToken.slice(1, data.continuationToken.length - 1)
            } catch(e) {
                console.log('error');
            }
        }
        async function showMore(url) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '08733ebda0994b709a90755651769b26',
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json()
                console.log(data);
                topAnswers.value = await data.items
            } catch(e) {
                console.log('error');
            }
        }
        function setCategoryId(event) {
            currentCategory.value = event.dataset.id
            topAnswers.value = []
            getQuestions(`https://answerio-dev-apim.azure-api.net/answerio-dev-api/Question/TopByCategory?CategoryId=${currentCategory.value}&PageSize=9`)
        }
        function getStringValue(item) {
            return Object.keys(item).join(' ')
        }
        function clearCategories() {
            choosen.value = false
        }
        onMounted(() => {
            getQuestions('https://answerio-dev-apim.azure-api.net/answerio-dev-api/Question/TopByCategory?PageSize=9')
        })
        return {
            choosen,
            answerCategories,
            continuationToken,
            topAnswers,
            currentCategory,
            getStringValue,
            clearCategories,
            showMore,
            setCategoryId
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
            margin-top: 77px;
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
    }
</style>
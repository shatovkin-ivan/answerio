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
                    :class="index === 0 ? 'choosen' : ''"
                >
                    {{ answer }}
                </li>
            </ul>
            <ul class="answers__cards">
                <AnswerCard />
            </ul>
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

import AnswerCard from '@/components/answers/AnswerCard.vue'


export default {
    components: {
        AnswerCard
    },
    data() {
        return {
            answerCategories: [
                'Top',
                'Technology',
                'Science',
                'Business',
                'Health & Fitness',
                'Education',
                'Travel',
                'Food & Drinks',
                'Sports',
                'Politics & Government',
                'Entertainment & Music',
                'Religion & Spirituality',
                'Finance & Investing',
                'Automobiles & Transportation',
                'Careers & Workplace',
                'Arts and Humanities',
                'Lifestyle & Beauty',
            ],
            choosenClass: 'choosen'
        }
    }
}
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

		@media screen and (max-width: 1200px) {
			.answers {
				padding: 150px 0;

				&__categories {
					margin-bottom: 55px;
				}
			}
			
		}
</style>
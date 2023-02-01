<template>
  <section class="answers">
    <div class="answers__bg">
      <picture>
        <source srcset="@/assets/images/answers-bg.avif" type="image/avif" />
        <source srcset="@/assets/images/answers-bg.webp" type="image/webp" />
        <source srcset="@/assets/images/answers-bg.png" type="image/png" />
        <img src="@/assets/images/answers-bg.png" alt="" />
      </picture>
    </div>
    <div class="container">
      <h1 class="h1-title answers__title">Finds Answerio</h1>
      <p class="answers__description">Select one or more topics of interest</p>
      <div class="answers__drop drop-menu">
        <div
          :class="modalSelectIsOpen ? 'open' : ''"
          @click="modalSelectIsOpen = !modalSelectIsOpen"
          class="drop-menu__field"
        >
          <p class="drop-menu__text">
            {{ chosenCategoryName }}
          </p>
          <svg class="drop-menu__icon">
            <use xlink:href="@/assets/images/sprites.svg#arrow"></use>
          </svg>
        </div>
        <ul
          :class="modalSelectIsOpen ? 'open' : ''"
          class="answers__categories categories"
        >
          <CategoryButton
            v-for="(answer, index) in answerCategories"
            :key="index"
            :dataId="getCategoryIdValue(answer)"
            :text="getCategoryName(answer)"
            :isChoosen="answer.isChoosen"
            @getCategoryId="setCategoryId"
          />
        </ul>
      </div>

      <masonry-wall
        :items="topAnswers"
        :ssr-columns="1"
        :column-width="setCategoryMaxWidth()"
        :gap="40"
        :rtl="true"
      >
        <template #default="{ item, index }">
          <AnswerCard :item="item" :index="index" />
        </template>
      </masonry-wall>

      <div class="answers__pagination" v-if="continuationToken">
        More 100 elements
        <button
          @click="showMore(`http://localhost:7071/api/Question/TopByCategory`)"
          class="answers__show-more"
        >
          Show all
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import MasonryWall from "@yeger/vue-masonry-wall";
import { defineComponent, ref, onMounted } from "vue";
import AnswerCard from "@/components/answers/AnswerCard.vue";
import CategoryButton from "@/components/answers/CategoryButton.vue";
import { getTokenPopup } from "@/plugin/authPopup";
import { tokenRequest } from "@/plugin/authConfig";

export default defineComponent({
  components: {
    AnswerCard,
    MasonryWall,
    CategoryButton,
  },
  setup() {
    let currentCategory = ref(null);
    const answerCategories = ref([
      {
        Top: 0,
        isChoosen: false,
      },
      {
        Technology: 1,
        isChoosen: false,
      },
      {
        Science: 2,
        isChoosen: false,
      },
      {
        Business: 3,
        isChoosen: false,
      },
      {
        "Health And Fitness": 4,
        isChoosen: false,
      },
      {
        Education: 5,
        isChoosen: false,
      },
      {
        Travel: 6,
        isChoosen: false,
      },
      {
        "Food And Drinks": 7,
        isChoosen: false,
      },
      {
        "Politics And Government": 8,
        isChoosen: false,
      },
      {
        "Lifestyle And Beauty": 9,
        isChoosen: false,
      },
      {
        "Entertainment And Music": 10,
        isChoosen: false,
      },
      {
        Sports: 11,
        isChoosen: false,
      },
      {
        "Religion And Spirituality": 12,
        isChoosen: false,
      },
      {
        "Philosophy And Psychology": 13,
        isChoosen: false,
      },
      {
        "Culture History And Languages": 14,
        isChoosen: false,
      },
      {
        Relationships: 15,
        isChoosen: false,
      },
      {
        "Finance And Investing": 16,
        isChoosen: false,
      },
      {
        "Automobiles And Transportation": 17,
        isChoosen: false,
      },
      {
        "Careers And Workplace": 18,
        isChoosen: false,
      },
      {
        "Arts And Humanities": 19,
        isChoosen: false,
      },
    ]);
    const topAnswers = ref([]);
    const continuationToken = ref("");
    const modalSelectIsOpen = ref(false);
    const chosenCategoryName = ref("");
    async function getQuestions(url) {
      try {
        const tokenResponse = await getTokenPopup(tokenRequest);

        console.log(tokenResponse);

        const response = await fetch(url, {
          headers: {
            "Ocp-Apim-Subscription-Key": "08733ebda0994b709a90755651769b26",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        });
        const data = await response.json();
        topAnswers.value = await data.items;
        continuationToken.value = await data.continuationToken;
      } catch (e) {
        console.log(e);
      }
    }
    async function showMore(url) {
      try {
        const tokenResponse = await getTokenPopup(tokenRequest);

        console.log(tokenResponse);

        const response = await fetch(url, {
          headers: {
            "Ocp-Apim-Subscription-Key": "08733ebda0994b709a90755651769b26",
            "X-Continuation-Token": continuationToken.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        });
        const data = await response.json();
        topAnswers.value = await data.items;
        continuationToken.value = await data.continuationToken;
      } catch (e) {
        console.log(e);
      }
    }
    function setCategoryId(event) {
      clearChoosenCategory();
      answerCategories.value[event.dataset.id].isChoosen = true;
      currentCategory.value = event.dataset.id;
      topAnswers.value = [];
      modalSelectIsOpen.value = false;

      const choosenKeyValue = Object.keys(
        answerCategories.value[event.dataset.id]
      );

      chosenCategoryName.value = choosenKeyValue[0];

      if (currentCategory.value === "0") {
        getQuestions(
          `http://localhost:7071/api/Question/TopByCategory?PageSize=9`
        );
      } else {
        getQuestions(
          `http://localhost:7071/api/Question/TopByCategory?CategoryId=${currentCategory.value}&PageSize=9`
        );
      }
    }
    function clearChoosenCategory() {
      for (let i = 0; i < answerCategories.value.length; i++) {
        answerCategories.value[i].isChoosen = false;
      }
    }
    function getCategoryName(item) {
      const keys = Object.keys(item);
      return keys[0];
    }
    function getCategoryIdValue(item) {
      const keys = Object.keys(item);
      return +item[keys[0]];
    }

    function setFirstCategoryActive() {
      const firstCategoryKeys = Object.keys(answerCategories.value[0]);
      chosenCategoryName.value = firstCategoryKeys[0];
      answerCategories.value[0].isChoosen = true;
    }

    function setCategoryMaxWidth() {
      if (window.matchMedia("(max-width: 991px)").matches) {
        return 335;
      } else if (window.matchMedia("(max-width: 1440px)").matches) {
        return 480;
      } else {
        return 550;
      }
    }

    onMounted(() => {
      setFirstCategoryActive();
      getQuestions(
        "http://localhost:7071/api/Question/TopByCategory?PageSize=9"
      );
    });

    return {
      chosenCategoryName,
      modalSelectIsOpen,
      answerCategories,
      continuationToken,
      topAnswers,
      currentCategory,
      getCategoryName,
      showMore,
      setCategoryId,
      getCategoryIdValue,
      setCategoryMaxWidth,
    };
  },
});
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
    color: #a0a1a6;
  }
  &__drop {
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
    color: #a0a1a6;
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
.drop-menu {
  &__field {
    display: none;
  }
}
@media screen and (max-width: 1440px) {
  .answers {
    &__categories {
      margin-bottom: 55px;
    }
  }
}
@media screen and (max-width: 991px) {
  .answers {
    padding-top: 70px;
    &__title {
      margin-bottom: 20px;
    }
    &__drop {
      margin-bottom: 40px;
    }
    &__pagination {
      margin-top: 40px;
    }
  }
  .categories {
    gap: 20px 10px;
  }
}
@media screen and (max-width: 560px) {
  .drop-menu {
    position: relative;
    &__field {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 2px solid var(--theme-color-1);
      border-radius: 18px;
      padding: 16px;
      background-color: transparent;
      cursor: pointer;
      z-index: 2;
      &.open {
        background-color: #e2e2e2;
      }
    }
    &__text {
      font-size: 1.4rem;
      font-style: italic;
      color: var(--theme-color-1);
    }
    &__icon {
      width: 14px;
      height: 8px;
      fill: var(--theme-color-1);
    }
  }
  .categories {
    position: absolute;
    top: 20px;
    flex-direction: column;
    gap: 0;
    border: 2px solid var(--theme-color-1);
    border-radius: 18px;
    display: none;
    padding: 40px 16px 18px 16px;
    background-color: #e2e2e2;
    z-index: 1;
    &.open {
      display: flex;
    }
  }
}
</style>

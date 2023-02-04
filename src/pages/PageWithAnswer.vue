<template>
    <app-ask
        :answerProp="pageData.answer"
        :questionProp="pageData.question"
    />
    <RecommendedQuestions />
    <AnswersByCategory />
    <WhatWeDo />
    <SignUp 
      v-if="!isAuth"
    />
</template>

<script>

import AppAsk from '@/components/AppAsk.vue';
import AnswersByCategory from '@/components/answers/AnswersByCategory.vue';
import WhatWeDo from '@/components/WhatWeDo.vue';
import SignUp from '@/components/SignUp.vue';
import RecommendedQuestions from '@/components/RecommendedQuestions.vue';

import { ref, onBeforeMount, computed } from 'vue'
import store from '@/store'

export default {
    name: 'PageWithAnswer',
    components: {
        AppAsk,
        RecommendedQuestions,
        AnswersByCategory,
        WhatWeDo,
        SignUp
    },
    setup() {
        const apiKey = process.env.VUE_APP_API_KEY
        const apiUrl = process.env.VUE_APP_API_URL
        
        const pageData = ref({})
        const getIsAuth = computed(() => {
            return store.getters.getAuthenticated
        })

        const isAuth = ref(getIsAuth)

        onBeforeMount(() => {
            getPageByUrl(`${apiUrl}/Question/ByUrl/${getPageName()}`)
            store.dispatch('isAuthenticated')
        })
        function getPageName() {
            return window.location.pathname
                .split('/')
                .slice(-1)
                .join('')
        }
        async function getPageByUrl(url) {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Ocp-Apim-Subscription-Key": `${apiKey}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                pageData.value = await data
            } catch(e) {
                console.error(e);
            }
        }
        return {
            pageData,
            isAuth
        }
    }
}

</script>
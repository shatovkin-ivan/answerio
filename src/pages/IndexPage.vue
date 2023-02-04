<template>
    <app-ask/>
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

import { ref, onBeforeMount, computed } from 'vue'
import store from '@/store'

export default {
    name: 'IndexPage',
    components: {
        AppAsk,
        AnswersByCategory,
        WhatWeDo,
        SignUp
    },
    setup() {
        const getIsAuth = computed(() => {
            return store.getters.getAuthenticated
        })

        const isAuth = ref(getIsAuth)

        onBeforeMount(() => {
            store.dispatch('isAuthenticated')
        })
        return {
            isAuth
        }
    }
}

</script>
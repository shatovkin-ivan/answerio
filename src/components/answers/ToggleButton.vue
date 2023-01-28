<template>
    <button
        @click="toggleModal(index)"
        class="card__button"
    >
        <svg>
            <use xlink:href="@/assets/images/sprites.svg#plus"></use>
        </svg>
    </button>
</template>

<script>

export default {
    name: 'ToggleButton',
    props: {
        index: Number,
    },
    methods: {
        toggleModal(i) {
            this.$emit('BtnToggleModal', {
                index: i
            })
        }
    }
}

</script>
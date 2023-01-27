<template>
    <button
        @click="toggleText(index)"
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
    // methods: {
    //     toggleText(i) {
    //         this.$emit('BtnToggleContent', {
    //             index: i
    //         })
    //     }
    // }
}

</script>
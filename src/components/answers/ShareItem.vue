<template>
    <li class="card-bottom__link">
        <a :href="item.link" target="_blank" rel="noopener">
            <svg>
                <use :xlink:href="require('@/assets/images/sprites.svg') + '#' + item.iconId">
                </use>
            </svg>
        </a>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            reqiered: true
        }
    }
}
</script>
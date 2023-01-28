<template>
    <div class="card-bottom">
            <span class="card-bottom__tag">
                {{ item.category }}
            </span>
            <div class="card-bottom__social">
                <div class="card-bottom__share" @click="visible=!visible">
                    Share
                    <div class="card-bottom__icon">
                        <svg>
                            <use xlink:href="@/assets/images/sprites.svg#share"></use>
                        </svg>
                    </div>
                </div>
                <ul class="card-bottom__links" v-show="visible">
                    <ShareItem 
                        v-for="(social, index) in socials"
                        :key="index"
                        :item="social"
                    />
                </ul>
            </div>
        </div>
</template>

<script>

    import ShareItem from './ShareItem.vue'
    import { ref, computed } from 'vue'

    export default {
        components: {
            ShareItem
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const visible = ref(false)
            const cardURL = computed(() => {
                return window.location.protocol + '//' + window.location.host + props.item.url
            })
            const socials = ref([
                {
                    iconId: 'facebook',
                    link: `https://www.facebook.com/sharer/sharer.php?u=${cardURL.value}`
                },
                {
                    iconId: 'telegram',
                    link: `https://t.me/share/url?url=${cardURL.value}&text=${props.item.question}`
                },
                {
                    iconId: 'instagram',
                    link: ''
                },
                {
                    iconId: 'twitter',
                    link: `https://twitter.com/intent/tweet?text=${props.item.question}&url=${cardURL.value}`
                },
            ])
            
            return {
                visible,
                socials
            }
        }
    }
</script>

<style lang="scss" scoped>

    .card-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 0 0 16px 16px;
            padding: 27px 24px;
            background-color: #292A2C;
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
            cursor: pointer;
            user-select: none;
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
        &__social {
            position: relative;
        }
        &__links {
            position: absolute;
            top: -65px;
            right: 0;
            display: flex;
            align-items: center;
            gap: 21px;
            border-radius: 10px;
            padding: 13px 18px;
            max-height: 50px;
            background-color: rgba(196, 196, 196, 0.4);
            backdrop-filter: blur(2px);
        }
        &__link {
            & :is(a) {
                display: block;
            }
            & :is(svg) {
                display: block;
                width: 25px;
                height: 25px;
                fill: #fff;
                opacity: .6;
                transition: .3s opacity ease-in-out;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
        
</style>
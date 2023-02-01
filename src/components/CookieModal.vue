<template>
    <div class="modal">
        <p class="modal__title">
            Cookies
        </p>    
        <p class="modal__text">
            This website uses cookies that require consent.
        </p>
        <form class="modal__form">
            <label for="functional" class="modal__label">
                <input id="functional" type="checkbox" class="modal__checkbox visually-hidden" checked>
                <span class="modal__checkmark"></span>
                <p class="modal__form-subtitle">
                    Functional
                </p>
                <p class="modal__form-text">
                    Functional cookies are necessary for the functionality of the website. These cookies cannot be disabled.
                </p>
            </label>
            <label for="third-party" class="modal__label">
                <input id="third-party" type="checkbox" class="modal__checkbox visually-hidden">
                <span class="modal__checkmark"></span>
                <p class="modal__form-subtitle">
                    Third party
                </p>
                <p class="modal__form-text">
                    Third-party cookies used for embedded external services.        
                </p>
            </label>
            <div class="modal__buttons">
                <button 
                    @click="setCookie('hideCookieModal', true, 30)"
                    type="button" 
                    class="modal__button modal__button_accept"
                >
                    Accept
                </button>
                <button 
                    @click="setSesionStorage('hideCookieModal', true)"
                    type="button" 
                    class="modal__button modal__button_ignore"
                >
                    To ignore
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        methods: {
            setSesionStorage(key, value) {
                sessionStorage.setItem(key, value)
            },
            setCookie(key, value, expires) {
                const date = new Date;
                date.setDate(date.getDate() + expires);
                document.cookie = `${key}=${value}; path=/; expires=" + ${date.toUTCString()};`
            }
        }
    }
    
</script>

<style scoped lang="scss">
    .modal {
		display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        border-radius: 10px;
        padding: 52px 30px 67px 30px;
        max-width: 383px;
        width: 100%;
        background-color: #D9D9D9;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
        &__title {
            margin-bottom: 15px;
            font-size: 3.4rem;
            font-weight: 500;
            color: #27292D;
        }
        &__text {
            margin-bottom: 35px;
            font-size: 1.8rem;
            font-weight: 500;
            color: #27292D;
        }
        &__label {
            position: relative;
            display: block;
            padding-left: 44px;
            user-select: none;
            cursor: pointer;
            &:not(:last-child) {
                margin-bottom: 35px;
            }
        }
        &__form {
            &-subtitle, &-text {
                font-size: 1.8rem;
                color: #27292D;
            }
            &-subtitle {
                margin-bottom: 10px;
                font-weight: 500;
            }
        }
        &__checkmark {
            position: absolute;
            top: 50%;
            left: 0;
            display: block;
            border: 1px solid #1D1F20;
            border-radius: 5px;
            width: 25px;
            height: 25px;
            background-color: transparent;
            transform: translateY(-50%);
            &::before {
                content: none;
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: 15px;
                height: 15px;
                background-image: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.0426 3.14745L6.86756 11.3219C6.26218 11.9274 5.28017 11.9274 4.67423 11.3219L0.454202 7.10161C-0.151401 6.49612 -0.151401 5.51399 0.454202 4.90839C1.05992 4.30267 2.04185 4.30267 2.6473 4.90816L5.77122 8.03211L12.8492 0.954116C13.4549 0.348399 14.4369 0.348857 15.0424 0.954116C15.6479 1.55972 15.6479 2.5415 15.0426 3.14745Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A");
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                transform: translate(-50%, -50%);
            }
        }
        &__checkbox:checked + &__checkmark {
            background-color: var(--theme-color-1);
            border-color: var(--theme-color-1);
        }
        &__checkbox:checked + &__checkmark::before {
            content: '';
        }
        &__buttons {
            display: flex;
            align-items: center;
            margin-top: 44px;
            margin-left: -10px;
            margin-right: -10px;
        }
        &__button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
            padding: 0 20px;
            max-width: 164px;
            height: 64px;
            width: 100%;
            font-size: 2rem;
            font-weight: 500;
            &:first-child {
                margin-right: 13px;
            }
            &_accept {
                border: 2px solid #1D1F20;
                color: var(--white-color);
                background-color: #1D1F20;
                transition: .3s background-color ease-in-out, .3s border-color ease-in-out;
                &:hover {
                    background-color: var(--theme-color-1);
                    border-color: var(--theme-color-1);
                }
            }
            &_ignore {
                border: 2px solid #1D1F20;
                background-color: transparent;
                color: #1D1F20;
                transition: .3s color ease-in-out, .3s border-color ease-in-out;
                &:hover {
                    border-color: var(--theme-color-1);
                    color: var(--theme-color-1);
                }
            }
        }
    }
</style>
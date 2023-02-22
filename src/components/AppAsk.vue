<template>
	<div class="ask">
		<div class="ask__bg">
			<picture>
				<source srcset="@/assets/images/intro-bg.avif" type="image/avif">
				<source srcset="@/assets/images/intro-bg.webp" type="image/webp">
				<source srcset="@/assets/images/intro-bg.png" type="image/png">
				<img src="@/assets/images/intro-bg.png" alt="">
			</picture>
		</div>
		<div class="container">
			<h1 v-text="question ? question : 'From science fiction to reality'" class="visually-hidden">
			</h1>
			<p class="ask__title h1-title">From <span class="h1-title">science</span> fiction to reality</p>
			<p class="ask__text">Get an instant response to all your questions</p>
			<form class="form">
				<label for="question" class="form__input-wrap">
					<textarea ref="textarea" id="question" class="form__input" placeholder="Ask any question..." v-model="question" v-debounce:300ms="setAutoHeight" :debounce-events="['input']">
					</textarea>
					<div class="form__answer" v-html="replaceWithBr(answer)"></div>
				</label>
				<div class="flex">
					<div class="form__left-block" v-show="answer">
						<div class="form__label">Rate the answer</div>
						<div class="form__button-wrap">
							<button :class="{ 'form__button': true, 'form__dislike': true, 'active': dislikedByUser }" @click.prevent="sendDislike">
								<svg>
									<use xlink:href="@/assets/images/sprites.svg#thumb"></use>
								</svg>
							</button>
							<button :class="{ 'form__button': true, 'active': likedByUser }" @click.prevent="sendLike">
								<svg>
									<use xlink:href="@/assets/images/sprites.svg#thumb"></use>
								</svg>
							</button>
						</div>
					</div>
					<div class="form__right-block">
						<ShareButton 
						class="form__share"
							:url="pageUrl"
						/>
						<PreloaderComponent v-show="isLoading" class="form__preloader"/>
						<button :disabled="isLoading ? true : false" :class="{ 'ask__clear': true, 'active': active }"
							@click.prevent="clearForm">Clear</button>
						<button :disabled="isLoading ? true : false" class="ask__question" @click.prevent="isAuth
						? sendAuthenticationQuestion(`${apiUrl}/Question/ProcessAuthenticated`)
						: sendAnonimousQuestion(`${apiUrl}/Question/ProcessAnonymous`)">
							<span class="ask__question-text">Ask a question</span>
							<span class="ask__question-count">
								1
								<svg>
									<use xlink:href="@/assets/images/sprites.svg#light"></use>
								</svg>
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<recommended-questions :firstArray="firstArray" :secondArray="secondArray" />

	<Teleport to="body">
		<MessageModal>
			<div v-show="!isAuth && !isError" class="message-modal__buttons">
				<button @click="hideMessage" class="message-modal__close-btn" type="button">
					Try Later
				</button>
				<button @click="login" type="button" class="sign-up__button">
					<span>Sign In</span>
					<div class="sign-up__icon-gmail"></div>
				</button>
			</div>
		</MessageModal>
	</Teleport>
</template>

<script>
import { vue3Debounce, debounce } from 'vue-debounce'

import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import RecommendedQuestions from '@/components/RecommendedQuestions.vue'
import { getTokenPopup } from '@/plugin/authPopup'
import { tokenRequest } from '@/plugin/authConfig'
import { getHeadersWithAuthorization } from '@/plugin/api'
import MessageModal from '@/components/ui/MessageModal.vue'
import PreloaderComponent from './ui/PreloaderComponent.vue'
import ShareButton from './ui/ShareButton.vue'
import { signIn } from '@/plugin/authPopup'

import store from '@/store'

import { useRouter } from 'vue-router'
import { useRequest } from '@/hooks/useRequest'

export default {
	components: {
		RecommendedQuestions,
		MessageModal,
		PreloaderComponent,
		ShareButton
	},
	directives: {
		debounce: vue3Debounce({ lock: true })
	},
	setup() {
		const question = ref('')
		const answer = ref('')

		const firstArray = ref([])
		const secondArray = ref([])

		const likedByUser = ref(false)
		const dislikedByUser = ref(false)
		const active = ref(false)

		const apiKey = process.env.VUE_APP_API_KEY
		const apiUrl = process.env.VUE_APP_API_URL

		const getIsAuth = computed(() => {
			return store.getters.getAuthenticated
		})

		const isError = computed(() => {
			return store.getters.getPageInfo
		})

		const isAuth = ref(getIsAuth)

		const isLoading = ref(false)

		const pageUrl = ref('')

		const router = useRouter()

		const pathName = ref(window.location.href)

		const textarea = ref(null)

		const messages = {
			LikeAnonimous: 'Sign in to get unlimited answers!',
			TooMuchRequestsAnonimous: 'Sign in to get unlimited answers!',
			TooMuchRequestsAuthentication: 'Try a bit later!',
			PegeNotFound: 'Page not found, you"ll be redirected to the main page'
		}

		async function sendAnonimousQuestion(url) {
			try {
				isLoading.value = true
				const { response, data } = await useRequest(
					url,
					'POST',
					{
						'Ocp-Apim-Subscription-Key': `${apiKey}`,
						'Content-Type': 'application/json',
					},
					{
						question: question.value,
					}
				)
				if (response.status === 429) showModal(messages.TooMuchRequestsAnonimous)
				if (data) {
					answer.value = data.answer
					pageUrl.value = data.url
					likedByUser.value = data.likedByUser
					setMetaData()
					setPathName(data.url)
					divideArray(data.recommendedQuestions)
				}
				isLoading.value = false
			} catch (e) {
				console.error(e);
				isLoading.value = false
			}
		}

		async function sendAuthenticationQuestion(url) {
			try {
				isLoading.value = true
				const tokenResponse = await getTokenPopup(tokenRequest)
				const { response, data } = await useRequest(
					url,
					'POST',
					{
						'Ocp-Apim-Subscription-Key': `${apiKey}`,
						'Content-Type': 'application/json',
						Authorization: `Bearer ${tokenResponse.accessToken}`,
					},
					{
						question: question.value,
					}
				)
				if (response.status === 429) showModal(messages.TooMuchRequestsAuthentication)
				if (data) {
					answer.value = data.answer
					pageUrl.value = data.url
					setMetaData()
					likedByUser.value = data.likedByUser
					setPathName(data.url)
					divideArray(data.recommendedQuestions)
				}	
				isLoading.value = false
			} catch (e) {
				console.error(e)
				isLoading.value = false
			}
		}

		async function sendDislike() {
			const tokenResponse = await getTokenPopup(tokenRequest)
			if (!tokenResponse) {
				showModal(messages.LikeAnonimous)
			}
			const { data } = await useRequest(
				`${apiUrl}/Question/ToggleDislike/${pageUrl.value}`,
				'POST',
				{
					'Ocp-Apim-Subscription-Key': `${apiKey}`,
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokenResponse.accessToken}`,
				},
				null
			)
			if (data) {
				dislikedByUser.value = true
				likedByUser.value = false
			}
		}

		async function sendLike() {
			const tokenResponse = await getTokenPopup(tokenRequest)
			if (!tokenResponse) {
				showModal(messages.LikeAnonimous)
			}
			const { data } = await useRequest(
				`${apiUrl}/Question/ToggleLike/${pageUrl.value}`,
				'POST',
				{
					'Ocp-Apim-Subscription-Key': `${apiKey}`,
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokenResponse.accessToken}`,
				},
				null
			)
			if (data) {
				likedByUser.value = true
				dislikedByUser.value = false
			}
		}

		async function getPageByUrl(url) {
			try {
				isLoading.value = true
				let token = ''
				if (isAuth.value) {
					const tokenResponse = await getTokenPopup(tokenRequest)
					token = tokenResponse.accessToken
				}
				const { response, data } = await useRequest(
					url,
					'GET',
					getHeadersWithAuthorization(token),
					null
				)
				if (response.status === 404) {
					showModal(messages.PegeNotFound)
					store.dispatch('pageNotFound')
				}
				if (data) {
					answer.value = data.answer
					question.value = data.question
					pageUrl.value = data.url
					likedByUser.value = data.likedByUser
					setMetaData()
					divideArray(data.recommendedQuestions)
				}
				isLoading.value = false
			} catch(e) {
				console.error(e)
				isLoading.value = false
			}
			
		}

		function showModal(message) {
			store.dispatch('openModal', message)
		}

		function divideArray(questions) {
			let half = Math.ceil(questions.length / 2);
			firstArray.value = questions.slice(0, half);
			secondArray.value = questions.slice(half, questions.length);
		}

		function setPathName(url) {
			router.push({
				name: 'home',
				params: {
					url
				}
			})
		}
		function setAutoHeight() {
			textarea.value.style.height = 'auto'
			textarea.value.style.height = textarea.value.scrollHeight + 2 + "px"
		}
		function hideMessage() {
			store.dispatch('closeModal')
		}

		function clearForm() {
			answer.value = ''
			question.value = ''
			active.value = false
			firstArray.value = []
			secondArray.value = []
			router.push('/')
		}

		function login() {
			signIn(loginCompleted)
		}
		function loginCompleted() {
			store.dispatch('setAuthenticated')
		}
		function getPathName() {
			pathName.value = window.location.href.split('/')
				.splice(-1)
				.join('')
		}

		function limitStr() {
			const str = answer.value
			if (str.length > 250) {
				str.slice(0, 250)
			}
			return str
		}

		function setMetaData() {
			const head = document.head
			head.querySelector('title').textContent = question.value
			head.querySelector('meta[name="description"]').setAttribute('content', limitStr())
		}

		function replaceWithBr(answer) {
			return answer.replace(/\n/g, "<br />")
		}

		watch(question, (currentValue) => {
			if (currentValue) {
				active.value = true
			}
		})
		watchEffect(() => {
			const newUlr = router.currentRoute.value.fullPath
			pathName.value = newUlr
			debounce(() => {
				if (pathName.value.length > 1) getPageByUrl(`${apiUrl}/Question/ByUrl/${pathName.value}`)
			}, 1000)
		})
		onMounted(() => {
			getPathName()
			if (pathName.value.length > 1) getPageByUrl(`${apiUrl}/Question/ByUrl/${pathName.value}`)
		})

		return {
			question,
			answer,
			firstArray,
			secondArray,
			likedByUser,
			dislikedByUser,
			active,
			isAuth,
			apiUrl,
			pageUrl,
			isLoading,
			textarea,
			isError,
			sendLike,
			sendDislike,
			setAutoHeight,
			divideArray,
			sendAuthenticationQuestion,
			sendAnonimousQuestion,
			hideMessage,
			clearForm,
			login,
			replaceWithBr,
		}
	},
}
</script>

<style scoped lang="scss">
.ask {
  position: relative;
  padding-bottom: 200px;
  min-height: calc(100vh - 150px);

  &__title {
    font-weight: 400;
    color: #a0a1a6;
    text-align: center;
    margin-bottom: 25px;
  }

  &__title span {
    color: #ffffff;
  }

  &__text {
    font-size: 24px;
    font-weight: 400;
    color: #a0a1a6;
    text-align: center;
    margin-bottom: 70px;
  }

  &__clear {
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 18px;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    padding: 15px 20px;
    margin-right: 18px;
    transition: 0.3s color ease-in-out, 0.3s border-color ease-in-out;
    pointer-events: none;
    &.active {
      color: var(--white-color);
      border-color: var(--white-color);
      pointer-events: all;
       &:disabled {
		pointer-events: none;
       }
    }
  }

  &__question {
    border-radius: 18px;
    background: var(--white-color);
    padding: 15px 32px;
    transition: 0.3s color ease-in-out, 0.3s border-color ease-in-out, 0.3s background-color ease-in-out;
	&:disabled {
		opacity: .5;
		pointer-events: none;
	}

    & span {
      color: #224efe;
      font-size: 20px;
      font-weight: 500;
      transition: 0.3s color ease-in-out;
    }

    & svg {
      transition: 0.3s fill ease-in-out;
    }
  }

  &__question-text {
    padding-right: 30px;
    border-right: 2px solid #d9d9d9;
  }

  &__question-count {
    padding-left: 37px;
    position: relative;
  }

  &__question-count svg {
    width: 15px;
    height: 20px;
    position: absolute;
    top: 5px;
    left: 16px;
    fill: #224efe;
  }

  &__bg {
    position: absolute;
    top: -125px;
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
}

.form {
  position: relative;
  max-width: 1024px;
  width: 100%;
  background: linear-gradient(181.25deg, #224efe -41.38%, #0e36d6 87.57%);
  box-shadow: 0px 34px 64px 0px #00000040;
  border-radius: 30px;
  text-align: center;
  padding: 26px 29px 32px;
  margin: 0 auto;

  &__input-wrap {
    display: block;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border-style: none;
    padding: 15px 30px;
    min-height: 230px;
    margin-bottom: 25px;
  }

  &__input {
    display: block;
    background: transparent;
    border: none;
    font-size: 24px;
    font-weight: 400;
    outline: none;
    width: calc(100% - 133px);
    resize: none;
    box-sizing: border-box;
    height: 50px;
    min-height: 50px;
	transition: .3s color ease-in-out;
	&::-webkit-scrollbar {
      width: 0;
    }
	&, &::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}
	&:focus {
		color: rgba(255, 255, 255, 1);
	}
  }

  &__answer {
    padding-left: 24px;
    text-align: start;
    border-left: 2px solid #ffffff;
    border-radius: 2px;
    width: calc(100% - 133px);
  }

  &__left-block,
  &__right-block {
    display: flex;
    align-items: center;
  }

  &__right-block {
	position: relative;
    margin-left: auto;
  }
  &__preloader {
	left: -60px;
  }
  &__label {
    font-size: 20px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    margin-right: 20px;
  }

	&__dislike {
		position: relative;
		top: 10px;
		margin-right: 15px;
		& svg {
			transform: rotate(180deg);
		}
	}

  &__button {
    cursor: pointer;
    background-color: transparent;

    & svg {
      display: block;
      width: 30px;
      height: 30px;
      fill: transparent;
      stroke: rgba(255, 255, 255, 0.2);
    }

    &.active {
      pointer-events: none;

      & svg {
        fill: rgba(255, 255, 255, 0.6);
      }
    }
  }

	&__share {
		margin-right: 15px;
	}
}

.message-modal__buttons {
  display: flex;
}

.message-modal__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  padding: 0 55px;
  margin-right: 20px;
  font-size: 2rem;
  font-weight: 500;
  color: #7f8186;
  background-color: #1d1f20;
  transition: 0.3s background-color ease-in-out;

  &:hover {
    background-color: #224efe;
  }
}

@media screen and (max-width: 1440px) and (min-width: 991px), screen and (max-height: 900px) {
  .ask {
    min-height: calc(100vh - 33px);
  }
}

@media screen and (max-width: 991px) {
  .ask {
    min-height: calc(100vh - 100px);

    &__title,
    &__title span {
      font-size: 38px;
    }

    &__title {
      margin-bottom: 20px;
    }

    &__text {
      font-size: 16px;
      margin-bottom: 50px;
    }
  }
}

@media screen and (max-width: 768px) {
  .form {
    padding: 11px 10px 80px;

    &__input,
    &__answer {
      font-size: 16px;
      width: 100%;
    }

    &__input-wrap {
      padding: 16px 18px;
      margin-bottom: 17px;
      min-height: 120px;
    }

    &__label {
      display: none;
    }

    &__left-block {
      position: absolute;
      bottom: 0;
    }

    &__right-block {
      display: block;
    }

    &__button {
      position: absolute;
      bottom: 20px;
      left: 30px;
    }
	&__preloader {
		left: 50%;
		top: 75px;
		transform: translateX(-50%);
	}

	&__share {
		margin-bottom: 10px;
	}

	&__button-wrap {
		display: flex;
		
	}
  }

  .ask {
    &__clear {
      opacity: 0.6;
      position: absolute;
      bottom: -70px;
      right: -18px;
    }

    &__question {
      padding: 15px;
    }

    &__question-text,
    &__question span {
      font-size: 18px;
    }

    &__question-text {
      padding-right: 15px;
    }

    &__text {
      margin-bottom: 40px;
    }
  }

  .flex {
    display: block;
  }
}

@media screen and (max-width: 560px) {
  .ask {
    padding-bottom: 100px;
  }

  .ask__question {
    width: 100%;
  }
}
@media screen and (min-width: 991px) {
.ask {
  &__clear {
    &:hover {
      color: #1d1f20;
      border-color: #1d1f20;
    }
  }
  &__question {
    &:hover {
      border-color: var(--white-color);
      color: var(--white-color);
      background-color: #1d1f20;
    }
    &:hover span {
      color: var(--white-color);
    }
    &:hover svg {
      fill: var(--white-color);
    }
  }
}
.form {
  &__button {
    &:hover svg {
      stroke: rgba(255, 255, 255, 0.6);
    }
  }
}
.message-modal__close-btn {
  &:hover {
    background-color: #224efe;
  }
}
}
</style>

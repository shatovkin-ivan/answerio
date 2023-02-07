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
			<h1 class="ask__title h1-title">From <span class="h1-title">science</span> fiction to reality</h1>
			<p class="ask__text">Get an instant AI-based response from reliable sources</p>
			<form class="form">
				<div class="form__input-wrap">
					<textarea class="form__input" placeholder="Ask any question..." v-model="value"
						@input="setAutoHeight">
					</textarea>
					<div class="form__answer">{{  answer }}</div>
				</div>
        <div class="flex">
          <div class="form__left-block">
            <div class="form__label">Rate the answer</div>
						<button :class="{ 'form__button': true, 'active': liked }" @click.prevent="sendLike"></button>
          </div>
         <div class="form__right-block">
          <button :class="{'ask__clear': true, 'active': active}" @click.prevent="clearForm">Clear</button>
					<button class="ask__question" @click.prevent="isAuth
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
	<recommended-questions :array="firstArray" />
	<recommended-questions :array="secondArray" />

	<Teleport to="body">
        <MessageModal
		@hideMessage="hideMessage"
		:showMessage="showMessage"
		:messageText="messageText"
		>
			<div 
				v-show="!isAuth"
				class="message-modal__buttons">
				<button 
					@click="hideMessage"
					class="message-modal__close-btn" 
					type="button">
					Try Later
				</button>
				<button type="button" class="sign-up__button">
					<span>Sign Up</span>
					<div class="sign-up__icon-gmail"></div>
				</button>
			</div>
		</MessageModal>
    </Teleport>
</template>

<script>
import { ref, computed, watch } from 'vue'
import RecommendedQuestions from '@/components/RecommendedQuestions.vue'
import { getTokenPopup } from "@/plugin/authPopup"
import { tokenRequest } from "@/plugin/authConfig"
import MessageModal from '@/components/ui/MessageModal.vue'

import store from '@/store'

// import { useRouter } from 'vue-router'

export default {
	components: {
		RecommendedQuestions,
		MessageModal
	},
	setup() {
		let question = ref('')
		let answer = ref('')
		let firstArray = ref([])
		let secondArray = ref([])
		let liked = ref(true)
		let active = ref(false)

		const apiKey = process.env.VUE_APP_API_KEY
		const apiUrl = process.env.VUE_APP_API_URL

		const getIsAuth = computed(() => {
			return store.getters.getAuthenticated
		})

		const isAuth = ref(getIsAuth)

		const showMessage = ref(false)
		const messageText = ref('')

		// const router = useRouter()

		async function sendAnonimousQuestion(url) {
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Ocp-Apim-Subscription-Key': `${apiKey}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						question: question.value,
					}),
				})
				const data = await response.json()
				answer.value = data.answer
				if (data.statusCode === 429) {
					console.log('222');
					showMessage.value = true
					messageText.value = data.message
				}
				// setPathName(data.url)
				divideArray(data.recommendedQuestions)
			} catch (e) {
				console.log(e);
			}
		}

		async function sendAuthenticationQuestion(url) {
			try {
				const tokenResponse = await getTokenPopup(tokenRequest)
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Ocp-Apim-Subscription-Key': `${apiKey}`,
						'Content-Type': 'application/json',
						Authorization: `Bearer ${tokenResponse.accessToken}`,
					},
					body: JSON.stringify({
						question: question.value,
					}),
				})
				const data = await response.json()
				answer.value = data.answer
				if (data.statusCode === 429) {
					showMessage.value = true
					messageText.value = data.message
				}
				// setPathName(data.url)
				divideArray(data.recommendedQuestions)
			} catch (e) {
				console.error(e)
			}
		}

		async function sendLike() {
			const response = await fetch(`${apiUrl}/Question/Like`, {
				method: 'POST',
				headers: {
					'Ocp-Apim-Subscription-Key': `${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: '',
			})
			liked = true
			const data = await response.json()
			console.log(data);
		}

		function divideArray(questions) {
			let half = Math.ceil(questions.length / 2);
			firstArray.value = questions.slice(0, half);
			secondArray.value = questions.slice(half, questions.length);
		}

		// function setPathName(url) {
		// 	router.push({
		// 		name: 'home',
		// 		params: {
		// 			url
		// 		}
		// 	})
		// }
		function setAutoHeight(e) {
			e.target.style.height = 'auto'
			e.target.style.height = e.target.scrollHeight + 2 + "px"
		}
		function hideMessage() {
			showMessage.value = false
		}

		function clearForm() {
			answer.value = ''
			question.value = ''
			active.value = false
		}

		watch(question, (currentValue) => {
			if (currentValue) {
				active.value = true
			}
			
		}) 

		return {
			sendAnonimousQuestion,
			sendAuthenticationQuestion,
			question,
			answer,
			divideArray,
			firstArray,
			secondArray,
			sendLike,
			liked,
			isAuth,
			apiUrl,
			setAutoHeight,
			showMessage,
			messageText,
			hideMessage,
			clearForm
		}
	},
}
</script>

<style scoped lang="scss">
.ask {
	position: relative;
	margin-bottom: 220px;

	&__title {
		font-weight: 400;
		color: #A0A1A6;
		text-align: center;
		margin-bottom: 25px;
	}

	&__title span {
		color: #ffffff;
	}

	&__text {
		font-size: 24px;
		font-weight: 400;
		color: #A0A1A6;
		text-align: center;
		margin-bottom: 70px;
	}

	&__clear {
		border: 2px solid rgba(255, 255, 255, 0.6);
		border-radius: 18px;
		background: transparent;
		padding: 15px 20px;
		margin-right: 18px;

		&:hover {
			color: #1D1F20;
			border-color: #1D1F20;
		}
		&.active {
			color: var(--white-color);
			border-color: var(--white-color);
		}
	}

	&__question {
		border-radius: 18px;
		background: #FFFFFF;
		padding: 15px 32px;

		&:hover,
		&:hover span {
			border-color: var(--white-color);
			color: var(--white-color);
			background-color: #1d1f20;
		}

		&:hover svg {
			fill: var(--white-color);
		}
	}

	&__question span {
		color: #224EFE;
		font-size: 20px;
		font-weight: 500;
	}

	&__question-text {
		padding-right: 30px;
		border-right: 2px solid #D9D9D9;
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
		fill: #224EFE;
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
	max-width: 1024px;
	width: 100%;
	background: linear-gradient(181.25deg, #224EFE -41.38%, #0E36D6 87.57%);
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
		color: rgba(255, 255, 255, 0.6);
		font-size: 24px;
		font-weight: 400;
		outline: none;
		width: calc(100% - 133px);
		resize: none;
		box-sizing: border-box;
		height: 50px;
		min-height: 50px;
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

	&__label {
		font-size: 20px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.6);
		margin-right: 20px;
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

		&:hover svg {
			stroke: rgba(255, 255, 255, 0.6);
		}

		&.active svg {
			fill: rgba(255, 255, 255, 0.6);
		}
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
	color: #7F8186;
	background-color: #1D1F20; 
	transition: 0.3s background-color ease-in-out;
	&:hover {
		background-color: #224EFE;
	}
}
@media screen and (max-width: 991px) {
	.ask {

		&__title,
		&__title span {
			font-size: 38px;
		}

		&__title {
			margin-bottom: 20px;
		}

		&__text {
			font-size: 16px;
		}
	}
}

@media screen and (max-width: 768px) {
	.form {
		padding: 26px 29px 65px;


		&__input,
		&__answer {
			font-size: 16px;
			width: 100%;
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
	}

	.ask {
		&__clear {
			border: none;
			opacity: 0.6;
			position: absolute;
			bottom: 10px;
			right: 30px;
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

	}

	.flex {
		display: block;
	}
}
</style>
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
					<textarea 
						class="form__input" 
						placeholder="Ask any question..."
						v-model="value"
					></textarea>
					<div class="form__answer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem pariatur amet, mollitia quod est numquam nobis labore voluptates quis, sint qui eos eveniet! Deserunt porro minima illum qui iste? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem pariatur amet, mollitia quod est numquam nobis labore voluptates quis, sint qui eos eveniet! Deserunt porro minima illum qui iste? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem pariatur amet, mollitia quod est numquam nobis labore voluptates quis, sint qui eos eveniet! Deserunt porro minima illum qui iste? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem pariatur amet, mollitia quod est numquam nobis labore voluptates quis, sint qui eos eveniet! Deserunt porro minima illum qui iste? Ratione.</div>
					<!-- {{  answer }} -->
				</div>
        <div class="flex">
          <div class="form__left-block">
            <label class="form__label" for="choice">Rate the answer</label>
							<input class="form__radio radio-1" type="radio" name="choice" id="choice-for">
							<input class="form__radio radio-2" type="radio" name="choice" id="choice-against"> 
          </div>
         <div class="form__right-block">
          <button class="ask__clear">Clear</button>
          <button class="ask__question">
						<span class="ask__question-text" @click.prevent="sendQuestion">Ask a question</span> 
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
	<recommended-questions :questions="questions"></recommended-questions>
</template>

<script>
import { ref } from 'vue'
import RecommendedQuestions from './RecommendedQuestions.vue'
export default {
setup() {
	const value = ref('')
	let answer = ref('')
	let questions = ref('')

	const apiKey = process.env.VUE_APP_API_KEY
    const apiUrl = process.env.VUE_APP_API_URL

	async function sendQuestion() {
		try {
			const response = await fetch(`${apiUrl}/Question/Process`, {
				method: 'POST',
				headers: {
					'Ocp-Apim-Subscription-Key': `${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					question: value.value,
				}),
			})
			const data = await response.json()
			answer.value = data.answer
			questions.value = data.recommendedQuestions
			console.log(answer.value);
			console.log(data.recommendedQuestions);
		} catch(e) {
			console.log(e);
		}
	}

	return {
		sendQuestion,
		value,
		answer,
		questions,
	}
},
components: {
	RecommendedQuestions
}

}
</script>

<style scoped lang="scss">

.ask {
	
	position: relative;
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
		border: 2px solid rgba(255,255,255,0.6);
		border-radius: 18px;
		background: transparent;
		padding: 15px 20px;
		margin-right: 18px;
	}

	&__question {
		border: 2px solid rgba(255,255,255,0.6);
		border-radius: 18px;
		background: #FFFFFF;
		padding: 15px 32px;
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
	margin: 0 auto 220px;

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
		color: rgba(255,255,255,0.6);
		font-size: 24px;
		font-weight: 400;
		outline: none;
		width: calc(100% - 133px);
		resize: none;
		box-sizing: border-box;
		height: 50px;
		min-height: 50px;
		max-height: 150px;
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
		color: rgba(255,255,255,0.6);
		margin-right: 20px;
	} 

	&__radio {
		cursor: pointer;
		width: 29px;
		height: 73px;
		opacity: 0.6;
		appearance: none;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}

	&__radio.radio-1 {
    position: relative;
		top: 10px;
		background-image: url('../assets/images/thumb-down.svg');
		margin-right: 15px;
	
	}

	&__radio.radio-1:checked:focus {
		background-image: url('../assets/images/thumb-active.svg');
		transform: rotate(180deg);
	}

	&__radio.radio-2:checked:focus {
		background-image: url('../assets/images/thumb-active.svg');
	}

	&__radio.radio-2 {
		background-image: url('../assets/images/thumb-up.svg');
	}
}

@media screen and (max-width: 768px){
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

@media screen and (max-width: 320px) {
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
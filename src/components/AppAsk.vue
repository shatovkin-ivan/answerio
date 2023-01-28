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
					<input class="form__input" type="text" placeholder="Ask any question...">
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
</template>

<style scoped lang="scss">

.ask {
	padding-top: 131px;
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
		color: rgba(255,255,255,0.6);
		font-size: 24px;
		font-weight: 400;
		outline: none;
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

	&__radio.radio-2 {
		background-image: url('../assets/images/thumb-up.svg');
	}
}

@media screen and (max-width: 1200px){
	.ask {
		padding-top: 116px;
	}
}

@media screen and (max-width: 768px){
	.ask {
		padding-top: 77px;
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
</style>

<script>
export default {

}
</script>
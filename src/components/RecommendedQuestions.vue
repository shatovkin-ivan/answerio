<template>
	<div class="recommended">
		<div class="container">
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in firstArray" :key="question.id">
					<p class="recommended__title">{{ question.question }}</p>
					<p class="recommended__answer">{{ question.answer }}</p>
				</li>
			</ul>
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in secondArray" :key="question.id">
					<p class="recommended__title">{{ question.question }}</p>
					<p class="recommended__answer">{{ question.answer }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	props: ['firstArray', 'secondArray'],
} 

</script>

<style scoped lang="scss">
.recommended {
	&__list {
		min-width: 100%;
		// min-height: 300px;
		margin-bottom: 40px;
		display: flex;
		overflow-x: auto;
	}

	&__list::-webkit-scrollbar {
  display: none;
}

	&__question {
		min-width: 650px;
		margin: 5px;
		display: inline-block;
		background-color: #1D1F20;
		border-radius: 16px;
		padding: 16px 24px;
		position: relative;
		

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -21px;
			left: 24px;
			width: 0;
			height: 0;
			border-top: 21px solid #1D1F20;
			border-right: 21px solid transparent;
		}
	}

	&__question:not(:last-child) {
		margin-right: 30px;
		margin-bottom: 40px;
	}

	&__title {
		margin-bottom: 20px;
	}

	&__answer {
		padding-left: 24px;
		line-height: 200%;
		border-left: 2px solid #A0A1A6;
		border-radius: 2px;
		color: #A0A1A6;
	}
}
</style>
<template>
	<div class="recommended">
		<div class="container">
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in array" :key="question.id">
					<p class="recommended__title">{{ question.question }}</p>
					<p class="recommended__answer">{{ question.answer }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// import { onMounted } from '@vue/runtime-core';
import { watchEffect } from 'vue';
import { ref } from 'vue';

export default {
	props: ['array'],
	setup(props) {

		let innerArray = ref(props.array)

		function test() {
			console.log(props.array);
		}

		watchEffect(() => {
			console.log(innerArray);
		})

		return {
			test,
			innerArray
		}
	}
}


</script>

<style scoped lang="scss">
.recommended {
	&__list {
		margin-bottom: 20px;
	}

	&__question {
		display: inline-block;
		background-color: #1D1F20;
		box-shadow: 0px 34px 64px 0px #00000040;
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
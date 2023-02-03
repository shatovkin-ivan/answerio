<template>
	<div class="recommended">
		<div class="container">
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in array" :key="question.id">
					<button @click="test"></button>
				<p>{{ question }}</p>
				<p>Lorem ipsum dolor sit amet.</p>
				</li>
			</ul>
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in array" :key="question.id">
				<p> 1</p>
				<p>Lorem ipsum dolor sit amet.</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	props: ['array'],
	setup(props) {
	function test() {
		console.log(props.firstArray);
	}

	return {
		test
	}
}
} 


</script>

<style scoped lang="scss">
.recommended {
	&__list:not(:last-child) {
		margin-bottom: 20px;
	}

	&__question {
		display: inline-block;
		background-color: #1D1F20;
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
}
</style>
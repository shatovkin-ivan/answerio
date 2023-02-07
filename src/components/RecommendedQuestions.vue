<template>
	<section id="recommended" class="recommended" v-if="firstArray.length">
		<a href="#recommended" class="recommended__link">
			<span>See </span> what else we have found for you
		</a>
		<div 
			@mousedown="mouseDown"
			@mouseleave="mouseLeave"
			@mouseup="mouseUp"
			@mousemove="mouseMove"
			class="container container_scroll"
		>
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
	</section>
</template>

<script>

export default {
	props: ['firstArray', 'secondArray'],
	setup() {
		const tableGrab = {
			isDown: false,
			startX: null,
			scrollLeft: null,
		}
		function mouseDown(e) {
			tableGrab.isDown = true
            e.currentTarget.classList.add('active')
            tableGrab.startX = e.pageX - e.currentTarget.offsetLeft
            tableGrab.scrollLeft = e.currentTarget.scrollLeft
		}
		function mouseLeave(e) {
			tableGrab.isDown = false
            e.currentTarget.classList.remove('active')
		}
		function mouseUp(e) {
			tableGrab.isDown = false
            e.currentTarget.classList.remove('active')
		}
		function mouseMove(e) {
			if(!tableGrab.isDown) return
            e.preventDefault()
            const x = e.pageX - e.currentTarget.offsetLeft
            const walk = (x - tableGrab.startX) * 1
            e.currentTarget.scrollLeft = tableGrab.scrollLeft - walk
		}

		return {
			mouseDown,
			mouseLeave,
			mouseUp,
			mouseMove
		}
	}
} 

</script>

<style scoped lang="scss">

.container_scroll {
	display: flex;
	flex-direction: column;
	gap: 40px;
	overflow-x: auto;
	cursor: grab;
	&::-webkit-scrollbar {
		width: 0;
	}
	&.active {
		cursor: grabbing;
	}
}
.recommended {
	&__list {
		position: relative;
		min-width: 100%;
		display: flex;
	}

	&__question {
		min-width: 33%;
		max-width: 600px;
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

	&__link {
		display: block;
		width: fit-content;
		margin: 0 auto;
		position: relative;
		top: -150px;
		color: #5E6063;
		
		& span {
			color: #0E36D6;
		}

		&::after {
			content: '';
			position: absolute;
			display: block;
			right: -50px;
			top: calc(50% - 40px);
			width: 80px;
			height: 80px;
			background-image: url('@/assets/images/arrow.svg');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			z-index: 3;
		}
	}
}
</style>
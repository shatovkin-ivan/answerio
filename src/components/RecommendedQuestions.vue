<template>
	<section id="recommended" class="recommended" v-if="firstArray.length">
		<div 
			@click="scrollToList"
			class="recommended__link"
		>
			<span>See </span> what else we have found for you
		</div>
		<div class="show-scroll">
			<span class="show-scroll__line"></span>
			<div class="show-scroll__hand">
				<svg>
					<use xlink:href="@/assets/images/sprites.svg#hand"></use>
				</svg>
			</div>
		</div>
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
					<p 
						:class="question.answer.length > 250 ? 'hidden' : ''"
						class="recommended__answer"
					>
						{{ question.answer }}
					</p>
					<p v-if="question.answer.length > 250" class="recommended__show">
						Read more
					</p>
				</li>
			</ul>
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in secondArray" :key="question.id">
					<p class="recommended__title">{{ question.question }}</p>
					<p 
						:class="question.answer.length > 250 ? 'hidden' : ''"
						class="recommended__answer"
					>
						{{ question.answer }}
					</p>
					<p v-if="question.answer.length > 250" class="recommended__show">
						Read more
					</p>
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

		function scrollToList() {
			const top = window.innerHeight
			window.scrollTo({
				top: top,
				behavior: "smooth"
			})
		}

		return {
			mouseDown,
			mouseLeave,
			mouseUp,
			mouseMove,
			scrollToList
		}
	}
} 

</script>

<style scoped lang="scss">

.show-scroll {
	display: none;
}
.container_scroll {
	display: flex;
	flex-direction: column;
	gap: 20px;
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
	position: relative;
	padding-bottom: 100px;
	&__list {
		position: relative;
		min-width: 100%;
		display: flex;
		gap: 30px;
		padding-bottom: 20px;
	}

	&__question {
		min-width: 33%;
		max-width: 600px;
		display: block;
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

	&__title {
		margin-bottom: 20px;
	}

	&__answer {
		padding-left: 24px;
		line-height: 1.25;
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
		cursor: pointer;
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
@media screen and (max-width: 1440px) {
	.recommended {
		padding-bottom: 60px;
		&__question {
			min-width: 45%;
		}
	}
}
@media screen and (max-width: 991px) {
	.recommended {
		&__question {
			min-width: 50%;
		}
	}
	.show-scroll {
		position: absolute;
		top: -46px;
		right: calc(var(--container-padding) + 20px);
		display: block;
		max-width: 142px;
		width: 100%;
		&__line {
			display: block;
			border-radius: 40px;
			width: 100%;
			height: 2px;
			background-color: rgba(160, 161, 166, 0.4);
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				display: block;
				border-radius: 40px;
				width: 30px;
				height: 2px;
				background-color: rgba(160, 161, 166, 1);
			}
		}
		&__hand {
			position: relative;
			top: 7px;
			margin: 0 auto;
			width: 23px;
			height: 32px;
			// animation: handAnimation 3s ease-in-out 0 infinite;
			animation: handAnimation 1s linear infinite alternate;
			& svg {
				width: 100%;
				height: 100%;
			}
		}
	}
}
@media screen and (max-width: 560px) {
	.recommended {
		padding-bottom: 0;
		&__link {
			top: -85px;
			max-width: 150px;
		}
	}
	.recommended {
		&__question {
			min-width: 75%;
		}
		&__list {
			padding-bottom: 14px;
			gap: 10px;
		}
		&__question {
			&::after {
				bottom: -14px;
				border-top: 14px solid #1D1F20;
				border-right: 14px solid transparent;
			}
		}
		&__answer {
			padding-left: 16px;
		}
	}
	.container_scroll {
		gap: 15px;
	}
	.show-scroll {
		top: -10px;
		right: auto;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
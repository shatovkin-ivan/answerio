<template>
	<div class="recommended">
		<div class="container">
			<ul class="recommended__list">
				<li class="recommended__question" v-for="question in questions" :key="question.id">
				<p>{{ question.question }}</p>
				<p>Lorem ipsum dolor sit amet.</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: ['questions']
}
</script>
<template>
	<div class="container mt-3 pt-5 pb-5 bg-light d-flex flex-column justify-content-center align-items-center">
		<h2 class="text-center">End of Game</h2>
		
		<h4 class="badge badge-success mt-4">Correct answers: {{ correct }}</h4>
		<h4 class="badge badge-warning mt-2">Mistakes: {{ error }}</h4>
		<h4 class="badge badge-info mt-2">Time taken: {{ timer }} seconds</h4>
		
		<div class="buttons mt-5">
			<button type="button" class="btn btn-success" @click="restart">Start Over?</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		correct: {
			type: Number,
			required: true
		},
		error: {
			type: Number,
			required: true
		},
		timer: {
			type: Number,
			required: true
		}
	},
	emits: ['restart'],
	data() {
		return {
			
		}
	},
	methods: {
		restart() {
			this.$emit('restart');
		},
	},
}
</script>

<style lang="sass" scoped>
.badge
	font-size: 1rem !important
</style>

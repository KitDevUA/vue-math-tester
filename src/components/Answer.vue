<template>
	<div class="container mt-3 pt-5 pb-5 bg-light d-flex flex-column justify-content-center align-items-center">
		<h2 v-if="result" class="badge badge-success">You answered correctly :)</h2>
		<h2 v-else class="badge badge-warning">Error!</h2>
		
		<span v-if="!result">{{ correct }}</span>
		
		<div class="buttons mt-5">
			<button type="button" class="btn btn-success" @click="next">{{ buttonText }}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		result: {
			type: Boolean,
			required: true
		},
		correct: {
			type: String,
			required: true
		},
		buttonText: {
			type: String,
			required: true
		}
	},
	emits: ['next'], // specify the events that this component can emit
	data() {
		return {
			
		}
	},
	methods: {
		next() {
			this.$emit('next');
		},
	},
}
</script>

<style lang="sass" scoped>
.badge
	font-size: 2rem !important
</style>

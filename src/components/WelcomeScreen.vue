<template>
	<div class="container bg-light mt-3 pt-5 pb-5 d-flex flex-column justify-content-center align-items-center">
		<h2 class="text-center">Hello. Would you like to do some math?</h2>
		<div class="buttons mt-5">
			<button type="button" class="btn btn-success" @click="begin()">Start</button>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	methods: {
		begin() {
			this.$emit('begin');
		},
	}
}
</script>

<style lang="sass">

</style>

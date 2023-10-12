<template>
	<div class="container bg-light mt-3 pt-5 pb-5 d-flex flex-column justify-content-center align-items-center">
		<h2 class="text-center">How much is <b>{{x}}</b> + <b>{{y}}</b>?</h2>
		<div class="buttons mt-5">
			<button type="button" :class="easyMode && answer == correct ? 'btn-success' : 'btn-warning'" class="btn"
				v-for="(answer,i) in answers"
				:key="i"
				@click="choice(answer)"
			>{{ answer }}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		valMin: {
			type: Number,
			required: true
		},
		valMax: {
			type: Number,
			required: true
		},
		answerQuantity: {
			type: Number,
			required: true
		},
		easyMode: {
			type: Boolean,
			default: false
		}
	},
	emits: ['answer'],
	data() {
		return {
			x: randomQuestion(this.valMin, this.valMax),
			y: randomQuestion(this.valMin, this.valMax),
		}
	},
	methods: {
		choice(answer) {
			this.$emit('answer', {
				result: answer == this.correct,
				correct: this.x + ' + ' + this.y + ' = ' + this.correct,
			});
		},
	},
	computed: {
		correct() {
			return this.x + this.y;
		},
		answers() {
			let arr = [this.correct],
				newVal = false;
			
			while (arr.length < this.answerQuantity) {
				newVal = randomAnswer(this.correct, 10);
				
				if (arr.indexOf(newVal) === -1)
					arr.push(newVal);
			}
			
			arr.sort(function(a, b) {
				return Math.random() - 0.5;
			});
			
			return arr;
		},
	},
}

function randomQuestion(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
}

function randomAnswer(correct, deviation) { // deviation def: 10%
	let min = correct - correct * (1 / deviation),
		max = correct + correct * (1 / deviation),
		rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
	return rand;
}
</script>

<style lang="sass">
	.btn
		margin-left: 10px
		margin-right: 10px
</style>

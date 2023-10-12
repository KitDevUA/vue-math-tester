<template>
	<div id="app">
		<div class="container pt-3 pb-3">
			<h1 class="text-center">Math Trainer</h1>
			
			<h2
				v-if="appState == 'Question' || appState == 'Answer'"
			>
				{{ levelSettings[ curLevel ].levelTitle }}
			</h2>
			
			<h6
				v-if="appState == 'Question' || appState == 'Answer'"
			>
				Correct: {{ stats.correct }} / Errors: {{ stats.error }}
			</h6>
			
			<h6
				v-if="appState == 'Question' || appState == 'Answer'"
			>
				Time taken: {{ showTimer }} seconds
			</h6>
			
			<div
				v-if="appState == 'Question' || appState == 'Answer'"
				class="progress"
				style="height: 20px;"
			>
				<div
					class="progress-bar progress-bar-striped bg-success"
					role="progressbar"
					:style="width.style"
					aria-valuenow="25"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					{{ width.text }}
				</div>
			</div>
			
			<WelcomeScreen
				v-if="appState == 'WelcomeScreen'"
				@begin="begin"
			>
			</WelcomeScreen>
			
			<Question
				v-else-if="appState == 'Question'"
				:valMin="levelSettings[curLevel].valMin"
				:valMax="levelSettings[curLevel].valMax"
				:answerQuantity="levelSettings[curLevel].answerQuantity"
				:easyMode="easyMode"
				@answer="getedAnswer"
			>
			</Question>
			
			<Answer
				v-if="appState == 'Answer'"
				:result="answerResult"
				:correct="answerCorrect"
				:buttonText="buttonText"
				@next="next"
			>
			</Answer>
			
			<ResultScreen
				v-if="appState == 'ResultScreen'"
				:correct="stats.correct"
				:error="stats.error"
				:timer="stats.timer"
				@restart="begin"
			>
			</ResultScreen>
		</div>
		<div class="container pt-3 pb-3">
			<h3>Settings</h3>
			<form>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="easyMode" v-model="easyMode">
					<label class="form-check-label" for="easyMode">
						Easy mode
					</label>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			appState: 'WelcomeScreen', // WelcomeScreen | Question | Answer | ResultScreen
			curLevel: 0,
			stats: {
				correct: 0,
				error: 0,
				timer: 0,
			},
			levelSettings: [
				{
					levelTitle: 'Level 1',
					valMin: 5,
					valMax: 15,
					questionQuantity: 3,
					answerQuantity: 2,
				},
				{
					levelTitle: 'Level 2',
					valMin: 10,
					valMax: 100,
					questionQuantity: 4,
					answerQuantity: 3,
				},
				{
					levelTitle: 'Level 3',
					valMin: 100,
					valMax: 250,
					questionQuantity: 5,
					answerQuantity: 4,
				},
			],
			easyMode: false,
			answerResult: false,
			answerCorrect: false,
			answerInTheLevel: 0, // number of completed questions at the current level
			tick: false, // interval for time update
		}
	},
	methods: {
		begin() { // Start a new game
			this.appState = 'Question';
			this.stats.correct = 0;
			this.stats.error = 0;
			this.stats.timer = 0;
			this.curLevel = 0;
			this.answerInTheLevel = 0;
			
			this.timerStart(); // start the timer
		},
		getedAnswer(value) { // user provided an answer
			this.appState = 'Answer';
			this.answerResult = value.result; // pass true/false about the answer's correctness
			this.answerCorrect = value.correct;
			
			if (value.result)
				this.stats.correct++;
			else
				this.stats.error++;
			
			this.answerInTheLevel++;
			this.timerStop(); // Pause the timer until the next question
		},
		next() { // move to the next question/level/end of the game
			if (this.answerInTheLevel < this.levelSettings[this.curLevel].questionQuantity) {
				this.appState = 'Question';
				this.timerStart(); // Resume the timer
			}
			else {
				if (this.curLevel + 1 < this.levelSettings.length) {
					this.curLevel++;
					this.answerInTheLevel = 0;
					this.appState = 'Question';
					this.timerStart(); // Resume the timer
				}
				else {
					this.appState = 'ResultScreen';
					this.timerStop(); // Stop the timer
				}
			}
		},
		timerStart() {
			this.tick = setInterval(function() {
				this.stats.timer++
			}.bind(this), 1000);
		},
		timerStop() {
			clearInterval(this.tick);
		},
	},
	computed: {
		width() {
			let w	= Math.round( (100 / this.levelSettings[this.curLevel].questionQuantity) * this.answerInTheLevel );
			
			return {
				text: w + '%',
				style: {
					width: w + '%',
				},
			};
		},
		buttonText() {
			let text = '';
			
			if ( this.answerInTheLevel < this.levelSettings[ this.curLevel ].questionQuantity )
				text = 'Next question';
			else {
				if ( this.curLevel + 1 < this.levelSettings.length )
					text = 'Next level';
				else
					text = 'Results';
			}
			
			return text;
		},
		showTimer() {
			return this.stats.timer;
		},
	},
}
</script>

<style lang="sass">
body
	background: wheat
	#app
		> *
			background: #fff
		.space
			min-height: 200px
</style>

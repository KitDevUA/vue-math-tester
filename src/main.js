import Vue from 'vue'
import App from './App.vue'

import WelcomeScreen from './components/WelcomeScreen.vue'
import Question from './components/Question.vue'
import Answer from './components/Answer.vue'
import ResultScreen from './components/ResultScreen.vue'

Vue.component('WelcomeScreen', WelcomeScreen);
Vue.component('Question', Question);
Vue.component('Answer', Answer);
Vue.component('ResultScreen', ResultScreen);

new Vue({
	el: '#app',
	render: h => h(App)
})

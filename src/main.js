import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomeScreen from './components/WelcomeScreen.vue'
import Question from './components/Question.vue'
import Answer from './components/Answer.vue'
import ResultScreen from './components/ResultScreen.vue'

const app = createApp(App);

app.component('WelcomeScreen', WelcomeScreen);
app.component('Question', Question);
app.component('Answer', Answer);
app.component('ResultScreen', ResultScreen);

app.mount('#app');
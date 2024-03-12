const API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

let score = 0;
let currentQuestion = null;

async function fetchQuestion() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results[0];
}

function displayQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = question.question;

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    const allOptions = [...question.incorrect_answers, question.correct_answer];
    const shuffledOptions = shuffle(allOptions);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, question.correct_answer);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById('score-value').textContent = score;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function init() {
    currentQuestion = await fetchQuestion();
    displayQuestion(currentQuestion);

    const nextButton = document.getElementById('next-btn');
    nextButton.addEventListener('click', async () => {
        currentQuestion = await fetchQuestion();
        displayQuestion(currentQuestion);
    });
}

init();

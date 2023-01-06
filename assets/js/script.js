const scoreAreaButton = document.querySelector('.score-area button');
scoreAreaButton.addEventListener('click', resetEvent);

const progressBar = document.querySelector('.progress--bar');
const scoreArea = document.querySelector('.score-area');
const questionArea = document.querySelector('.question-section');
const question = document.querySelector('.question');
const options = document.querySelector('.options');
const messageFeedback = document.querySelector('.message--feedback');

let currentQuestion = 0;
let correctAnswers = 0;
let optionSelected = false;

showQuestion();

function showQuestion() {
  if (questions[currentQuestion]) {
    const q = questions[currentQuestion];
    const percentage = Math.floor((currentQuestion / questions.length) * 100);
    progressBar.style.width = `${percentage}%`;
    scoreArea.style.display = 'none';
    questionArea.style.display = 'flex';
    question.innerHTML = q.question;
    options.innerHTML = q.options.map((option, index) => {
      return `<div data-op="${index}" class="option"><span>${index + 1}</span> ${option}</div>`;
    }).join('');
    document.querySelectorAll('.options .option').forEach(button => {
      button.addEventListener('click', handleOptionClick);
    });
  } else {
    finishQuiz();
  }
}

function handleOptionClick(event) {
  if (optionSelected) {
    return;
  }

  optionSelected = true;

  const clickedOption = parseInt(event.target.getAttribute('data-op'));
  if (questions[currentQuestion].answer === clickedOption) {
    messageFeedback.style.color = '#fff';
    messageFeedback.innerHTML = 'Resposta correta';
    correctAnswers++;
  } else {
    messageFeedback.style.color = '#fff';
    messageFeedback.innerHTML = 'Resposta incorreta';
  }
  
  setTimeout(() => {
    messageFeedback.innerHTML = '';
    currentQuestion++;
    showQuestion();
    optionSelected = false;
  }, 2000);
}

function finishQuiz() {
  const points = Math.floor((correctAnswers / questions.length) * 100);
  const scorePct = document.querySelector('.score-pct');
  const scoreText2 = document.querySelector('.score-text-2');
  scorePct.innerHTML = `Acertou ${points}%`;
  scoreText2.innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

  if (points < 30) {
    scorePct.style.color = '#FF0000';
  } else if (points >= 30 && points < 70) {
    scorePct.style.color = '#FFF000';
  } else if (points >= 70) {
    scorePct.style.color = '#00FF00';
  }

  scoreArea.style.display = 'block';
  questionArea.style.display = 'none';
  progressBar.style.width = `100%`;
}

function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
// Initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events 
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion(){
  if(questions[currentQuestion]){
    let q = questions[currentQuestion];

    // number of questions percentage
    let percentage = Math.floor((currentQuestion / questions.length) * 100);

    // changing progress bar width according percentage value
    document.querySelector('.progress--bar').style.width = `${percentage}%`;

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';

    document.querySelector('.question').innerHTML = q.question;

    let optionsHtml = '';

    for(let i in q.options){
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
    }

    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent);
    });
  }else{
    finishQuiz();
 }
}

function optionClickEvent(e){
  let clickedOption = parseInt(e.target.getAttribute('data-op'));

  if(questions[currentQuestion].answer === clickedOption){
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz(){
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if(points < 30){
    document.querySelector('.scorePct').style.color = '#FF0000';
  }else if(points >= 30 && points < 70){
    document.querySelector('.scorePct').style.color = '#FFF000';
  }else if(points >= 70){
    document.querySelector('.scorePct').style.color = '#00FF00';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`;

  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent(){
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
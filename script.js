const questions = [
    {
        question : "Which is the largest animal in the world?", 
        answers  :[
            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false},
        ]
    },
    {
        question : "Which planet is known as the Red Planet?", 
        answers  :[
            {text: "Earth" , correct: false},
            {text: "Jupiter" , correct: false},
            {text: "Mars" , correct: true},
            {text: "Venus" , correct: false},
        ]
    },
    {
        question : "Which element has the chemical symbol 'O'?", 
        answers  :[
            {text: "Gold" , correct: false},
            {text: "Oxygen" , correct: true},
            {text: "Silver" , correct: false},
            {text: "Carbon" , correct: false},
        ] 
    },
    {
        question : "What is the process by which water moves through a plant, from the roots to the leaves, and is then released into the air as water vapor?", 
        answers  :[
            {text: "Respiration" , correct: false},
            {text: "Transipiration" , correct: true},
            {text: "Evaporation" , correct: false},
            {text: "Photosynthesis" , correct: false},
        ] 
    },
    {
        question : "What is the largest organ in the human body?", 
        answers  :[
            {text: "Brain" , correct: false},
            {text: "Skin" , correct: true},
            {text: "Heart" , correct: false},
            {text: "Lungs" , correct: false},
        ] 
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function showQuestion(){
    resetState();
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${questions[currentQuestionIndex].question}`;

    questions[currentQuestionIndex].answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButton.appendChild(button);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect   = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();



 
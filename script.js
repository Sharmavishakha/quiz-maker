let questionCount = 0;
let quizData = [];

function addQuestion() {
    questionCount++;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.innerHTML = `
        <label>Question ${questionCount}:</label>
        <input type="text" name="question${questionCount}" required>
        <label>Option A:</label>
        <input type="text" name="optionA${questionCount}" required>
        <label>Option B:</label>
        <input type="text" name="optionB${questionCount}" required>
        <label>Option C:</label>
        <input type="text" name="optionC${questionCount}" required>
        <label>Option D:</label>
        <input type="text" name="optionD${questionCount}" required>
        <label>Correct Answer:</label>
        <select name="correctAnswer${questionCount}" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
        <button type="button" onclick="removeQuestion(this)">Remove Question</button>
    `;
    document.getElementById('questions-container').appendChild(questionContainer);
}

function removeQuestion(button) {
    button.parentElement.remove();
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const quiz = [];
    for (let i = 1; i <= questionCount; i++) {
        const question = {
            text: formData.get(`question${i}`),
            options: {
                A: formData.get(`optionA${i}`),
                B: formData.get(`optionB${i}`),
                C: formData.get(`optionC${i}`),
                D: formData.get(`optionD${i}`),
            },
            correctAnswer: formData.get(`correctAnswer${i}`)
        };
        quiz.push(question);
    }
    quizData = quiz;
    displayQuiz();
});

function displayQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizData.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-container');
        questionElement.innerHTML = `
            <p>${index + 1}. ${question.text}</p>
            <label>
                <input type="radio" name="question${index}" value="A">
                ${question.options.A}
            </label>
            <label>
                <input type="radio" name="question${index}" value="B">
                ${question.options.B}
            </label>
            <label>
                <input type="radio" name="question${index}" value="C">
                ${question.options.C}
            </label>
            <label>
                <input type="radio" name="question${index}" value="D">
                ${question.options.D}
            </label>
        `;
        quizContainer.appendChild(questionElement);
    });
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.onclick = gradeQuiz;
    quizContainer.appendChild(submitButton);
}

function gradeQuiz() {
    let score = 0;
    quizData.forEach((question, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (userAnswer && userAnswer.value === question.correctAnswer) {
            score++;
        }
    });
    alert(`Your score is: ${score}/${quizData.length}`);
}

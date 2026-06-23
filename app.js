// Application State
let currentUser = null;
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let quizStarted = false;
let users = JSON.parse(localStorage.getItem('users')) || {};
let userStats = JSON.parse(localStorage.getItem('userStats')) || {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

// ===== Authentication Functions =====
function switchAuthMode(mode) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));

    if (mode === 'signin') {
        signInForm.classList.add('active');
        signUpForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        signUpForm.classList.add('active');
        signInForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('signUpConfirmPassword').value;

    // Validation
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    if (users[email]) {
        alert('Email already registered!');
        return;
    }

    // Register new user
    users[email] = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem('users', JSON.stringify(users));

    alert(`Welcome ${name}! Your account has been created. Please sign in.`);
    document.getElementById('signUpForm').reset();
    switchAuthMode('signin');
}

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    // For demo purposes, allow any email/password combination
    // In production, this would validate against a backend
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        document.getElementById('signInForm').reset();
        showScreen('startScreen');
        updateHeaderAuth();
        initializeUserStats();
    } else {
        alert('Invalid credentials');
    }
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateHeaderAuth();
        showScreen('startScreen');
        initializeUserStats();
    } else {
        showScreen('authScreen');
    }
}

function updateHeaderAuth() {
    const headerAuth = document.getElementById('headerAuth');
    if (currentUser) {
        headerAuth.innerHTML = `
            <span>Welcome, <strong>${currentUser.name}</strong>!</span>
            <button onclick="logout()">Sign Out</button>
        `;
    }
}

function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        userAnswers = {};
        questions = [];
        currentQuestionIndex = 0;
        quizStarted = false;
        document.getElementById('authScreen').classList.add('active');
        document.getElementById('startScreen').classList.remove('active');
        document.getElementById('quizScreen').classList.remove('active');
        document.getElementById('resultsScreen').classList.remove('active');
        document.getElementById('statsScreen').classList.remove('active');
        updateHeaderAuth();
    }
}

// ===== Screen Management =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ===== Quiz Functions =====
function startQuiz() {
    questions = getRandomQuestions();
    currentQuestionIndex = 0;
    userAnswers = {};
    quizStarted = true;
    showScreen('quizScreen');
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Update progress bar
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;

    // Update level badge
    const levelNames = ['', 'Basics', 'Data Types', 'Control', 'Arrays', 'Methods', 'OOP', 'Interview'];
    document.getElementById('levelBadge').textContent = `Level ${question.level} - ${levelNames[question.level]}`;

    // Display question
    document.getElementById('questionText').textContent = question.question;

    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const isAnswered = userAnswers[currentQuestionIndex] !== undefined;
        const selectedIndex = userAnswers[currentQuestionIndex];
        const isCorrect = index === question.correct;
        const isSelected = index === selectedIndex;

        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        if (isAnswered) {
            optionDiv.classList.add('disabled');
            if (isCorrect) optionDiv.classList.add('correct');
            if (isSelected && !isCorrect) optionDiv.classList.add('incorrect');
        }

        optionDiv.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${index}" 
                   ${isSelected ? 'checked' : ''} ${isAnswered ? 'disabled' : ''}
                   onchange="selectAnswer(${index})">
            <label for="option${index}" style="display: inline; margin: 0; font-weight: 500;">${option}</label>
        `;

        if (isAnswered) {
            optionDiv.style.cursor = 'default';
        }

        optionsContainer.appendChild(optionDiv);
    });

    // Show feedback if answered
    if (userAnswers[currentQuestionIndex] !== undefined) {
        showFeedback(question, userAnswers[currentQuestionIndex]);
    }

    // Update button states
    updateNavigationButtons();
    updateScore();
}

function selectAnswer(index) {
    const question = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = index;

    // Show feedback
    showFeedback(question, index);

    // Disable all options
    document.querySelectorAll('.option input').forEach(input => {
        input.disabled = true;
    });

    // Update button states
    updateNavigationButtons();
    updateScore();
}

function showFeedback(question, selectedIndex) {
    const isCorrect = selectedIndex === question.correct;
    const message = document.createElement('div');
    message.className = `feedback-message show ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        message.innerHTML = `✅ <strong>Correct!</strong> ${question.explanation}`;
    } else {
        const correctOption = question.options[question.correct];
        message.innerHTML = `❌ <strong>Incorrect!</strong> The correct answer is: <strong>${correctOption}</strong><br><br>${question.explanation}`;
    }

    const container = document.getElementById('optionsContainer');
    container.appendChild(message);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Finish →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

function updateScore() {
    const answered = Object.keys(userAnswers).length;
    let correct = 0;

    Object.keys(userAnswers).forEach(index => {
        if (userAnswers[index] === questions[index].correct) {
            correct++;
        }
    });

    document.getElementById('scoreDisplay').textContent = correct;
    document.getElementById('answeredCount').textContent = answered;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Please select an answer before proceeding!');
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        endQuiz();
    }
}

function skipQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert('This is the last question!');
    }
}

function endQuiz() {
    quizStarted = false;
    displayResults();
    showScreen('resultsScreen');
}

function displayResults() {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    questions.forEach((question, index) => {
        if (userAnswers[index] === undefined) {
            skipped++;
        } else if (userAnswers[index] === question.correct) {
            correct++;
        } else {
            incorrect++;
        }
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const accuracy = questions.length - skipped > 0 ? Math.round((correct / (questions.length - skipped)) * 100) : 0;

    // Update score display
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('finalScore').textContent = correct;
    document.getElementById('finalTotal').textContent = questions.length;

    // Update stats
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('skippedCount').textContent = skipped;
    document.getElementById('accuracyRate').textContent = accuracy + '%';

    // Performance message
    let message = '';
    if (percentage >= 80) {
        message = '🌟 Outstanding performance! You have excellent Java knowledge!';
    } else if (percentage >= 60) {
        message = '👍 Good job! You have solid Java knowledge.';
    } else if (percentage >= 40) {
        message = '📚 You have basic Java knowledge. Keep practicing!';
    } else {
        message = '💪 Keep studying and practicing Java. You\'ll improve!';
    }
    document.getElementById('performanceMessage').textContent = message;

    // Save quiz result
    saveQuizResult(correct, incorrect, skipped, percentage);

    // Display review
    displayReview();
}

function displayReview() {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const status = userAnswer === undefined ? 'skipped' : (userAnswer === question.correct ? 'correct' : 'incorrect');

        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${status}`;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.textContent = `Q${index + 1}: ${question.question}`;

        reviewItem.appendChild(questionDiv);

        if (userAnswer !== undefined) {
            const answerDiv = document.createElement('div');
            answerDiv.className = `review-answer ${userAnswer === question.correct ? 'correct' : 'incorrect'}`;
            answerDiv.innerHTML = `
                <strong>Your answer:</strong> ${question.options[userAnswer]} 
                ${userAnswer === question.correct ? '✅' : '❌'}
            `;
            reviewItem.appendChild(answerDiv);

            if (userAnswer !== question.correct) {
                const correctDiv = document.createElement('div');
                correctDiv.className = 'review-answer correct';
                correctDiv.innerHTML = `<strong>Correct answer:</strong> ${question.options[question.correct]} ✅`;
                reviewItem.appendChild(correctDiv);
            }
        } else {
            const skippedDiv = document.createElement('div');
            skippedDiv.className = 'review-answer';
            skippedDiv.innerHTML = `<strong>Status:</strong> Skipped`;
            reviewItem.appendChild(skippedDiv);
        }

        const explanationDiv = document.createElement('div');
        explanationDiv.style.marginTop = '10px';
        explanationDiv.style.padding = '10px';
        explanationDiv.style.background = '#f0f0f0';
        explanationDiv.style.borderRadius = '4px';
        explanationDiv.style.fontSize = '0.95rem';
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
        reviewItem.appendChild(explanationDiv);

        reviewContainer.appendChild(reviewItem);
    });
}

function saveQuizResult(correct, incorrect, skipped, percentage) {
    if (!currentUser) return;

    const email = currentUser.email;
    if (!userStats[email]) {
        userStats[email] = [];
    }

    userStats[email].push({
        date: new Date().toISOString(),
        correct: correct,
        incorrect: incorrect,
        skipped: skipped,
        percentage: percentage,
        totalQuestions: questions.length
    });

    localStorage.setItem('userStats', JSON.stringify(userStats));
}

function restartQuiz() {
    startQuiz();
}

function goHome() {
    userAnswers = {};
    questions = [];
    currentQuestionIndex = 0;
    quizStarted = false;
    showScreen('startScreen');
}

// ===== Stats Functions =====
function initializeUserStats() {
    if (!currentUser) return;

    const email = currentUser.email;
    if (!userStats[email]) {
        userStats[email] = [];
    }
}

function viewStats() {
    if (!currentUser) return;

    const email = currentUser.email;
    const stats = userStats[email] || [];

    const statsContent = document.getElementById('statsContent');
    statsContent.innerHTML = '';

    if (stats.length === 0) {
        statsContent.innerHTML = '<div class="no-stats">No quiz results yet. Start a quiz to see your stats!</div>';
        showScreen('statsScreen');
        return;
    }

    // Calculate overall stats
    let totalAttempts = stats.length;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalSkipped = 0;
    let avgPercentage = 0;

    stats.forEach(stat => {
        totalCorrect += stat.correct;
        totalIncorrect += stat.incorrect;
        totalSkipped += stat.skipped;
        avgPercentage += stat.percentage;
    });

    avgPercentage = Math.round(avgPercentage / totalAttempts);

    const overallDiv = document.createElement('div');
    overallDiv.style.background = '#f0f0f0';
    overallDiv.style.padding = '20px';
    overallDiv.style.borderRadius = '8px';
    overallDiv.style.marginBottom = '30px';
    overallDiv.innerHTML = `
        <h3>Overall Statistics</h3>
        <div class="stat-row">
            <span>Total Attempts:</span>
            <strong>${totalAttempts}</strong>
        </div>
        <div class="stat-row">
            <span>Total Correct:</span>
            <strong>${totalCorrect}</strong>
        </div>
        <div class="stat-row">
            <span>Average Score:</span>
            <strong>${avgPercentage}%</strong>
        </div>
    `;
    statsContent.appendChild(overallDiv);

    // Recent attempts
    const recentDiv = document.createElement('div');
    recentDiv.innerHTML = '<h3>Recent Attempts</h3>';
    statsContent.appendChild(recentDiv);

    stats.slice(-5).reverse().forEach((stat, index) => {
        const date = new Date(stat.date);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

        const attemptDiv = document.createElement('div');
        attemptDiv.style.background = '#f9f9f9';
        attemptDiv.style.padding = '15px';
        attemptDiv.style.borderRadius = '8px';
        attemptDiv.style.marginBottom = '10px';
        attemptDiv.style.borderLeft = stat.percentage >= 70 ? '4px solid #28a745' : '4px solid #ffc107';
        attemptDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>Attempt ${totalAttempts - index}</strong><br>
                    <small>${dateStr}</small>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #007bff;">${stat.percentage}%</div>
                    <small>${stat.correct}/${stat.totalQuestions} correct</small>
                </div>
            </div>
        `;
        statsContent.appendChild(attemptDiv);
    });

    showScreen('statsScreen');
}
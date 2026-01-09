// ============================================
// FINCH-LIKE WELLNESS PET SIMULATOR
// Mental Health Focus with Coping Techniques
// ============================================

// ============================================
// PET DATA & STATE
// ============================================

let petStats = {
    happiness: 50,
    energy: 50,
    health: 50,
    hunger: 50,
    cleanliness: 50
};

let streaks = {
    tasks: 0,
    friendship: 0,
    lastTaskDate: new Date().toDateString(),
    lastFriendshipDate: new Date().toDateString()
};

let currentPet = '🦦';

// Daily tasks tracking
let dailyTasks = {
    groom: { completed: false, timeWindow: { start: 7, end: 12 }, missed: false },
    exercise: { completed: false, timeWindow: { start: 13, end: 18 }, missed: false },
    meditate: { completed: false, timeWindow: { start: 19, end: 23 }, missed: false }
};

let lastResetDate = new Date().toDateString();

// Wellness tips database
const wellnessTips = [
    "Remember: Progress over perfection. You're doing great! 💝",
    "Small steps lead to big changes. Celebrate yourself today! ⭐",
    "Your mental health matters. Take time to care for yourself. 🌿",
    "It's okay to not be okay. That's part of being human. 💙",
    "You are stronger than you think. Keep going! 💪",
    "Practice self-compassion today. You deserve kindness. 🫂",
    "Taking breaks is productive, not lazy. Rest when you need to. 😴",
    "Your feelings are valid. Listen to what you need. 🎧"
];

// ============================================
// DOM ELEMENTS
// ============================================

const happinessBar = document.getElementById('happinessBar');
const happinessText = document.getElementById('happinessText');
const energyBar = document.getElementById('energyBar');
const energyText = document.getElementById('energyText');
const healthBar = document.getElementById('healthBar');
const healthText = document.getElementById('healthText');
const hungerBar = document.getElementById('hungerBar');
const hungerText = document.getElementById('hungerText');
const cleanlinessBar = document.getElementById('cleanlinessBar');
const cleanlinessText = document.getElementById('cleanlinessText');
const petEmoji = document.getElementById('petEmoji');
const petMood = document.getElementById('petMood');
const petNameDisplay = document.getElementById('petNameDisplay');
const petNameInput = document.getElementById('petName');
const petChoices = document.querySelectorAll('.pet-choice');
const statusMessage = document.getElementById('statusMessage');
const wellnessTip = document.getElementById('wellnessTip');
const taskStreak = document.getElementById('taskStreak');
const friendshipStreak = document.getElementById('friendshipStreak');

// Buttons
const playBtn = document.getElementById('playBtn');
const healthyFoodBtn = document.getElementById('healthyFoodBtn');
const snackBtn = document.getElementById('snackBtn');
const breatheBtn = document.getElementById('breatheBtn');
const journalBtn = document.getElementById('journalBtn');
const musicBtn = document.getElementById('musicBtn');
const gratitudeBtn = document.getElementById('gratitudeBtn');
const socialBtn = document.getElementById('socialBtn');
const taskButtons = document.querySelectorAll('.task-button');

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function updateDisplay() {
    // Update all stat bars and text
    const stats = [
        { bar: happinessBar, text: happinessText, value: petStats.happiness },
        { bar: energyBar, text: energyText, value: petStats.energy },
        { bar: healthBar, text: healthText, value: petStats.health },
        { bar: hungerBar, text: hungerText, value: petStats.hunger },
        { bar: cleanlinessBar, text: cleanlinessText, value: petStats.cleanliness }
    ];

    stats.forEach(stat => {
        stat.bar.style.width = stat.value + '%';
        stat.text.textContent = Math.round(stat.value);
    });

    updatePetMood();
    saveData();
}

function updatePetMood() {
    const avgStats = (petStats.happiness + petStats.energy + petStats.health) / 3;
    let mood = '😢';
    let moodText = 'Needs care';

    if (avgStats > 80) {
        mood = '😄';
        moodText = 'Very Happy ✨';
    } else if (avgStats > 60) {
        mood = '🙂';
        moodText = 'Feeling Good 😊';
    } else if (avgStats > 40) {
        mood = '😐';
        moodText = 'Could be better';
    } else if (avgStats > 20) {
        mood = '😔';
        moodText = 'Needs attention';
    }

    petMood.textContent = moodText;
}

function updateStreakDisplay() {
    taskStreak.textContent = streaks.tasks;
    friendshipStreak.textContent = streaks.friendship;
}

function showMessage(text) {
    statusMessage.textContent = text;
    statusMessage.classList.add('show');
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 3000);
}

function showWellnessTip() {
    const tip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
    wellnessTip.textContent = '💡 ' + tip;
}

// ============================================
// COPING TECHNIQUE ACTIVITIES
// ============================================

function breathingExercise() {
    const happinessIncrease = 20;
    const energyIncrease = 15;
    const healthIncrease = 25;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.energy = Math.min(petStats.energy + energyIncrease, 100);
    petStats.health = Math.min(petStats.health + healthIncrease, 100);

    updateDisplay();
    showMessage('Deep breaths! 🫁 You & your pet are calming down...');
    showWellnessTip();
}

function journaling() {
    const happinessIncrease = 15;
    const healthIncrease = 30;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.health = Math.min(petStats.health + healthIncrease, 100);

    updateDisplay();
    showMessage('Journaling helps! 📔 Emotions processed. You\'re brave. 💙');
    showWellnessTip();
}

function musicTime() {
    const happinessIncrease = 25;
    const energyIncrease = 20;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.energy = Math.min(petStats.energy + energyIncrease, 100);

    updateDisplay();
    showMessage('Music heals! 🎵 Both of you are feeling better.');
    showWellnessTip();
}

function gratitudePractice() {
    const happinessIncrease = 20;
    const healthIncrease = 20;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.health = Math.min(petStats.health + healthIncrease, 100);

    updateDisplay();
    showMessage('Gratitude is powerful! 🙏 Both of you feel renewed.');
    showWellnessTip();
}

function socialInteraction() {
    const happinessIncrease = 30;
    const energyDecrease = 10;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.energy = Math.max(petStats.energy - energyDecrease, 0);

    // Increase friendship streak
    const today = new Date().toDateString();
    if (today !== streaks.lastFriendshipDate) {
        streaks.friendship += 1;
        streaks.lastFriendshipDate = today;
        updateStreakDisplay();
    }

    updateDisplay();
    showMessage('Connection matters! 👫 You both feel closer.');
    showWellnessTip();
}

// ============================================
// FOOD & ACTIVITY
// ============================================

function healthyFood() {
    const hungerDecrease = 30;
    const healthIncrease = 25;
    const energyIncrease = 10;

    petStats.hunger = Math.max(petStats.hunger - hungerDecrease, 0);
    petStats.health = Math.min(petStats.health + healthIncrease, 100);
    petStats.energy = Math.min(petStats.energy + energyIncrease, 100);

    updateDisplay();
    showMessage('Healthy choice! 🥗 Your pet is nourished.');
}

function snackTime() {
    const hungerDecrease = 20;
    const healthDecrease = 5;
    const happinessIncrease = 10;

    petStats.hunger = Math.max(petStats.hunger - hungerDecrease, 0);
    petStats.health = Math.max(petStats.health - healthDecrease, 0);
    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);

    updateDisplay();
    showMessage('Yummy! 🍎 But moderation is key.');
}

function playTogether() {
    const happinessIncrease = 20;
    const energyDecrease = 20;
    const healthIncrease = 10;

    petStats.happiness = Math.min(petStats.happiness + happinessIncrease, 100);
    petStats.energy = Math.max(petStats.energy - energyDecrease, 0);
    petStats.health = Math.min(petStats.health + healthIncrease, 100);

    updateDisplay();
    showMessage('Fun time! 🎮 That was great bonding.');
}

// ============================================
// DAILY TASKS
// ============================================

function completeTask(taskKey) {
    const task = dailyTasks[taskKey];
    const now = new Date();
    const currentHour = now.getHours();
    const timeWindow = task.timeWindow;

    if (currentHour < timeWindow.start || currentHour > timeWindow.end) {
        showMessage('This task is not available right now!');
        return;
    }

    if (task.completed) {
        showMessage('Already completed!');
        return;
    }

    task.completed = true;

    // Rewards vary by task type
    const rewards = {
        groom: { happiness: 10, cleanliness: 30, health: 15 },
        exercise: { happiness: 15, energy: -5, health: 25 },
        meditate: { happiness: 20, health: 20, energy: 10 }
    };

    const reward = rewards[taskKey];
    Object.keys(reward).forEach(stat => {
        if (stat === 'energy') {
            petStats[stat] = Math.max(petStats[stat] + reward[stat], 0);
        } else {
            petStats[stat] = Math.min(petStats[stat] + reward[stat], 100);
        }
    });

    // Update task streak
    const today = new Date().toDateString();
    if (today !== streaks.lastTaskDate) {
        streaks.tasks += 1;
        streaks.lastTaskDate = today;
        updateStreakDisplay();
    }

    updateDisplay();
    updateTaskDisplay();
    showMessage(`Awesome! ${taskKey} completed! 🌟`);
    showWellnessTip();
}

// ============================================
// STAT DECAY (Slower - Mental Health Focus)
// ============================================

// Slower decay - stats last longer, less stressful
setInterval(() => {
    petStats.happiness = Math.max(petStats.happiness - 1, 0);
    petStats.energy = Math.max(petStats.energy - 2, 0);
    petStats.health = Math.max(petStats.health - 1, 0);
    petStats.hunger = Math.min(petStats.hunger + 2, 100); // Hunger increases (gets hungry)
    petStats.cleanliness = Math.max(petStats.cleanliness - 0.5, 0);
    
    updateDisplay();
}, 15000); // Every 15 seconds (slower than original 8 seconds)

// ============================================
// TASK MONITORING
// ============================================

function checkDailyReset() {
    const today = new Date().toDateString();
    if (today !== lastResetDate) {
        dailyTasks.groom.completed = false;
        dailyTasks.groom.missed = false;
        dailyTasks.exercise.completed = false;
        dailyTasks.exercise.missed = false;
        dailyTasks.meditate.completed = false;
        dailyTasks.meditate.missed = false;
        lastResetDate = today;
        showMessage('New day! New opportunities to grow 🌅');
    }
}

function updateTaskDisplay() {
    const now = new Date();
    const currentHour = now.getHours();

    Object.keys(dailyTasks).forEach(taskKey => {
        const task = dailyTasks[taskKey];
        const taskCard = document.getElementById(`task-${taskKey}`);
        const taskButton = taskCard.querySelector('.task-button');
        const timeWindow = task.timeWindow;

        const isTimeWindow = currentHour >= timeWindow.start && currentHour <= timeWindow.end;

        if (task.completed) {
            taskCard.classList.add('completed');
            taskButton.disabled = true;
            taskButton.textContent = '✓ Done';
        } else if (task.missed) {
            taskCard.classList.add('missed');
            taskButton.disabled = true;
            taskButton.textContent = '✗ Missed';
        } else if (isTimeWindow) {
            taskCard.classList.remove('completed', 'missed');
            taskButton.disabled = false;
            taskButton.textContent = 'Complete';
        } else {
            taskCard.classList.remove('completed', 'missed');
            if (currentHour > timeWindow.end && !task.completed) {
                task.missed = true;
                taskCard.classList.add('missed');
                taskButton.disabled = true;
                taskButton.textContent = '✗ Missed';
                petStats.happiness = Math.max(petStats.happiness - 5, 0);
                updateDisplay();
            } else {
                taskButton.disabled = true;
                taskButton.textContent = 'Not Yet';
            }
        }
    });
}

setInterval(() => {
    checkDailyReset();
    updateTaskDisplay();
}, 60000);

// ============================================
// PET CUSTOMIZATION
// ============================================

petChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        petChoices.forEach(btn => btn.classList.remove('active'));
        choice.classList.add('active');
        currentPet = choice.getAttribute('data-pet');
        petEmoji.textContent = currentPet;
        saveData();
    });
});

petChoices[0].classList.add('active');

// ============================================
// PET NAME
// ============================================

petNameInput.addEventListener('input', () => {
    let name = petNameInput.value.trim();
    if (name === '') {
        name = 'Buddy';
    }
    petNameDisplay.textContent = name;
    saveData();
});

// ============================================
// EVENT LISTENERS
// ============================================

playBtn.addEventListener('click', playTogether);
healthyFoodBtn.addEventListener('click', healthyFood);
snackBtn.addEventListener('click', snackTime);
breatheBtn.addEventListener('click', breathingExercise);
journalBtn.addEventListener('click', journaling);
musicBtn.addEventListener('click', musicTime);
gratitudeBtn.addEventListener('click', gratitudePractice);
socialBtn.addEventListener('click', socialInteraction);

taskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const taskKey = btn.getAttribute('data-task');
        completeTask(taskKey);
    });
});

// ============================================
// LOCALSTORAGE PERSISTENCE
// ============================================

function saveData() {
    const data = {
        petStats,
        streaks,
        currentPet,
        dailyTasks,
        lastResetDate,
        petName: petNameInput.value
    };
    localStorage.setItem('petSimulatorData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('petSimulatorData');
    if (saved) {
        const data = JSON.parse(saved);
        petStats = { ...petStats, ...data.petStats };
        streaks = { ...streaks, ...data.streaks };
        currentPet = data.currentPet || '🦦';
        dailyTasks = data.dailyTasks || dailyTasks;
        lastResetDate = data.lastResetDate || new Date().toDateString();
        
        if (data.petName) {
            petNameInput.value = data.petName;
            petNameDisplay.textContent = data.petName;
        }

        // Set pet emoji
        petEmoji.textContent = currentPet;
        petChoices.forEach((choice, i) => {
            choice.classList.remove('active');
            if (choice.getAttribute('data-pet') === currentPet) {
                choice.classList.add('active');
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

loadData();
updateDisplay();
updateStreakDisplay();
updateTaskDisplay();
checkDailyReset();
showWellnessTip();

console.log('🌿 Wellness Pet Simulator Started - Mental Health Focus 💙');

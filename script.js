// ============================================
// PET DATA & STATE
// ============================================

// Initialize pet stats (0-100 range)
let petStats = {
    happiness: 50,
    energy: 50
};

// Current pet type
let currentPet = '🦦';

// Daily tasks tracking
let dailyTasks = {
    groom: { completed: false, timeWindow: { start: 7, end: 12 }, missed: false },
    exercise: { completed: false, timeWindow: { start: 13, end: 18 }, missed: false },
    meditate: { completed: false, timeWindow: { start: 19, end: 23 }, missed: false }
};

// Track the last reset date to reset tasks daily
let lastResetDate = new Date().toDateString();

// Get HTML elements
const happinessBar = document.getElementById('happinessBar');
const happinessText = document.getElementById('happinessText');
const energyBar = document.getElementById('energyBar');
const energyText = document.getElementById('energyText');
const petEmoji = document.getElementById('petEmoji');
const petNameDisplay = document.getElementById('petNameDisplay');
const petNameInput = document.getElementById('petName');
const playBtn = document.getElementById('playBtn');
const feedBtn = document.getElementById('feedBtn');
const restBtn = document.getElementById('restBtn');
const petChoices = document.querySelectorAll('.pet-choice');
const statusMessage = document.getElementById('statusMessage');
const taskButtons = document.querySelectorAll('.task-button');

// ============================================
// DISPLAY FUNCTIONS
// ============================================

// Update all visual elements on screen
function updateDisplay() {
    // Update happiness bar and text
    happinessBar.style.width = petStats.happiness + '%';
    happinessText.textContent = petStats.happiness;

    // Update energy bar and text
    energyBar.style.width = petStats.energy + '%';
    energyText.textContent = petStats.energy;

    // Change pet emoji based on happiness level
    if (petStats.happiness > 75) {
        petEmoji.textContent = currentPet;
    } else if (petStats.happiness > 50) {
        petEmoji.textContent = currentPet;
    } else if (petStats.happiness > 25) {
        petEmoji.textContent = currentPet;
    } else {
        petEmoji.textContent = '😢';
    }
}

// Update task display visuals
function updateTaskDisplay() {
    const now = new Date();
    const currentHour = now.getHours();

    Object.keys(dailyTasks).forEach(taskKey => {
        const task = dailyTasks[taskKey];
        const taskCard = document.getElementById(`task-${taskKey}`);
        const taskButton = taskCard.querySelector('.task-button');
        const timeWindow = task.timeWindow;

        // Check if task is within its time window
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
                petStats.happiness = Math.max(petStats.happiness - 10, 0);
                updateDisplay();
            } else {
                taskButton.disabled = true;
                taskButton.textContent = 'Not Yet';
            }
        }
    });
}

// Show a temporary message to the player
function showMessage(text) {
    statusMessage.textContent = text;
    statusMessage.classList.add('show');
    
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 3000);
}

// Reset daily tasks at midnight
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
        showMessage('New day! New tasks available 🌅');
    }
}

// ============================================
// TASK ACTIONS
// ============================================

// Complete a daily task
function completeTask(taskKey) {
    const task = dailyTasks[taskKey];
    const now = new Date();
    const currentHour = now.getHours();
    const timeWindow = task.timeWindow;

    // Check if within time window
    if (currentHour < timeWindow.start || currentHour > timeWindow.end) {
        showMessage('This task is not available right now!');
        return;
    }

    if (task.completed) {
        showMessage('Already completed!');
        return;
    }

    // Mark as completed
    task.completed = true;

    // Reward stats
    petStats.happiness = Math.min(petStats.happiness + 15, 100);
    petStats.energy = Math.max(petStats.energy - 8, 0);

    updateDisplay();
    updateTaskDisplay();
    showMessage(`Great! ${taskKey} completed! ⭐`);
}

// ============================================
// MAIN ACTIONS
// ============================================

// Play with the pet
function play() {
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.energy = Math.max(petStats.energy - 15, 0);
    updateDisplay();
    showMessage('Your pet had fun! 🎉');
}

// Feed the pet
function feed() {
    petStats.happiness = Math.min(petStats.happiness + 10, 100);
    petStats.energy = Math.min(petStats.energy + 25, 100);
    updateDisplay();
    showMessage('Your pet is satisfied! 😋');
}

// Let pet rest
function rest() {
    petStats.energy = Math.min(petStats.energy + 35, 100);
    petStats.happiness = Math.max(petStats.happiness - 5, 0);
    updateDisplay();
    showMessage('Your pet feels refreshed! 💤');
}

// ============================================
// STAT DECAY (Over Time)
// ============================================

setInterval(() => {
    petStats.happiness = Math.max(petStats.happiness - 3, 0);
    petStats.energy = Math.max(petStats.energy - 5, 0);
    updateDisplay();
}, 8000);

// ============================================
// TASK MONITORING
// ============================================

// Check for missed tasks every minute
setInterval(() => {
    checkDailyReset();
    updateTaskDisplay();
}, 60000);

// Initial task display update
updateTaskDisplay();
// Check every 10 seconds for real-time updates
setInterval(updateTaskDisplay, 10000);

// ============================================
// PET CUSTOMIZATION
// ============================================

petChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        petChoices.forEach(btn => btn.classList.remove('active'));
        choice.classList.add('active');
        currentPet = choice.getAttribute('data-pet');
        petEmoji.textContent = currentPet;
    });
});

petChoices[0].classList.add('active');

// ============================================
// PET NAME CUSTOMIZATION
// ============================================

petNameInput.addEventListener('input', () => {
    let name = petNameInput.value.trim();
    if (name === '') {
        name = 'Buddy';
    }
    petNameDisplay.textContent = name;
});

// ============================================
// EVENT LISTENERS
// ============================================

playBtn.addEventListener('click', play);
feedBtn.addEventListener('click', feed);
restBtn.addEventListener('click', rest);

taskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const taskKey = btn.getAttribute('data-task');
        completeTask(taskKey);
    });
});

// ============================================
// INITIALIZATION
// ============================================

checkDailyReset();
updateDisplay();
console.log('Pet simulator started with daily tasks!', petStats);

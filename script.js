// ============================================
// FINCH-LIKE WELLNESS PET SIMULATOR
// Mental Health Focus with Real-World Integration
// ============================================

// ============================================
// PET DATA & STATE
// ============================================

let petStats = {
    happiness: 100,
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

let points = 0; // User's wellness points

let currentPet = '🦦';

// Daily tasks tracking
let dailyTasks = {
    groom: { completed: false, timeWindow: { start: 7, end: 12 }, missed: false },
    exercise: { completed: false, timeWindow: { start: 13, end: 18 }, missed: false },
    meditate: { completed: false, timeWindow: { start: 19, end: 23 }, missed: false }
};

let lastResetDate = new Date().toDateString();

// Gratitude journal storage
let gratitudeEntries = [];

// Activity log storage
let activityLog = [];

// Achievements system
const achievements = {
    firstSteps: { name: 'First Steps', icon: '👣', description: 'Earn your first 10 points', points: 10, unlocked: false },
    pointHunter10: { name: 'Point Hunter', icon: '⭐', description: 'Reach 50 points', points: 50, unlocked: false },
    pointHunter50: { name: 'Point Master', icon: '💫', description: 'Reach 200 points', points: 200, unlocked: false },
    wellness: { name: 'Wellness Warrior', icon: '💪', description: 'Log 5 wellness activities', count: 0, target: 5, unlocked: false },
    gratefulHeart: { name: 'Grateful Heart', icon: '🙏', description: 'Write 3 gratitude entries', count: 0, target: 3, unlocked: false },
    snackMaster: { name: 'Snack Logger', icon: '🍎', description: 'Log 5 snacks', count: 0, target: 5, unlocked: false },
    taskChampion: { name: 'Task Champion', icon: '✨', description: 'Complete 10 daily tasks', count: 0, target: 10, unlocked: false },
    streakKing: { name: 'Streak King', icon: '🔥', description: 'Reach a 7-day task streak', streak: 0, target: 7, unlocked: false },
    friendshipBuilder: { name: 'Friendship Builder', icon: '👫', description: 'Reach a 5-day friendship streak', streak: 0, target: 5, unlocked: false },
    perfectBalance: { name: 'Perfect Balance', icon: '⚖️', description: 'Keep all stats above 60', unlocked: false },
    healthyChoices: { name: 'Healthy Choices', icon: '🥗', description: 'Use healthy food 5 times', count: 0, target: 5, unlocked: false },
    mindful: { name: 'Mindful Mind', icon: '🧘', description: 'Meditate or breathe 5 times', count: 0, target: 5, unlocked: false }
};

// Track activity counts for achievements
let activityCounts = {
    wellnessLogged: 0,
    snacksLogged: 0,
    tasksCompleted: 0,
    healthyFoodsUsed: 0,
    mindfulActivities: 0,
    gratitudeLogged: 0
};

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
const pointsDisplay = document.getElementById('pointsDisplay');

// Input fields
const snackInput = document.getElementById('snackInput');
const activityInput = document.getElementById('activityInput');
const gratitudeInput = document.getElementById('gratitudeInput');
const activityLogInput = document.getElementById('activityLogInput');
const activityLogDisplay = document.getElementById('activityLogDisplay');

// Buttons
const logSnackBtn = document.getElementById('logSnackBtn');
const logActivityBtn = document.getElementById('logActivityBtn');
const logGratitudeBtn = document.getElementById('logGratitudeBtn');
const logActivityLogBtn = document.getElementById('logActivityLogBtn');
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
// ANIMATION HELPER
// ============================================

function animatePet(animationName, duration = 600) {
    petEmoji.classList.remove('eating', 'exercising', 'meditating', 'celebrating', 'dancing');
    petEmoji.classList.add(animationName);
    
    setTimeout(() => {
        petEmoji.classList.remove(animationName);
    }, duration);
}

// Achievement elements
const achievementsBtn = document.getElementById('achievementsBtn');
const achievementsModal = document.getElementById('achievementsModal');
const achievementsGrid = document.getElementById('achievementsGrid');
const modalClose = document.querySelector('.modal-close');

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function updateDisplay() {
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
    pointsDisplay.textContent = points;
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
// ACHIEVEMENTS SYSTEM
// ============================================

function checkAchievements() {
    // First Steps
    if (points >= 10 && !achievements.firstSteps.unlocked) {
        unlockAchievement('firstSteps');
    }

    // Point Hunter (50 points)
    if (points >= 50 && !achievements.pointHunter10.unlocked) {
        unlockAchievement('pointHunter10');
    }

    // Point Master (200 points)
    if (points >= 200 && !achievements.pointHunter50.unlocked) {
        unlockAchievement('pointHunter50');
    }

    // Wellness Warrior (5 wellness activities)
    if (activityCounts.wellnessLogged >= 5 && !achievements.wellness.unlocked) {
        unlockAchievement('wellness');
    }

    // Grateful Heart (3 gratitude entries)
    if (gratitudeEntries.length >= 3 && !achievements.gratefulHeart.unlocked) {
        unlockAchievement('gratefulHeart');
    }

    // Snack Logger (5 snacks)
    if (activityCounts.snacksLogged >= 5 && !achievements.snackMaster.unlocked) {
        unlockAchievement('snackMaster');
    }

    // Task Champion (10 tasks completed)
    if (activityCounts.tasksCompleted >= 10 && !achievements.taskChampion.unlocked) {
        unlockAchievement('taskChampion');
    }

    // Streak King (7-day task streak)
    if (streaks.tasks >= 7 && !achievements.streakKing.unlocked) {
        unlockAchievement('streakKing');
    }

    // Friendship Builder (5-day friendship streak)
    if (streaks.friendship >= 5 && !achievements.friendshipBuilder.unlocked) {
        unlockAchievement('friendshipBuilder');
    }

    // Perfect Balance (all stats above 60)
    if (petStats.happiness >= 60 && petStats.energy >= 60 && petStats.health >= 60 && 
        petStats.hunger <= 60 && petStats.cleanliness >= 60 && !achievements.perfectBalance.unlocked) {
        unlockAchievement('perfectBalance');
    }

    // Healthy Choices (5 healthy foods)
    if (activityCounts.healthyFoodsUsed >= 5 && !achievements.healthyChoices.unlocked) {
        unlockAchievement('healthyChoices');
    }

    // Mindful Mind (5 mindful activities)
    if (activityCounts.mindfulActivities >= 5 && !achievements.mindful.unlocked) {
        unlockAchievement('mindful');
    }
}

function unlockAchievement(key) {
    if (achievements[key] && !achievements[key].unlocked) {
        achievements[key].unlocked = true;
        showAchievementNotification(achievements[key]);
        animatePet('celebrating', 1000);
        saveData();
    }
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div style="font-weight: bold; font-size: 18px;">${achievement.icon} Achievement Unlocked!</div>
        <div style="font-size: 14px; margin-top: 5px;">${achievement.name}</div>
        <div style="font-size: 12px; margin-top: 3px; opacity: 0.8;">${achievement.description}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function renderAchievements() {
    achievementsGrid.innerHTML = '';
    
    Object.keys(achievements).forEach(key => {
        const achievement = achievements[key];
        const badge = document.createElement('div');
        badge.className = `achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        badge.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        achievementsGrid.appendChild(badge);
    });
}

// ============================================
// REAL-WORLD ACTIVITY LOGGING
// ============================================

function logSnack() {
    const snack = snackInput.value.trim();
    
    if (!snack) {
        showMessage('Tell me what you ate! 🍴');
        return;
    }

    // Feed the pet with snack emoji
    petStats.hunger = Math.max(petStats.hunger - 25, 0);
    petStats.happiness = Math.min(petStats.happiness + 12, 100);
    points += 10;
    activityCounts.snacksLogged += 1;

    animatePet('eating', 600);
    updateDisplay();
    checkAchievements();
    showMessage(`Yum! Your pet enjoyed that ${snack}! 😋 +10 points`);
    
    snackInput.value = '';
}

function logWellnessActivity() {
    const activity = activityInput.value.trim();
    
    if (!activity) {
        showMessage('What activity did you do? 💪');
        return;
    }

    // Determine activity rewards
    let rewards = { happiness: 15, energy: -8, health: 20 };
    
    // Special bonus for certain activities
    if (activity.toLowerCase().includes('run') || activity.toLowerCase().includes('walk')) {
        rewards.health += 10;
        rewards.energy -= 5;
    }
    if (activity.toLowerCase().includes('yoga') || activity.toLowerCase().includes('stretch')) {
        rewards.health += 15;
        rewards.energy += 5;
    }

    Object.keys(rewards).forEach(stat => {
        if (stat === 'energy') {
            petStats[stat] = Math.max(petStats[stat] + rewards[stat], 0);
        } else {
            petStats[stat] = Math.min(petStats[stat] + rewards[stat], 100);
        }
    });

    points += 15;
    activityCounts.wellnessLogged += 1;

    animatePet('exercising', 800);
    updateDisplay();
    checkAchievements();
    showMessage(`Awesome! You did ${activity}! Your pet mimicked you! 💪 +15 points`);
    showWellnessTip();
    
    activityInput.value = '';
}

function logGratitude() {
    const gratitudeText = gratitudeInput.value.trim();
    
    if (!gratitudeText) {
        showMessage('Share what you\'re grateful for! 🙏');
        return;
    }

    // Store gratitude entry
    gratitudeEntries.push({
        text: gratitudeText,
        date: new Date().toLocaleDateString()
    });

    // Reward the user
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.health = Math.min(petStats.health + 15, 100);
    points += 20;
    activityCounts.gratitudeLogged += 1;

    animatePet('celebrating', 1000);
    updateDisplay();
    checkAchievements();
    showMessage(`What a beautiful thought! ✨ Your pet celebrates with you! 🎉 +20 points`);
    showWellnessTip();
    
    gratitudeInput.value = '';
}

function logActivityLog() {
    const activityText = activityLogInput.value.trim();
    
    if (!activityText) {
        showMessage('Tell me what you\'ve been up to! 📝');
        return;
    }

    // Store activity entry with timestamp
    const now = new Date();
    activityLog.push({
        text: activityText,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Reward the user
    petStats.happiness = Math.min(petStats.happiness + 10, 100);
    points += 5;

    updateDisplay();
    displayActivityLog();
    showMessage(`Great job logging your activities! 📝 +5 points`);
    showWellnessTip();
    
    activityLogInput.value = '';
}

function displayActivityLog() {
    if (activityLog.length === 0) {
        activityLogDisplay.innerHTML = '<p style="color: #999; font-size: 14px;">No activities logged yet. Start logging! 🚀</p>';
        return;
    }

    // Display the most recent 10 activities
    const recentActivities = activityLog.slice(-10).reverse();
    let html = '';
    
    recentActivities.forEach((activity, index) => {
        html += `<div style="background: #f5f5f5; padding: 10px; margin: 8px 0; border-radius: 8px; text-align: left; border-left: 4px solid #667eea;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <span style="font-weight: 500; color: #333;">${activity.text}</span>
                <button onclick="removeActivityLog(${activityLog.length - 1 - index})" style="background: #ff6b6b; color: white; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">✕</button>
            </div>
            <div style="font-size: 12px; color: #999; margin-top: 4px;">${activity.time} - ${activity.date}</div>
        </div>`;
    });
    
    activityLogDisplay.innerHTML = html;
}

function removeActivityLog(index) {
    activityLog.splice(index, 1);
    saveData();
    displayActivityLog();
    showMessage('Activity removed! 🗑️');
}

// ============================================
// COPING TECHNIQUE ACTIVITIES
// ============================================

function breathingExercise() {
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.energy = Math.min(petStats.energy + 15, 100);
    petStats.health = Math.min(petStats.health + 25, 100);
    points += 15;
    activityCounts.mindfulActivities += 1;

    animatePet('meditating', 2000);
    updateDisplay();
    checkAchievements();
    showMessage('Deep breaths! 🫁 You & your pet are calming down...');
    showWellnessTip();
}

function journaling() {
    petStats.happiness = Math.min(petStats.happiness + 15, 100);
    petStats.health = Math.min(petStats.health + 30, 100);
    points += 15;

    animatePet('meditating', 1500);
    updateDisplay();
    showMessage('Journaling helps! 📔 Emotions processed. You\'re brave. 💙');
    showWellnessTip();
}

function musicTime() {
    petStats.happiness = Math.min(petStats.happiness + 25, 100);
    petStats.energy = Math.min(petStats.energy + 20, 100);
    points += 15;
    activityCounts.mindfulActivities += 1;

    animatePet('dancing', 800);
    updateDisplay();
    checkAchievements();
    showMessage('Music heals! 🎵 Both of you are feeling better.');
    showWellnessTip();
}

function gratitudePractice() {
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.health = Math.min(petStats.health + 20, 100);
    points += 15;

    animatePet('celebrating', 1000);
    updateDisplay();
    showMessage('Gratitude is powerful! 🙏 Both of you feel renewed.');
    showWellnessTip();
}

function socialInteraction() {
    petStats.happiness = Math.min(petStats.happiness + 30, 100);
    petStats.energy = Math.max(petStats.energy - 10, 0);
    points += 20;

    const today = new Date().toDateString();
    if (today !== streaks.lastFriendshipDate) {
        streaks.friendship += 1;
        streaks.lastFriendshipDate = today;
        updateStreakDisplay();
    }

    animatePet('celebrating', 1000);
    updateDisplay();
    showMessage('Connection matters! 👫 You both feel closer.');
    showWellnessTip();
}

// ============================================
// FOOD & ACTIVITY
// ============================================

function healthyFood() {
    petStats.hunger = Math.max(petStats.hunger - 30, 0);
    petStats.health = Math.min(petStats.health + 25, 100);
    petStats.energy = Math.min(petStats.energy + 10, 100);
    points += 12;
    activityCounts.healthyFoodsUsed += 1;

    animatePet('eating', 600);
    updateDisplay();
    checkAchievements();
    showMessage('Healthy choice! 🥗 Your pet is nourished. +12 points');
}

function snackTime() {
    petStats.hunger = Math.max(petStats.hunger - 20, 0);
    petStats.health = Math.max(petStats.health - 5, 0);
    petStats.happiness = Math.min(petStats.happiness + 10, 100);
    points += 8;
    activityCounts.snacksLogged += 1;

    animatePet('eating', 600);
    updateDisplay();
    checkAchievements();
    showMessage('Yummy! 🍎 But moderation is key. +8 points');
}

function playTogether() {
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.energy = Math.max(petStats.energy - 20, 0);
    petStats.health = Math.min(petStats.health + 10, 100);
    points += 12;

    animatePet('dancing', 800);
    updateDisplay();
    checkAchievements();
    showMessage('Fun time! 🎮 That was great bonding. +12 points');
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

    points += 25;
    activityCounts.tasksCompleted += 1;

    const today = new Date().toDateString();
    if (today !== streaks.lastTaskDate) {
        streaks.tasks += 1;
        streaks.lastTaskDate = today;
        updateStreakDisplay();
    }

    animatePet('celebrating', 1000);
    updateDisplay();
    updateTaskDisplay();
    checkAchievements();
    showMessage(`Awesome! ${taskKey} completed! 🌟 +25 points`);
    showWellnessTip();
}

// ============================================
// STAT DECAY
// ============================================

setInterval(() => {
    petStats.happiness = Math.max(petStats.happiness - 1, 0);
    petStats.energy = Math.max(petStats.energy - 1, 0);
    petStats.health = Math.max(petStats.health - 1, 0);
    petStats.hunger = Math.min(petStats.hunger + 2, 100);
    petStats.cleanliness = Math.max(petStats.cleanliness - 0.5, 0);
    
    updateDisplay();
}, 15000);

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

// Real-world activity inputs
logSnackBtn.addEventListener('click', logSnack);
logActivityBtn.addEventListener('click', logWellnessActivity);
logGratitudeBtn.addEventListener('click', logGratitude);
logActivityLogBtn.addEventListener('click', logActivityLog);

// Snack input enter key
snackInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') logSnack();
});

// Activity input enter key
activityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') logWellnessActivity();
});

// Gratitude input enter key
gratitudeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') logGratitude();
});

// Activity log input enter key
activityLogInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') logActivityLog();
});

// Quick coping techniques
playBtn.addEventListener('click', playTogether);
healthyFoodBtn.addEventListener('click', healthyFood);
snackBtn.addEventListener('click', snackTime);
breatheBtn.addEventListener('click', breathingExercise);
journalBtn.addEventListener('click', journaling);
musicBtn.addEventListener('click', musicTime);
gratitudeBtn.addEventListener('click', gratitudePractice);
socialBtn.addEventListener('click', socialInteraction);

// Daily tasks
taskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const taskKey = btn.getAttribute('data-task');
        completeTask(taskKey);
    });
});

// Achievements modal
const viewBadgesBtn = document.getElementById('achievementsBtn');
const achievementsModal = document.getElementById('achievementsModal');
const closeAchievementsBtn = document.querySelector('.modal-close');

if (viewBadgesBtn && achievementsModal) {
    viewBadgesBtn.addEventListener('click', () => {
        renderAchievements();
        achievementsModal.style.display = 'flex';
    });
}

if (closeAchievementsBtn && achievementsModal) {
    closeAchievementsBtn.addEventListener('click', () => {
        achievementsModal.style.display = 'none';
    });
}

if (achievementsModal) {
    window.addEventListener('click', (event) => {
        if (event.target === achievementsModal) {
            achievementsModal.style.display = 'none';
        }
    });
}

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
        petName: petNameInput.value,
        points,
        gratitudeEntries,
        achievements,
        activityCounts,
        activityLog
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
        points = data.points || 0;
        gratitudeEntries = data.gratitudeEntries || [];
        activityLog = data.activityLog || [];
        
        // Restore achievements and activity counts
        if (data.achievements) {
            Object.keys(data.achievements).forEach(key => {
                achievements[key] = { ...achievements[key], ...data.achievements[key] };
            });
        }
        
        if (data.activityCounts) {
            Object.keys(data.activityCounts).forEach(key => {
                activityCounts[key] = data.activityCounts[key];
            });
        }
        
        if (data.petName) {
            petNameInput.value = data.petName;
            petNameDisplay.textContent = data.petName;
        }

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
displayActivityLog();
showWellnessTip();

console.log('🌿 Real-World Wellness Pet Simulator Started - Mental Health Focus 💙');
console.log('Log real activities to earn points and care for your pet!');

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
   

let currentPet = '🦦'

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

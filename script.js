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

let points = 0;
let currentPet = '🦦';

let dailyTasks = {
    groom: { completed: false, timeWindow: { start: 7, end: 12 }, missed: false },
    exercise: { completed: false, timeWindow: { start: 13, end: 18 }, missed: false },
    meditate: { completed: false, timeWindow: { start: 19, end: 23 }, missed: false }
};

let lastResetDate = new Date().toDateString();

let gratitudeEntries = [];
let activityLog = [];

const achievements = {
    firstSteps: { name: 'First Steps', icon: '👣', description: 'Earn your first 10 points', points: 10, unlocked: false },
    pointHunter10: { name: 'Point Hunter', icon: '⭐', description: 'Reach 50 points', points: 50, unlocked: false },
    pointHunter50: { name: 'Point Master', icon: '💫', description: 'Reach 200 points', points: 200, unlocked: false },
    wellness: { name: 'Wellness Warrior', icon: '💪', description: 'Log 5 wellness activities', count: 0, target: 5, unlocked: false },
    gratefulHeart: { name: 'Grateful Heart', icon: '🙏', description: 'Write 3 gratitude entries', count: 0, target: 3, unlocked: false },
    snackMaster: { name: 'Snack Logger', icon: '🍎', description: 'Log 5 snacks', count: 0, target: 5, unlocked: false },
    taskChampion: { name: 'Task Champion', icon: '✨', description: 'Complete 10 daily tasks', count: 0, target: 10, unlocked: false },
};

let activityCounts = {
    wellnessLogged: 0,
    snacksLogged: 0,
    tasksCompleted: 0,
    gratitudeLogged: 0
};

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
const pointsDisplay = document.getElementById('pointsDisplay') || { textContent: '0' };

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
        if (stat.bar && stat.text) {
            stat.bar.style.width = stat.value + '%';
            stat.text.textContent = Math.round(stat.value);
        }
    });

    updatePetMood();
    if (pointsDisplay) pointsDisplay.textContent = points;
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

    if (petMood) petMood.textContent = moodText;
}

function updateStreakDisplay() {
    if (taskStreak) taskStreak.textContent = streaks.tasks;
    if (friendshipStreak) friendshipStreak.textContent = streaks.friendship;
}

function showMessage(text) {
    if (statusMessage) {
        statusMessage.textContent = text;
        statusMessage.classList.add('show');
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 3000);
    }
}

function showWellnessTip() {
    const randomIndex = Math.floor(Math.random() * wellnessTips.length);
    if (wellnessTip) wellnessTip.textContent = wellnessTips[randomIndex];
}

// ============================================
// ACTIVITY LOGGING FUNCTIONS
// ============================================

function logActivityLog() {
    const activityText = activityLogInput ? activityLogInput.value.trim() : '';
    
    if (!activityText) {
        showMessage('Tell me what you\'ve been up to! 📝');
        return;
    }

    const now = new Date();
    activityLog.push({
        text: activityText,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    petStats.happiness = Math.min(petStats.happiness + 10, 100);
    points += 5;

    updateDisplay();
    displayActivityLog();
    showMessage(`Great job logging your activities! 📝 +5 points`);
    showWellnessTip();
    
    if (activityLogInput) activityLogInput.value = '';
}

function displayActivityLog() {
    if (!activityLogDisplay) return;
    
    if (activityLog.length === 0) {
        activityLogDisplay.innerHTML = '<p style="color: #999; font-size: 14px;">No activities logged yet. Start logging! 🚀</p>';
        return;
    }

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
// ACHIEVEMENTS
// ============================================

function checkAchievements() {
    if (points >= 10 && !achievements.firstSteps.unlocked) {
        achievements.firstSteps.unlocked = true;
        showMessage(`🏆 Achievement Unlocked: ${achievements.firstSteps.name}!`);
    }
    if (points >= 50 && !achievements.pointHunter10.unlocked) {
        achievements.pointHunter10.unlocked = true;
        showMessage(`🏆 Achievement Unlocked: ${achievements.pointHunter10.name}!`);
    }
    if (points >= 200 && !achievements.pointHunter50.unlocked) {
        achievements.pointHunter50.unlocked = true;
        showMessage(`🏆 Achievement Unlocked: ${achievements.pointHunter50.name}!`);
    }
}

function renderAchievements() {
    if (!achievementsGrid) return;
    
    let html = '';
    Object.values(achievements).forEach(achievement => {
        const locked = achievement.unlocked ? '' : ' locked';
        const opacity = achievement.unlocked ? '1' : '0.5';
        html += `<div style="opacity: ${opacity}; text-align: center; padding: 15px;">
            <div style="font-size: 40px;">${achievement.icon}</div>
            <div style="font-weight: bold; margin: 10px 0;">${achievement.name}</div>
            <div style="font-size: 12px; color: #666;">${achievement.description}</div>
        </div>`;
    });
    achievementsGrid.innerHTML = html;
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
        petName: petNameInput ? petNameInput.value : 'Buddy',
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
        
        if (data.petName && petNameInput) {
            petNameInput.value = data.petName;
            if (petNameDisplay) petNameDisplay.textContent = data.petName;
        }

        if (petEmoji) petEmoji.textContent = currentPet;
        petChoices.forEach((choice) => {
            choice.classList.remove('active');
            if (choice.getAttribute('data-pet') === currentPet) {
                choice.classList.add('active');
            }
        });
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Activity logging buttons
if (logActivityLogBtn) logActivityLogBtn.addEventListener('click', logActivityLog);
if (activityLogInput) activityLogInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') logActivityLog();
});

// Pet customization
petChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        petChoices.forEach(btn => btn.classList.remove('active'));
        choice.classList.add('active');
        currentPet = choice.getAttribute('data-pet');
        if (petEmoji) petEmoji.textContent = currentPet;
        saveData();
    });
});

// Pet name input
if (petNameInput) {
    petNameInput.addEventListener('input', () => {
        let name = petNameInput.value.trim();
        if (name === '') {
            name = 'Buddy';
        }
        if (petNameDisplay) petNameDisplay.textContent = name;
        saveData();
    });
}

// Achievements modal
if (achievementsBtn) {
    achievementsBtn.addEventListener('click', () => {
        renderAchievements();
        if (achievementsModal) achievementsModal.style.display = 'flex';
    });
}

if (modalClose && achievementsModal) {
    modalClose.addEventListener('click', () => {
        achievementsModal.style.display = 'none';
    });
}

// ============================================
// INITIALIZATION
// ============================================

loadData();
updateDisplay();
updateStreakDisplay();
displayActivityLog();
showWellnessTip();

console.log('🌿 Wellness Pet Simulator Started - Mental Health Focus 💙');
console.log('All features loaded successfully!');


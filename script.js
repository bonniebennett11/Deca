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
        petEmoji.textContent = currentPet; // Very happy - show normal pet
    } else if (petStats.happiness > 50) {
        petEmoji.textContent = currentPet; // Happy - show normal pet
    } else if (petStats.happiness > 25) {
        petEmoji.textContent = currentPet; // Neutral - show normal pet
    } else {
        petEmoji.textContent = '😢'; // Sad - show sad face
    }
}

// Show a temporary message to the player
function showMessage(text) {
    statusMessage.textContent = text;
    statusMessage.classList.add('show');
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 3000);
}

// ============================================
// TASK ACTIONS
// ============================================

// Play with the pet - increases happiness, decreases energy
function play() {
    petStats.happiness = Math.min(petStats.happiness + 20, 100);
    petStats.energy = Math.max(petStats.energy - 15, 0);
    updateDisplay();
    showMessage('Your pet had fun! 🎉');
}

// Feed the pet - increases energy, slightly increases happiness
function feed() {
    petStats.happiness = Math.min(petStats.happiness + 10, 100);
    petStats.energy = Math.min(petStats.energy + 25, 100);
    updateDisplay();
    showMessage('Your pet is satisfied! 😋');
}

// Let pet rest - increases energy a lot, slightly decreases happiness
function rest() {
    petStats.energy = Math.min(petStats.energy + 35, 100);
    petStats.happiness = Math.max(petStats.happiness - 5, 0);
    updateDisplay();
    showMessage('Your pet feels refreshed! 💤');
}

// ============================================
// STAT DECAY (Over Time)
// ============================================

// Every 8 seconds, stats naturally decrease
setInterval(() => {
    // Happiness decreases by 3
    petStats.happiness = Math.max(petStats.happiness - 3, 0);
    
    // Energy decreases by 5 (gets tired)
    petStats.energy = Math.max(petStats.energy - 5, 0);
    
    // Update display to show the decay
    updateDisplay();
}, 8000); // 8000 milliseconds = 8 seconds

// ============================================
// PET CUSTOMIZATION
// ============================================

// Handle pet selection
petChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        // Remove active class from all choices
        petChoices.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked choice
        choice.classList.add('active');
        
        // Update current pet emoji
        currentPet = choice.getAttribute('data-pet');
        petEmoji.textContent = currentPet;
    });
});

// Set initial pet as active
petChoices[0].classList.add('active');

// ============================================
// PET NAME CUSTOMIZATION
// ============================================

// Update pet name when user types in input
petNameInput.addEventListener('input', () => {
    let name = petNameInput.value.trim();
    
    // If empty, use default
    if (name === '') {
        name = 'Buddy';
    }
    
    petNameDisplay.textContent = name;
});

// ============================================
// EVENT LISTENERS
// ============================================

// Button click events
playBtn.addEventListener('click', play);
feedBtn.addEventListener('click', feed);
restBtn.addEventListener('click', rest);

// ============================================
// INITIALIZATION
// ============================================

// Show the initial state when page loads
updateDisplay();
console.log('Pet simulator started!', petStats);

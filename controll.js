document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    displayUserInfo();
    fetchActiveStatus();
    
    // Set up periodic refresh every second
    setInterval(fetchActiveStatus, 1000);
    
    // Set up event listeners
    setupCardButtons();
});

// Display current user information
function displayUserInfo() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-display').textContent = username;
    }
}

// Fetch active status from API
function fetchActiveStatus() {
    fetch('https://ubanze.bsite.net/api/Actives')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateCardStatuses(data);
            console.log(data)
        })
        .catch(error => {
            console.error('Error fetching active status:', error);
            showNotification('Error loading status. Please refresh the page.', 'error');
        });
}

// Update all card statuses based on API data
function updateCardStatuses(activeItems) {
    // Reset all cards first
    document.querySelectorAll('.card').forEach(card => {
        resetCardAppearance(card);
    });

    // Update cards with active status
    activeItems.forEach(item => {
        const card = document.querySelector(`.card[data-card-id="${item.number}"]`);
        if (card) {
            let statusText = '';
            let statusColor = '';

            if (item.isActive) {
                if (item.mimdinare) {
                    statusText = `მიმდინარე | ${item.type}`;
                    statusColor = 'red';
                } else if (item.secInTimer > 0) {
                    const hours = Math.floor(item.secInTimer / 3600);
                    const minutes = Math.floor((item.secInTimer % 3600) / 60);
                    const seconds = item.secInTimer % 60;
                    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    statusText = `${timeStr} | ${item.type}`;
                    statusColor = 'green';
                }
            } else {
                // Even if not active, we might still want to show the type
                statusText = item.type;
                statusColor = 'gray'; // Neutral color
            }

            showCardStatus(card, statusText, statusColor);
        }
    });
}

// Reset a card to its default state
function resetCardAppearance(card) {
    // Clear all styling
    card.style.backgroundColor = '#f5f5f5';
    card.style.border = '2px solid #ddd';
    card.style.boxShadow = 'none';
    
    // Remove any existing status displays
    const existingDisplay = card.querySelector('.status-display');
    if (existingDisplay) {
        card.removeChild(existingDisplay);
    }
    
    // Show buttons
    const addButton = card.querySelector('.add-button');
    const plusButton = card.querySelector('.plus-button');
    if (addButton) addButton.style.display = 'block';
    if (plusButton) plusButton.style.display = 'block';
}

// Show status on card with specified color
function showCardStatus(card, text, color) {
    const display = document.createElement('div');
    display.className = 'status-display';
    display.textContent = text;

    // Smaller, clean style
    display.style.display = 'flex';
    display.style.alignItems = 'center';
    display.style.justifyContent = 'center';
    display.style.textAlign = 'center';
    display.style.width = '100%';
    display.style.height = '100%';
    display.style.fontWeight = 'bold';
    display.style.fontSize = '14px'; // smaller font
    display.style.lineHeight = '1.2';
    display.style.padding = '8px';

    if (color === 'green') {
        display.style.color = '#006400';
        display.style.fontFamily = 'monospace';
    } else if (color === 'red') {
        display.style.color = '#b22222';
    } else {
        display.style.color = '#333';
    }

    card.appendChild(display);

    card.style.backgroundColor = color === 'red'
        ? 'rgba(255, 200, 200, 0.3)'
        : 'rgba(200, 255, 200, 0.3)';
    card.style.border = `2px solid ${color}`;
    card.style.boxShadow = `0 0 10px ${color === 'red' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 200, 0, 0.5)'}`;

    const addButton = card.querySelector('.add-button');
    const plusButton = card.querySelector('.plus-button');
    if (addButton) addButton.style.display = 'none';
    if (plusButton) plusButton.style.display = 'none';
}

// Set up event listeners for card buttons
function setupCardButtons() {
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            showPopup(this);
        });
    });
    
    document.querySelectorAll('.plus-button').forEach(button => {
        button.addEventListener('click', function() {
            openShopWindow(this);
        });
    });
}

// Show popup function
function showPopup(element) {
    // Your popup implementation
    console.log('Show popup for:', element);
}

// Open shop window function
function openShopWindow(element) {
    // Your shop implementation
    console.log('Open shop for:', element);
}

// Logout function
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = './login.html';
}

// Helper function to show notifications
function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
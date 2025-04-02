let historyData = JSON.parse(localStorage.getItem('historyData')) || [];
let renderedDataIds = new Set();  // Track rendered entry IDs (timestamps)

// Display username
const username = localStorage.getItem('username');
document.getElementById('username-display').textContent = username;

// Initialize Flatpickr calendars with Georgian time
const startDateInput = flatpickr("#startDateInput", {
    dateFormat: "Y-m-d",
    time_24hr: true,
    onChange: function (selectedDates, dateStr) {
        filterByDateRange();
    }
});

const endDateInput = flatpickr("#endDateInput", {
    dateFormat: "Y-m-d",
    time_24hr: true,
    onChange: function (selectedDates, dateStr) {
        filterByDateRange();
    }
});

// Function to convert to Georgian time (UTC+4)
function toGeorgianTime(timestamp) {
    const date = new Date(timestamp);
    return new Date(date.getTime() + (4 * 60 * 60 * 1000));
}

// Function to format date in Georgian style
function formatGeorgianDate(date) {
    return date.toLocaleString('ka-GE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// Enhanced filter function with Georgian time support
function filterByDateRange() {
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;
    const filter = document.querySelector('.filters button.active').getAttribute('onclick').match(/'([^']+)'/)[1];
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    renderHistoryTable(filter, searchQuery, startDate, endDate);
}

// Function to render history data
async function renderHistoryTable(filter = 'all', searchQuery = '', startDate = '', endDate = '') {
    const table = document.getElementById('historyTable');
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    const noDataMessage = document.getElementById('noDataMessage');
    tableBody.innerHTML = '';  // Clear table
    renderedDataIds.clear();   // Reset the rendered set

    // Set different table headers for "admin" mode
    if (filter === 'admin') {
        tableHead.innerHTML = `
            <tr>
                <th>თარიღი</th>
                <th>ოპერაციის ტიპი</th>
                <th>ცვლილებები</th>
                <th>თანხა</th>
                <th>ადმინისტრატორი</th>
            </tr>
        `;
    } else {
        tableHead.innerHTML = `
            <tr>
                <th>თარიღი</th>
                <th>ტიპი</th>
                <th>დეტალები</th>
                <th>ფასი</th>
                <th>მომხმარებელი</th>
            </tr>
        `;
    }

    try {
        // Fetch EndOrEdit API data
        const apiResponse = await fetch('https://ubanze.bsite.net/api/EndOrEdit');
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();

            const newEntries = apiData.map(item => ({
                timestamp: new Date(item.operationDate).getTime(),
                type: item.isEndDay ? 'End Day' : 'Balance Edit',
                editedObject: item.editedObject,
                price: item.amountDifference,
                cashBefore: item.cashBefore,
                cashAfter: item.cashAfter,
                cardBefore: item.cardBefore,
                cardAfter: item.cardAfter,
                username: item.username,
                isFromAPI: true
            }));

            historyData = [...newEntries, ...historyData];
        }

        // Fetch Game Sessions from /api/Purchase
        const gameResponse = await fetch('https://ubanze.bsite.net/api/Purchase');
        if (gameResponse.ok) {
            const gameData = await gameResponse.json();

            const gameEntries = gameData.map(item => ({
                timestamp: new Date(item.date).getTime(),
                type: 'Game Session',
                gameType: item.type.toUpperCase(),  // e.g., PS5, VIP
                duration: item.duration,
                price: item.price,
                itemsPurchased: item.itemsPurchased
            }));

            historyData = [...gameEntries, ...historyData];
        }

        // Sort all data by timestamp (latest first)
        historyData.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Filter historyData
    const filteredData = historyData.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const cutoffDate = new Date("2025-04-01T00:00:00Z"); // Only show from April 1, 2025

        if (entryDate < cutoffDate) return false;
        if (filter === 'shop' && entry.type !== 'Shop Purchase') return false;
        if (filter === 'game' && entry.type !== 'Game Session') return false;
        if (filter === 'admin' && (entry.type !== 'End Day' && entry.type !== 'Balance Edit')) return false;

        return true;
    });

    // Display filtered data
    if (filteredData.length === 0) {
        noDataMessage.style.display = 'block';
        return;
    }
    noDataMessage.style.display = 'none';

    filteredData.forEach(entry => {
        if (renderedDataIds.has(entry.timestamp)) return;
        renderedDataIds.add(entry.timestamp);

        const row = document.createElement('tr');
        const georgianDate = formatGeorgianDate(toGeorgianTime(entry.timestamp));

        let details = '';
        if (entry.type === 'Game Session') {
            details = `თამაში: ${entry.gameType}, ხანგრძლივობა: ${entry.duration}, ნივთები: ${entry.itemsPurchased}`;
        } else if (entry.type === 'End Day') {
            details = `ნაღდი: ${entry.cashAfter?.toFixed(2) || '0.00'}₾ | ბარათი: 0.00₾`;
        } else if (entry.type === 'Balance Edit') {
            details = `${entry.editedObject === 'cash' ? 'ნაღდი' : 'ბარათი'}: ${entry[`${entry.editedObject}Before`]?.toFixed(2) || '0.00'}₾ → ${entry[`${entry.editedObject}After`]?.toFixed(2) || '0.00'}₾`;
        }

        // Render different table format for "admin"
        if (filter === 'admin') {
            row.innerHTML = `
                <td>${georgianDate}</td>
                <td>${entry.type}</td>
                <td>${details}</td>
                <td>${entry.price ? Math.abs(entry.price).toFixed(2) + '₾' : 'N/A'}</td>
                <td>${entry.username || 'Admin'}</td>
            `;
        } else {
            row.innerHTML = `
                <td>${georgianDate}</td>
                <td>${entry.type}</td>
                <td>${details}</td>
                <td>${entry.price ? Math.abs(entry.price).toFixed(2) + '₾' : 'N/A'}</td>
                <td>${entry.username || username}</td>
            `;
        }

        tableBody.appendChild(row);
    });
}

// Filter buttons handler
function filterHistory(filter) {
    document.querySelectorAll('.filters button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.filters button[onclick="filterHistory('${filter}')"]`).classList.add('active');
    
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;
    renderHistoryTable(filter, document.getElementById('searchInput').value, startDate, endDate);
}

// Search function
function searchHistory() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;
    renderHistoryTable(
        document.querySelector('.filters button.active').getAttribute('onclick').match(/'([^']+)'/)[1], 
        searchQuery, 
        startDate, 
        endDate
    );
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;
    renderHistoryTable(
        document.querySelector('.filters button.active').getAttribute('onclick').match(/'([^']+)'/)[1], 
        '', 
        startDate, 
        endDate
    );
}

// Export to Excel function
function exportToExcel() {
    const filter = document.querySelector('.filters button.active').getAttribute('onclick').match(/'([^']+)'/)[1];
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;

    // Filter data first
    const filteredData = historyData.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const cutoffDate = new Date("2025-04-01T00:00:00Z"); // April 1, 2025, 00:00:00 UTC

        if (entryDate < cutoffDate) {
            return false; // Exclude entries before April 1st, 2025
        }

        if (filter === 'shop' && entry.type !== 'Shop Purchase') return false;
        if (filter === 'game' && (entry.type === 'Shop Purchase' || entry.type === 'End Day' || entry.type === 'Balance Edit')) return false;
        if (filter === 'admin' && (entry.type !== 'End Day' && entry.type !== 'Balance Edit')) return false;

        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const entryDateFormatted = formatGeorgianDate(toGeorgianTime(entry.timestamp)).toLowerCase();
            const matchesDate = entryDateFormatted.includes(searchLower);
            const matchesType = entry.type.toLowerCase().includes(searchLower);
            const matchesItems = entry.items ? entry.items.some(item => item.name.toLowerCase().includes(searchLower)) : false;
            const matchesUser = entry.username ? entry.username.toLowerCase().includes(searchLower) : false;

            if (!matchesDate && !matchesType && !matchesItems && !matchesUser) return false;
        }

        if (startDate && endDate) {
            const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
            if (entryDate < startDate || entryDate > endDate) return false;
        }

        return true;
    });

    // Convert to Excel worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData.map(entry => ({
        'თარიღი': formatGeorgianDate(toGeorgianTime(entry.timestamp)),
        'ტიპი': entry.type,
        'დეტალები': entry.type === 'Shop Purchase' ? 
            (entry.items ? entry.items.map(item => `${item.name} (${item.quantity}x)`).join(', ') : 'N/A') :
            (entry.type === 'End Day' ? 
                `ნაღდი: ${entry.cashAfter?.toFixed(2) || '0.00'}₾ | ბარათი: 0.00₾` :
                (entry.type === 'Balance Edit' ? 
                    `${entry.editedObject === 'cash' ? 'ნაღდი' : 'ბარათი'}: ${entry[`${entry.editedObject}Before`]?.toFixed(2) || '0.00'}₾ → ${entry[`${entry.editedObject}After`]?.toFixed(2) || '0.00'}₾` :
                    entry.duration || 'N/A'
                )
            ),
        'ფასი': entry.price ? Math.abs(entry.price).toFixed(2) + '₾' : 'N/A',
        'მომხმარებელი': entry.username || username
    })));

    // Write to Excel and download
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'History');
    XLSX.writeFile(wb, 'history_data.xlsx');
}
function redirectToDashboard() {
    window.location.href = 'dashboard.html';
    
}
// Add event listeners to buttons
document.getElementById('searchInput').addEventListener('input', searchHistory);
document.getElementById('clearSearchButton').addEventListener('click', clearSearch);

// Render the history table when the page is loaded
renderHistoryTable();

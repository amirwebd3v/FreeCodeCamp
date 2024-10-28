document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    // Function to validate US phone number
    const validatePhoneNumber = (str) => {
        if (str.length === 0) {
            alert("Please provide a phone number");
            return null;
        }

        // Basic format validation using regex
        const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

        // Check for invalid starting digits (0, 2-9, 11, etc.)
        const cleanStr = str.replace(/[^\d]/g, "");
        if (cleanStr[0] === "0" || 
            (cleanStr[0] === "1" && cleanStr[1] === "1") || 
            (cleanStr.length >= 11 && cleanStr[0] !== "1") ||
            (cleanStr.length === 11 && cleanStr[0] !== "1")) {
            return false;
        }

        // Check for unmatched parentheses
        const openCount = (str.match(/\(/g) || []).length;
        const closeCount = (str.match(/\)/g) || []).length;
        if (openCount !== closeCount) {
            return false;
        }

        return regex.test(str);
    };

    // Event listener for check button
    checkBtn.addEventListener('click', () => {
        const phoneNumber = userInput.value;
        const isValid = validatePhoneNumber(phoneNumber);
        
        if (isValid !== null) {
            // Simply set the text content without any styling
            resultsDiv.textContent = `${isValid ? "Valid" : "Invalid"} US number: ${phoneNumber}`;
        }
    });

    // Event listener for clear button
    clearBtn.addEventListener('click', () => {
        userInput.value = '';
        resultsDiv.textContent = '';
    });

    // Event listener for Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
});
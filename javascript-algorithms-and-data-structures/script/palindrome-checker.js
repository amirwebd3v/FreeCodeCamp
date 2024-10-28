document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const checkButton = document.getElementById('check-btn');
    const result = document.getElementById('result');

    function isPalindrome(str) {
        // Remove all non-alphanumeric characters and convert to lowercase
        const cleanStr = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
        
        // Compare the string with its reverse
        return cleanStr === cleanStr.split('').reverse().join('');
    }

    function checkPalindrome() {
        // Get the input value
        const text = textInput.value;

        // Check if input is empty
        if (!text) {
            alert('Please input a value');
            return;
        }

        // Check if it's a palindrome and display result
        const isPal = isPalindrome(text);
        result.textContent = `${text} is ${isPal ? 'a' : 'not a'} palindrome`;
    }

    // Add click event listener to the button
    checkButton.addEventListener('click', checkPalindrome);

    // Add enter key event listener to the input
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPalindrome();
        }
    });
});
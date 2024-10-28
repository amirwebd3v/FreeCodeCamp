document.addEventListener('DOMContentLoaded', function() {
    const inputNumber = document.getElementById('number');
    const convertBtn = document.getElementById('convert-btn');
    const output = document.getElementById('output');

    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    function convertToRoman(num) {
        let result = '';
        
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                result += romanNumerals[i].numeral;
                num -= romanNumerals[i].value;
            }
        }
        
        return result;
    }

    function validateAndConvert() {
        const num = inputNumber.value;

        if (!num) {
            output.textContent = 'Please enter a valid number';
            return;
        }

  
        const number = parseInt(num);

  
        if (number < 1) {
            output.textContent = 'Please enter a number greater than or equal to 1';
            return;
        }

        if (number >= 4000) {
            output.textContent = 'Please enter a number less than or equal to 3999';
            return;
        }


        const result = convertToRoman(number);
        output.textContent = result;
    }

 
    convertBtn.addEventListener('click', validateAndConvert);

  
    inputNumber.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateAndConvert();
        }
    });

 
    inputNumber.addEventListener('input', function() {
        output.textContent = '';
    });
});
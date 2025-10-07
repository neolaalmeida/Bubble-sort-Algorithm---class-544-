// Wait for the DOM to be ready before querying elements and attaching handlers
document.addEventListener('DOMContentLoaded', () => {

    const instructionsScreen = document.getElementById('instructions-screen');
    const inputScreen = document.getElementById('input-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const sortBtn = document.getElementById('sort-btn');
    const quitBtns = document.querySelectorAll('.quit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const numbersInput = document.getElementById('numbers-input');
    const resultsDisplay = document.getElementById('results-display');
    const errorMsg = document.getElementById('error-msg');

    // Show the input screen and hide the instructions screen
    startBtn.addEventListener('click', () => {
        instructionsScreen.classList.add('hidden');
        inputScreen.classList.remove('hidden');
    });

    quitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            inputScreen.classList.add('hidden');
            resultsScreen.classList.add('hidden');
            instructionsScreen.classList.remove('hidden');
            clearInputs();
        });
    });

    restartBtn.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        inputScreen.classList.remove('hidden');
        clearInputs();
    });

    sortBtn.addEventListener('click', () => {
        const inputStr = numbersInput.value;
        const strArray = inputStr.split(',').map(s => s.trim()).filter(s => s !== '');
        if (strArray.length === 0) {
            showError('Please enter some numbers.');
            return;
        }
        const numbers = strArray.map(Number);
        if (numbers.some(isNaN)) {
            showError('Invalid input. Please use only numbers and commas.');
            return;
        }
        const steps = bubbleSortWithSteps(numbers);
        displayResults(steps);
        inputScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
    });

    function clearInputs() {
        numbersInput.value = '';
        resultsDisplay.innerHTML = '';
        errorMsg.textContent = '';
    }
    
    function showError(message) {
        errorMsg.textContent = message;
    }

    function displayResults(steps) {
        resultsDisplay.innerHTML = '';
        steps.forEach((stepArray ,index ) => {
            const p = document.createElement('p');
            const prefix = (index === 0)? 'Intial Array: ': `step ${index}: `;
            p.textContent = prefix + stepArray.join(', ');
            resultsDisplay.appendChild(p);
        });
    }

    function bubbleSortWithSteps(arr) {
        const steps = [];
        steps.push([...arr]);
        let n = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                }
            }
            if (swapped) {
                steps.push([...arr]);
            }
            n--;
        } while (swapped);
        return steps;
    }
});

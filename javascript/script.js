// Wait for the DOM to be ready before querying elements and attaching handlers
document.addEventListener("DOMContentLoaded", () => {
  const instructionsScreen = document.getElementById("instructions-screen");
  const inputScreen = document.getElementById("input-screen");
  const resultsScreen = document.getElementById("results-screen");
  const startBtn = document.getElementById("start-btn");
  const sortAscBtn = document.getElementById("sort-asc-btn");
  const sortDescBtn = document.getElementById("sort-desc-btn");
  const quitBtns = document.querySelectorAll(".quit-btn");
  const restartBtn = document.getElementById("restart-btn");
  const clearBtn = document.getElementById("clear-btn");
  const numbersInput = document.getElementById("numbers-input");
  const resultsDisplay = document.getElementById("results-display");
  const finalResultDisplay = document.getElementById("final-result");
  const errorMsg = document.getElementById("error-msg");
  const warningMsg = document.getElementById("warning-msg");
  let truncationMade = false;

  // Show the input screen and hide the instructions screen
  startBtn.addEventListener("click", () => {
    instructionsScreen.classList.add("hidden");
    inputScreen.classList.remove("hidden");
  });

  quitBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      inputScreen.classList.add("hidden");
      resultsScreen.classList.add("hidden");
      instructionsScreen.classList.remove("hidden");
      clearInputs();
    });
  });

  restartBtn.addEventListener("click", () => {
    resultsScreen.classList.add("hidden");
    inputScreen.classList.remove("hidden");
    clearInputs();
  });

  clearBtn.addEventListener("click", () => {
    clearInputs();
  });

  sortAscBtn.addEventListener("click", () => {
    const inputStr = numbersInput.value;
    const strArray = inputStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (strArray.length === 0) {
      showError("Please enter some numbers.");
      return;
    }

    const numbers = strArray.map(Number);
    if (numbers.some(isNaN)) {
      showError("Invalid input. Please use only numbers and commas.");
      return;
    }

    if (strArray.length < 3 || strArray.length > 8) {
      showError("Please enter between 3 and 8 numbers.");
      return;
    }

    numbers.forEach((number, index) => {
      let truncate = checkDecimalPlaces(number);

      if(truncate === true) { 
        truncationMade = true;
        number = truncateNum(number);
      }
      numbers[index] = number;
    })

    if(truncationMade === true) showWarning("Values have been truncated.");

    const steps = bubbleSortWithSteps(numbers, "asc");
    displayResults(steps);
    finalResultDisplay.textContent =
      "Final Result: " + steps[steps.length - 1].join(", ");
    inputScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
  });
  sortDescBtn.addEventListener("click", () => {
    const inputStr = numbersInput.value;
    const strArray = inputStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");


    if (strArray.length === 0) {
      showError("Please enter some numbers.");
      return;
    }

    const numbers = strArray.map(Number);
    if (numbers.some(isNaN)) {
      showError("Invalid input. Please use only numbers and commas.");
      return;
    }

    if (strArray.length < 3 || strArray.length > 8) {
      showError("Please enter between 3 and 8 numbers.");
      return;
    }

    numbers.forEach((number, index) => {
      let truncate = checkDecimalPlaces(number);

      if(truncate === true) { 
        truncationMade = true;
        number = truncateNum(number);
      }
      numbers[index] = number;
    })

    if(truncationMade === true) showWarning("Values have been truncated.");

    const steps = bubbleSortWithSteps(numbers, "desc");
    displayResults(steps);
    finalResultDisplay.textContent =
      "Final Result: " + steps[steps.length - 1].join(", ");
    inputScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
  });

  function truncateNum(number) {
    return Math.trunc(number * 100) / 100;
  }

  function checkDecimalPlaces(number) {
    let numberString = String(number);
    let decimalPointIndex = numberString.indexOf('.');
    if (decimalPointIndex === -1) return false;
    let decimalPart = numberString.substring(decimalPointIndex + 1);
    return decimalPart.length > 2;
  }

  function clearInputs() {
    numbersInput.value = "";
    resultsDisplay.innerHTML = "";
    errorMsg.textContent = "";
    warningMsg.textContent = "";
    truncationMade = false;
  }

  function showError(message) {
    errorMsg.textContent = message;
  }

  function showWarning(message) {
    warningMsg.textContent = message;
  }

  function displayResults(steps) {
    resultsDisplay.innerHTML = "";
    steps.forEach((stepArray, index) => {
      const p = document.createElement("p");
      const prefix = index === 0 ? "Intial Array: " : `step ${index}: `;
      p.textContent = prefix + stepArray.join(", ");
      resultsDisplay.appendChild(p);
    });
  }

  function bubbleSortWithSteps(arr, order = "asc") {
    const steps = [];
    steps.push([...arr]);
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (
          (order === "asc" && arr[i] > arr[i + 1]) ||
          (order === "desc" && arr[i] < arr[i + 1])
        ) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
      if (swapped) steps.push([...arr]);
      n--;
    } while (swapped);

    return steps;
  }
});

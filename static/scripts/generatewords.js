// List of random words
const words = ['apple', 'banana', 'orange', 'grape', 'peach', 'kiwi', 'strawberry', 'blueberry', 'watermelon', 'pineapple', 'cherry', 'mango', 'pear', 'plum'];

// Function to generate a random word
function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Populate the word container with random words
const wordContainer = document.querySelector('.wordcontainer .word');
for (let i = 0; i < 2; i++) { // Populate 3 words
    const word = generateRandomWord();
    const spans = Array.from(word).map(letter => `<span>${letter}</span>`).join('');
    wordContainer.innerHTML += `<div>${spans}</div>`;
}

const helpImage = document.querySelector('.flip-card-back img');
const wordSpans = document.querySelectorAll('.word span');
helpImage.src = `../images/green_asl_abc/${wordSpans[0].textContent}.png`;

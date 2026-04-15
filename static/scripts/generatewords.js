const words = ['apple', 'banana', 'orange', 'grape', 'peach', 'kiwi', 'strawberry', 'blueberry', 'watermelon', 'pineapple', 'cherry', 'mango', 'pear', 'plum'];

function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

const wordContainer = document.querySelector('.wordcontainer .word');
for (let i = 0; i < 2; i++) {
    const word = generateRandomWord();
    const spans = Array.from(word).map(letter => `<span>${letter}</span>`).join('');
    wordContainer.innerHTML += `<div>${spans}</div>`;
}

const helpImage = document.querySelector('.flip-card-back img');
const wordSpans = document.querySelectorAll('.word span');
helpImage.src = `${window.ASL_IMAGE_BASE}/${wordSpans[0].textContent}.png`;

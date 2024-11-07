let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let startTime;
const cards = document.querySelectorAll('.card');

function startTimer() {
  startTime = Date.now();
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsed}s`;
  }, 1000);
}

function selectCard(card) {
  if (lockBoard || card === firstCard) return;
  card.classList.add('flipped');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', selectCard);
  secondCard.removeEventListener('click', selectCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

document.getElementById('reset-button').addEventListener('click', () => {
  window.location.reload();
});

startTimer();
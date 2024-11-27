let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedCards = 0;
let startTimer, elapsedTime;

function startGame() {
  startTimer = Date.now();
  setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTimer) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsedTime}s`;
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
  matchedCards++;

  if (matchedCards === 9) { // Assuming there are 18 cards (9 pairs)
    endGame();
  }
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

function endGame() {
  // Stop the timer
  clearInterval(startTimer);
  
  // Display game over message
  document.getElementById('game-over-message').style.display = 'block';

  // Prompt for username and submit score
  const username = prompt("Enter your username:");
  if (username) {
    submitScore(username, elapsedTime);
  }
}

function submitScore(username, time) {
  const data = {
    username: username,
    time: time
  };

  fetch('/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Score submitted:', data);
    window.location.href = '/scores'; // Redirect to the scores page
  })
  .catch(error => {
    console.error('Error submitting score:', error);
  });
}

document.getElementById('reset-button').addEventListener('click', () => {
  window.location.reload();
});

startGame();
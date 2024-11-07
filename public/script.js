let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

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
    let isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
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
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
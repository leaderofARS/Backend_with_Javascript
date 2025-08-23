function rollDice() {
	const dice1 = Math.floor(Math.random() * 6) + 1;
	const dice2 = Math.floor(Math.random() * 6) + 1;

	document.querySelector('.img1').src = `images/dice${dice1}.png`;
	document.querySelector('.img2').src = `images/dice${dice2}.png`;

	const h1 = document.querySelector('h1');
	if (dice1 > dice2) {
		h1.textContent = '🚩 Player 1 Wins!';
	} else if (dice2 > dice1) {
		h1.textContent = 'Player 2 Wins! 🚩';
	} else {
		h1.textContent = 'Draw!';
	}
}

window.onload = rollDice;

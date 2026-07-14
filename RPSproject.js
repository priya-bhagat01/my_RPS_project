"use strict"; //(removes hidden unicode characters and global scope pollution)
 
	let score = JSON.parse(localStorage.getItem('score')) || {
		wins : 0,
	    losses : 0,
		ties : 0,
	};
// OR
	// if (!score) {
	// 	score = {
	// 		wins : 0,
	//         losses : 0,
	// 		ties : 0,
	// 	};
	// }

        updateMoves();

function playGame(playerMove) {
	const computerMove = pickComputerMove();
	let  result = '';
if (playerMove === 'rock') {
	if (computerMove === 'rock') {
    result = 'tie';
    } else if (computerMove === 'paper') {
    result = 'You lose';
    } else if (computerMove === 'scissor') {
    result = 'You win';
    }
}else if (playerMove === 'paper'){
    if (computerMove === 'paper') {
    result = 'tie';
    } else if (computerMove === 'scissor') {
    result = 'You lose';
    } else if (computerMove === 'rock') {
    result = 'You win';
    }	
}else if (playerMove === 'scissor') {
    if (computerMove === 'scissor') {
    result = 'tie';   	
    }else if (computerMove === 'rock') {
    result = 'You lose';
    }else if (computerMove === 'paper') {
    result = 'You win';
    }
}
 if (result === 'You win') {
	 score.wins += 1
 }else if (result === 'You lose') {
	 score.losses += 1
 }else if (result === 'tie') {
	 score.ties += 1
 }

localStorage.setItem('score',JSON.stringify(score));
updateMoves(playerMove, computerMove);
updateResult(result);
updateScore();

// alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
// wins : ${score.wins}, losses : ${score.losses}, ties : ${score.ties} `);
};

  function updateScore() {
	document.querySelector('.score-button')
	    .innerHTML = `wins : ${score.wins}, losses : ${score.losses}, ties : ${score.ties}`;	    	
  };

  function updateResult(result) {
  	document.querySelector('.result-button')
  	    .innerHTML = `${result}`
  };

  function updateMoves(playerMove, computerMove) {
    if (!playerMove||!computerMove) {
    document.querySelector('.moves-button')
        .innerHTML = ''; 
        return;
    }
    const imageUrls = {
        rock: 'RockImage.png',
        paper: 'PaperImage.png',
        scissor: 'ScissorImage.png'
    };
  	document.querySelector('.moves-button')
  	    .innerHTML = `You <img src="${imageUrls[playerMove]}" class="move-icon" alt="${playerMove}"> 
        vs
        <img src="${imageUrls[computerMove]}" class="move-icon" alt="${computerMove}">Computer`;
  };

  function pickComputerMove() {
    const randomNumber = Math.random();	
    let computerMove = '';
	  		 	  
    if (randomNumber >= 0 && randomNumber < 1/3) {
       computerMove = 'rock'; 
    }else if ( randomNumber >= 1/3 && randomNumber < 2/3) {
       computerMove = 'paper'	
    }else if ( randomNumber >= 2/3 && randomNumber < 1) {
       computerMove = 'scissor'
    }
    return computerMove;
  }

  const autoPlay = document.querySelector('.auto')
  let isAutoPlaying = false;
  let intervalId ='';

  autoPlay.addEventListener('click', function () {
    if (isAutoPlaying === false) {
     autoPlay.innerHTML = 'Stop-Playing'
     isAutoPlaying = true
        intervalId = setInterval(function() {
           const playerChoice = pickComputerMove();
           playGame(playerChoice);
           //playGame(pickComputerMove()); works but above code is easier to read
        }, 1250); 
    }else {
     autoPlay.innerHTML = 'Auto-Play'
     isAutoPlaying = false
        clearInterval(intervalId)
    }       
   });

   
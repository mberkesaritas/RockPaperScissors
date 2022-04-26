const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
var i = 1 
var playerOne
var playerTwo


const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {

    if (i % 2 != 0) {
      const playerOneSelection = selectionButton.dataset.selection
      playerOne = SELECTIONS.find(playerOne => playerOne.name === playerOneSelection)
      console.log(playerOne)
    }
    else{
      const playerTwoSelection = selectionButton.dataset.selection
      playerTwo = SELECTIONS.find(playerTwo => playerTwo.name === playerTwoSelection)
      console.log(playerTwoSelection)
    }

    if(i % 2 == 0){
      makeSelection(playerOne , playerTwo)
    }
    i++ 
    console.log(i)

  })
})

function makeSelection(playerOne , playerTwo) {
  const yourWinner = isWinner(playerOne, playerTwo)
  const computerWinner = isWinner(playerTwo, playerOne)

  addSelectionResult(playerTwo, computerWinner)
  addSelectionResult(playerOne, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}


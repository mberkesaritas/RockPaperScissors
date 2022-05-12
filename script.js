const socket = io.connect("http://localhost:3000")
const rockButton = document.getElementById("rockButton")
const paperButton = document.getElementById("paperButton")
const scissorsButton = document.getElementById("scissorsButton")
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
var i = 0
var playerOne
var playerTwo
const serverResult = document.getElementById("serverResult")



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

rockButton.addEventListener('click', e => {

      const playerOneSelection = "rock"
      playerOne = SELECTIONS.find(playerOne => playerOne.name === playerOneSelection)
      console.log(playerOne)

      socket.emit("option" ,{
        player: socket.id,
        option: playerOne
      })
    
   

  })

paperButton.addEventListener('click', e => {

    const playerOneSelection = "paper"
    playerOne = SELECTIONS.find(playerOne => playerOne.name === playerOneSelection)
    console.log(playerOne)

    socket.emit("option" ,{
      player: socket.id ,
      option: playerOne
    })
  
 

})

scissorsButton.addEventListener('click', e => {

  const playerOneSelection = "scissors"
  playerOne = SELECTIONS.find(playerOne => playerOne.name === playerOneSelection)
  console.log(playerOne)

  socket.emit("option" ,{
    player: socket.id ,
    option: playerOne
  })



})

socket.on("connect" , () => {
  console.log("MyID : " + socket.id) 
})

socket.on("option" , (data) => {
  console.log("hatalı ksıısm"+data.playerOneSelected)
  
  makeSelection(data.playerOneSelected , data.playerTwoSelected)


})



function makeSelection(playerOne , playerTwo) {
  const yourWinner = isWinner(playerOne, playerTwo)
  const computerWinner = isWinner(playerTwo, playerOne)

  addSelectionResult(playerTwo, computerWinner)
  addSelectionResult(playerOne, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)

  socket.emit("option" ,  {
    playerOneWinner : yourWinner,
    playerTwoWinner : computerWinner
  })
  
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

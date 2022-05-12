const express = require("express")
const socket = require("socket.io")

const app = express()
const server = app.listen(3000)
var userCount = 0

app.use(express.static("./"))

const io = socket(server)
var playerOneId = ""
var playerTwoId = ""
var playerOneSelected = ""
var playerTwoSelected = ""



/* app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');

}); */


io.on('connection', (socket) => {
  console.log('a user connected');
  if(userCount % 2 != 0){
    playerOneId = socket.id
  }
  else if(userCount % 2 == 0){
    playerTwoId = socket.id
  }
  console.log("PlauerOneID :" + playerOneId)
  console.log("PlayerTowID :" + playerTwoId)
  userCount++

  io.sockets.emit("users" , {
    playerOne: playerOneId,
    playerTwoId: playerTwoId
  })


  socket.on("option"  , (data) => {
    console.log(data)
    if(playerOneId == data.player){
      console.log("player1selected : " + data.option)
      playerOneSelected = data.option
    }
    else{
      console.log("player2selected : " + data.option)
      playerTwoSelected = data.option
    }

    if(playerOneSelected != "" || playerTwoSelected != ""){

      io.sockets.emit("option" , {
        data,
        userCount:userCount,
        playerOneSelected : playerOneSelected,
        playerTwoSelected : playerTwoSelected
        
      })
  
      playerOneSelected = ""
      playerOneSelected = ""

    }
  })
});





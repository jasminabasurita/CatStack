const onCollision = (player, item) => item.kill()

const cleanSlate = () => {
  func.children.forEach(child => child.kill())
  ifStatement.children.forEach(child => child.kill())
  returnStatement.children.forEach(child => child.kill())

  firstFunc = func.create(100, 50, "func")
  firstFunc.inputEnabled = true
  firstFunc.input.enableDrag(true)
  game.physics.arcade.enable(firstFunc)
  firstFunc.body.immovable = true

  firstIf = ifStatement.create(350, 50, "ifStatement")
  firstIf.inputEnabled = true
  firstIf.input.enableDrag(true)
  game.physics.arcade.enable(firstIf)
  firstIf.body.immovable = true

  firstReturn = returnStatement.create(500, 50, "returnStatement")
  firstReturn.inputEnabled = true
  firstReturn.input.enableDrag(true)
  game.physics.arcade.enable(firstReturn)
  firstReturn.body.immovable = true
}

const createMessage = (str, type) => {
  message = game.add.sprite(game.width / 2, game.height / 2, "message")
  message.anchor.x = 0.5
  message.anchor.y = 0.5
  messageText = game.add.text(game.width / 2, 200, str, {
    align: "center",
    fill: "#D5C392",
    wordWrap: true,
    wordWrapWidth: 350
  })
  messageText.anchor.x = 0.5
  switch (type) {
    case "START":
      let playBtn = game.add.button(
        game.world.centerX,
        360,
        "play",
        () => {
          message.kill()
          messageText.kill()
          playBtn.kill()
          cleanSlate()
        },
        this,
        0,
        0,
        1
      )
      playBtn.anchor.x = 0.5
      playBtn.anchor.y = 0.5
      break

    case "REPLAY":
      let tryAgainBtn = game.add.button(
        game.world.centerX,
        385,
        "tryAgainBtn",
        () => {
          message.kill()
          messageText.kill()
          tryAgainBtn.kill()
          cleanSlate()
        },
        this,
        0,
        0,
        1
      )
      tryAgainBtn.anchor.x = 0.5
      tryAgainBtn.anchor.y = 0.5
      break
    case "NEXT":
      let nextLevelBtn = game.add.button(
        game.world.centerX,
        385,
        "nextLevel",
        () => {
          message.kill()
          messageText.kill()
          nextLevelBtn.kill()
          cleanSlate()
          createMessage("Sorry, next level still in development", "REPLAY")
        },
        this,
        0,
        0,
        1
      )
      nextLevelBtn.anchor.x = 0.5
      nextLevelBtn.anchor.y = 0.5

      break
    default:
      console.log("play again")
      break
  }
}

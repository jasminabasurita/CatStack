const executeFunc = () => {
  if (!execute) {
    if (message) {
      message.kill()
      messageText.kill()
      messageBtn.kill()
    }
    for (let i = 1; i < 5; i++) {
      let funcInstance = func.create(firstFunc.x, 50 + i * 128, "func")
      game.physics.arcade.enable(funcInstance)
      funcInstance.body.immovable = true

      let ifInstance = ifStatement.create(
        firstIf.x,
        50 + i * 128,
        "ifStatement"
      )
      game.physics.arcade.enable(ifInstance)
      ifInstance.body.immovable = true

      let returnInstance = returnStatement.create(
        firstReturn.x,
        50 + i * 128,
        "returnStatement"
      )
      game.physics.arcade.enable(returnInstance)
      returnInstance.body.immovable = true
    }
    player = game.add.sprite(5, 5, "kitty")
    player.scale.setTo(0.25, 0.25)

    game.physics.arcade.enable(player)
    player.body.setSize(260, 175, 50, 75)
    player.body.bounce.y = 0.2
    player.body.gravity.y = 500

    player.animations.add("left", [0, 1, 2, 3], 10, true)
    player.animations.add("right", [4, 5, 6, 7], 10, true)

    player.body.collideWorldBounds = true
    player.recurse = false
    execute = true
  }
}

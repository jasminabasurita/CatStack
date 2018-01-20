/* global Phaser */

const GameState = {
  preload: function() {
    game.load.tilemap(
      "tilemap",
      "/assets/tiles/level1.json",
      null,
      Phaser.Tilemap.TILED_JSON
    )
    game.load.image("tileset", "/assets/tiles/tileset.png", 32, 32)

    game.load.image("func", "/assets/Function.png")
    game.load.image("returnStatement", "/assets/Return.png")
    game.load.image("ifStatement", "/assets/If.png")
    game.load.image("executeBtn", "/assets/buttons/Execute.png")
    game.load.image("executeBtnPressed", "/assets/buttons/ExecutePressed.png")
    game.load.spritesheet("kitty", "/assets/pusheen.png", 375, 300)
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    map = game.add.tilemap("tilemap")
    map.addTilesetImage("tileset", "tileset")

    background = map.createLayer("background")
    background2 = map.createLayer("background2")
    ground = map.createLayer("ground")
    foreground = map.createLayer("foreground")

    func = game.add.group()
    func.enableBody = true

    firstFunc = func.create(100, 50, "func")
    firstFunc.inputEnabled = true
    firstFunc.input.enableDrag(true)
    game.physics.arcade.enable(firstFunc)
    firstFunc.body.immovable = true

    ifStatement = game.add.group()
    ifStatement.enableBody = true

    firstIf = ifStatement.create(350, 50, "ifStatement")
    firstIf.inputEnabled = true
    firstIf.input.enableDrag(true)
    game.physics.arcade.enable(firstIf)
    firstIf.body.immovable = true

    returnStatement = game.add.group()
    returnStatement.enableBody = true

    firstReturn = returnStatement.create(500, 50, "returnStatement")
    firstReturn.inputEnabled = true
    firstReturn.input.enableDrag(true)
    game.physics.arcade.enable(firstReturn)
    firstReturn.body.immovable = true

    ground.resizeWorld()

    map.setCollisionBetween(1, 100, true, "ground")

    executeBtn = game.add.button(
      game.world.centerX - 50,
      94,
      "executeBtn",
      executeFunc,
      this,
      2,
      1,
      0
    )

    executeBtn.scale.setTo(0.5, 0.5)
  },

  update: function() {
    game.physics.arcade.collide(player, ground)
    // game.physics.arcade.overlap(func, ground)
    if (game.physics.arcade.overlap(player, func, onCollision)) {
      if (!player.inIf) {
        if (player.y > 500) {
          player.kill()
          game.add.text(0, 0, "Max Cat-Stack Exceeded")
          execute = false
        }
        player.x = 5
        player.y += 128
        player.recurse = true
      }
    }
    if (game.physics.arcade.overlap(player, returnStatement, onCollision)) {
      if (player.y < 100) {
        player.kill()
        if (!player.recurse) game.add.text(0, 0, "You didn't use Re-purrrr-sion")
        else game.add.text(0, 0, "You've solved the Re-purrrr-sion")
        execute = false
      } else {
      player.x = 5
      player.y -= 128
    }}
    if (game.physics.arcade.overlap(player, ifStatement, onCollision) && player.y > 500)
      player.inIf = true
    if (execute) {
      player.body.velocity.x = 50
      player.animations.play("right")
    }
  }
}

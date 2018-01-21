/* global Phaser */

const GameState = {
  preload: function() {
    slickUI = game.plugins.add(Phaser.Plugin.SlickUI)
    slickUI.load("assets/ui/kenney.json")
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

    // Tilemap for background, foreground, and platforms
    map = game.add.tilemap("tilemap")
    map.addTilesetImage("tileset", "tileset")

    background = map.createLayer("background")
    background2 = map.createLayer("background2")
    ground = map.createLayer("ground")
    foreground = map.createLayer("foreground")

    // Panel for adjusting pusheen speed
    var panel
    slickUI.add(
      (panel = new SlickUI.Element.Panel(game.width - 250, 8, 242, 38))
    )
    panel
      .add(new SlickUI.Element.Text(1, 1, "Change Speed", 9))
      .centerHorizontally().text.alpha = 0.8
    var slider = new SlickUI.Element.Slider(5, 15, 220, 0)
    panel.add(slider)
    slider.onDrag.add(val => {
      speed = val * 500 + 50
    })

    // Function statements
    func = game.add.group()
    func.enableBody = true

    // If Statements
    ifStatement = game.add.group()
    ifStatement.enableBody = true

    // Return Statements
    returnStatement = game.add.group()
    returnStatement.enableBody = true

    cleanSlate() //creates starting layout

    ground.resizeWorld()

    map.setCollisionBetween(1, 100, true, "ground")

    // Button to execute functions with cats
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
    if (game.physics.arcade.overlap(player, func, onCollision)) {
      if (!player.inIf) {
        if (player.y > 500) {
          player.kill()
          message = game.add.text(0, 0, "Max Cat-Stack Exceeded")
          cleanSlate()
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
        if (!player.recurse) {
          message = game.add.text(0, 0, "You didn't use Re-purrrr-sion")
        } else {
          message = game.add.text(0, 0, "You've solved the Re-purrrr-sion")
        }
        cleanSlate()
        execute = false
      } else {
        player.x = 5
        player.y -= 128
      }
    }
    if (
      game.physics.arcade.overlap(player, ifStatement, onCollision) &&
      player.y > 500
    ) {
      player.inIf = true
    }
    if (execute) {
      player.body.velocity.x = speed
      player.animations.play("right")
    }
  }
}

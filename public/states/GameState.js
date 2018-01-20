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

    ground.resizeWorld()

    map.setCollisionBetween(1, 100, true, "ground")

    for (let i = 0; i < 5; i++) {
      let funcInstance = game.add.sprite(100, 50 + i * 128, "func")
      funcInstance.inputEnabled = true
      funcInstance.input.enableDrag(true)
      game.physics.arcade.enable(funcInstance)
    }

    player = game.add.sprite(5, 5, "kitty")
    player.scale.setTo(0.25, 0.25)

    game.physics.arcade.enable(player)
    player.body.setSize(260, 175, 50, 75)
    player.body.bounce.y = 0.2
    player.body.gravity.y = 500

    player.animations.add("left", [0, 1, 2, 3], 10, true)
    player.animations.add("right", [4, 5, 6, 7], 10, true)

    cursors = game.input.keyboard.createCursorKeys()
    left = game.input.keyboard.addKey(Phaser.Keyboard.H)
    right = game.input.keyboard.addKey(Phaser.Keyboard.L)
    up = game.input.keyboard.addKey(Phaser.Keyboard.K)
    player.body.collideWorldBounds = true
    func.body.collideWorldBounds = true
  },

  update: function() {
    // var hitPlatform = game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(player, ground)
    game.physics.arcade.collide(func, ground)
    func.body.immovable = true
    if (game.physics.arcade.collide(func, player)) player.y += 128
    player.body.velocity.x = 0

    if (cursors.left.isDown || left.isDown) {
      //  Move to the left
      player.body.velocity.x = -150

      player.animations.play("left")
    } else if (cursors.right.isDown || right.isDown) {
      //  Move to the right
      player.body.velocity.x = 150

      player.animations.play("right")
    } else {
      //  Stand still
      player.animations.stop()
    }
    if ((cursors.up.isDown || up.isDown) && player.body.onFloor()) {
      player.body.velocity.y = -350
    }
  }
}

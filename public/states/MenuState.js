/* global Phaser */

let kitty1
let kitty2

const MenuState = {
  preload: function() {
    game.load.tilemap(
      "tilemap",
      "/assets/tiles/menu.json",
      null,
      Phaser.Tilemap.TILED_JSON
    )
    game.load.image("tileset", "/assets/tiles/tileset.png", 32, 32)
    game.load.spritesheet("kitty", "/assets/pusheen.png", 375, 300)
    game.load.spritesheet(
      "play",
      "/assets/buttons/PlayButtonSheet.png",
      192,
      128
    )
    game.load.spritesheet(
      "instructions",
      "/assets/buttons/InstructionsSheet.png",
      192,
      64
    )
  },
  create: function() {
    map = game.add.tilemap("tilemap")
    map.addTilesetImage("tileset", "tileset")

    background = map.createLayer("background")
    background2 = map.createLayer("background2")
    background3 = map.createLayer("background3")

    message = game.add.text(
      game.width / 2,
      100,
      "Welcome to Cat-Stack Adventures"
    )
    message.anchor.x = 0.5

    let play = game.add.button(
      game.width / 2,
      game.height / 2,
      "play",
      () => game.state.start("GameState"),
      this,
      0,
      0,
      1,
      0
    )
    play.anchor.x = 0.5
    play.anchor.y = 0.5

    let instructions = game.add.button(
      game.width / 2,
      game.height / 2 + 100,
      "instructions",
      () => game.state.start("InstructionState"),
      this,
      0,
      0,
      1,
      0
    )
    instructions.scale.setTo(0.8, 0.8)
    instructions.anchor.x = 0.5
    instructions.anchor.y = 0.5

    kitty1 = game.add.sprite(game.width / 2 + 200, game.height / 2, "kitty")
    kitty1.anchor.x = 0.5
    kitty1.anchor.y = 0.5
    kitty1.scale.setTo(0.25, 0.25)

    kitty1.animations.add("left", [0, 1, 2, 3], 10, true)

    kitty2 = game.add.sprite(game.width / 2 - 200, game.height / 2, "kitty")
    kitty2.anchor.x = 0.5
    kitty2.anchor.y = 0.5
    kitty2.scale.setTo(0.25, 0.25)

    kitty2.animations.add("right", [4, 5, 6, 7], 10, true)
  },
  update: () => {
     kitty1.animations.play("left")
     kitty2.animations.play("right")
  }
}

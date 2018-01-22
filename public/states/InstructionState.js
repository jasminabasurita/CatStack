/* global Phaser */

const InstructionState = {
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

    let InstText = game.add.text(
      game.width / 2,
      140,
      "Pusheen's kittens have gotten stuck in a binary search tree! In an attempt to save them she has traveled through dimensions and found herself in the Cat-Stack, a 2 dimensional singly directed plane of existence. Her motives are pure, but her re-purrr-sion skills are poor. She may never make it through the Cat-Stack without your help! Your job is to make sure all functions are written bug free to help Pusheen execute her way through the Cat-Stack and find her kittens. Make sure to have your base case in place, and function calls in order, then hit execute and see Pusheen on her way.", {
        font: '13pt Arial',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 490
      }
    )
    InstText.maxWidth = 400
    InstText.anchor.x = 0.5

    let play = game.add.button(
      game.width / 2,
      game.height  - 100,
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


    kitty1 = game.add.sprite(game.width - 100, game.height / 2, "kitty")
    kitty1.anchor.x = 0.5
    kitty1.anchor.y = 0.5
    kitty1.scale.setTo(0.25, 0.25)

    kitty1.animations.add("left", [0, 1, 2, 3], 10, true)

    kitty2 = game.add.sprite(100, game.height / 2, "kitty")
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


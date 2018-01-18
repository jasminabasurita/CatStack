/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  game.load.image("sky", "/assets/sky.jpg")
  game.load.image("ground", "/assets/ground.png")
  game.load.spritesheet("kitty", "/assets/kitten.png", 50, 51)
}

let player
let platforms
let cursors
let left
let right
let up

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  game.add.sprite(0, 0, "sky")
  platforms = game.add.group()
  platforms.enableBody = true
  const ground = platforms.create(0, game.world.height - 30, "ground")
  ground.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, "kitty")

  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 500
  player.body.collideWorldBounds = true

  player.animations.add("left", [3, 4, 5], 10, true)
  player.animations.add("right", [6, 7, 8], 10, true)

  cursors = game.input.keyboard.createCursorKeys()
  left = game.input.keyboard.addKey(Phaser.Keyboard.H)
  right = game.input.keyboard.addKey(Phaser.Keyboard.L)
  up = game.input.keyboard.addKey(Phaser.Keyboard.K)

}

function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(player, platforms)
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

    // player.frame = 1
  }
  if ((cursors.up.isDown || up.isDown) && player.body.touching.down) {
    player.body.velocity.y = -350
  }
}

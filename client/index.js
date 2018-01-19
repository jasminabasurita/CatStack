/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  game.load.image("sky", "/assets/sky.jpg")
  game.load.image("ground", "/assets/ground.png")
  game.load.image("platform", "/assets/platform.png")
  game.load.spritesheet("kitty", "/assets/pusheen.png", 375, 300)
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

  let ledge
  for (let i = 1; i <= 4; i++) {
    let x = 0
    for (let j = 0; j < 4; j++) {
      if (i % 2 === 0) x = 150
      ledge = platforms.create(j * 300 - x, i * 114, "platform")
      ledge.body.immovable = true
      // ledge.body.velocity.x = i % 2 ? 100 : -100
    }
  }

  // let cats = game.add.group()
  // cats.enableBody = true

  // for (let i = 0; i < 100; i++) {
  //   cats.create(Math.random()*500, Math.random()*500, "cat")
  // }

  player = game.add.sprite(5, 5, "kitty")
  player.scale.setTo(0.25, 0.25)

  game.physics.arcade.enable(player)
  player.body.setSize(260, 175, 50, 75)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 500
  player.body.collideWorldBounds = false

  player.animations.add("left", [0, 1, 2, 3], 10, true)
  player.animations.add("right", [4, 5, 6, 7], 10, true)

  cursors = game.input.keyboard.createCursorKeys()
  left = game.input.keyboard.addKey(Phaser.Keyboard.H)
  right = game.input.keyboard.addKey(Phaser.Keyboard.L)
  up = game.input.keyboard.addKey(Phaser.Keyboard.K)
  player.body.collideWorldBounds = true
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

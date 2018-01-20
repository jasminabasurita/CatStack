/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, "game")

let player
let ground
let cursors
let left
let right
let up
let func
let firstFunc
let firstIf
let firstReturn
let map
let background
let background2
let foreground
let execute

game.state.add('GameState', GameState)
game.state.start('GameState')

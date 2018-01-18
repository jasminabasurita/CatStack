/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  game.load.image("sky", "/assets/sky.jpg");
  game.load.image("ground", "/assets/ground.png");
  game.load.spritesheet("kitty", "/assets/kitten.png", 50, 51);
}

var player = void 0;
var platforms = void 0;
var cursors = void 0;
var left = void 0;
var right = void 0;
var up = void 0;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, "sky");
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 30, "ground");
  ground.body.immovable = true;

  player = game.add.sprite(32, game.world.height - 150, "kitty");

  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 500;
  player.body.collideWorldBounds = true;

  player.animations.add("left", [3, 4, 5], 10, true);
  player.animations.add("right", [6, 7, 8], 10, true);

  cursors = game.input.keyboard.createCursorKeys();
  left = game.input.keyboard.addKey(Phaser.Keyboard.H);
  right = game.input.keyboard.addKey(Phaser.Keyboard.L);
  up = game.input.keyboard.addKey(Phaser.Keyboard.K);
}

function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(player, platforms);
  player.body.velocity.x = 0;

  if (cursors.left.isDown || left.isDown) {
    //  Move to the left
    player.body.velocity.x = -150;

    player.animations.play("left");
  } else if (cursors.right.isDown || right.isDown) {
    //  Move to the right
    player.body.velocity.x = 150;

    player.animations.play("right");
  } else {
    //  Stand still
    player.animations.stop();

    // player.frame = 1
  }
  if ((cursors.up.isDown || up.isDown) && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
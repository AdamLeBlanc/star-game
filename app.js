var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
  preload,
  create,
  update
});
var platforms;
var player;
var cursors;
var stars;

function preload() {
  game.load.image("sky", "assets/sky.png");
  game.load.image("ground", "assets/platform.png");
  game.load.image("star", "assets/star.png");
  // each sprite is 32x48
  game.load.spritesheet("dude", "assets/dude.png", 32, 48);
}

function create() {
  var ground;
  var ledge;
  // turn on the physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, "sky");

  platforms = game.add.group();
  platforms.enableBody = true; // enable physics body by default on all sprites
  ground = platforms.create(0, game.world.height - 64, "ground");
  ground.scale.setTo(2, 2); // double the size
  ground.body.immovable = true; // make it so it doesn't move on collisions

  ledge = platforms.create(400, 400, "ground");
  ledge.body.immovable = true;

  // just reuse the same variable for the next ledge
  ledge = platforms.create(-150, 250, "ground");
  ledge.body.immovable = true;

  player = game.add.sprite(32, game.world.height - 150, "dude");
  game.physics.arcade.enable(player); // we have to enable physics
  player.body.bounce.y = 0.2; // give our player a little bounce
  player.body.gravity.y = 300; // make the player fall
  player.body.collideWorldBounds = true; // stay within the world bounds

  player.animations.add("left", [0, 1, 2, 3], 10, true); // see spritesheet for animation
  player.animations.add("right", [5, 6, 7, 8], 10, true);

  cursors = game.input.keyboard.createCursorKeys(); // manages keyboard input for us

  stars = game.add.group();
  stars.enableBody = true; // enable body by default on all

  // spread starts out 70px apart
  for (var i = 0; i < 12; i++) {
    var star = stars.create(i * 70, 0, "star");
    star.body.gravity.y = 100;
    star.body.bounce.y = 0.7 + Math.random() * 0.2; // random bounce
  }
}

function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms); // check collisions
  game.physics.arcade.collide(stars, platforms); // collide with platforms
  game.physics.arcade.overlap(player, stars, collectStar, null, this); // collect the stars when the player runs into them
  player.body.velocity.x = 0; // reset player movement
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play("left");
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play("right");
  } else {
    player.animations.stop();
    player.frame = 4;
  }

  if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    player.body.velocity.y = -350;
  }
}

function collectStar(player, star) {
  star.kill();
}

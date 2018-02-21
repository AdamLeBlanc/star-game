var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
  preload,
  create,
  update
});

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
}

function update() {}

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
  game.add.sprite(0, 0, "sky");
}

function update() {}

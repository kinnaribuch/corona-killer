var config = {
    type: Phaser.AUTO,
    width: 800,
    height:600,
    physics: {
        default: 'arcade',
    },
    scene: [PreloadScene, TitleScene, InfoScene, GameScene, OverScene],
};

var score=0;
var scoreText;
var gameOver = false;
var obstacle,music,coronoLogo,sky,syringe,ammo,cursors,bombs, stateText , explosion;
var game = new Phaser.Game(config);







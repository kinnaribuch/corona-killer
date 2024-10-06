class OverScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'overScene'});
    }

    preload()
    {
        this.load.image('overbg', 'assets/images/gameover-bg.png');    
        this.load.image('tryagain', 'assets/images/tryagain-btn.png');    
    }

    create()
    {
        this.add.image(400, 300, 'overbg');
     
        // start button
        const button = this.add.sprite( game.config.width / 2, game.config.height - 100, 'tryagain')
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        button.on('pointerdown', () => this.restart());  
    }

    restart()
    {   
        this.scene.stop('overScene');
        this.scene.start('titleScene');
    }
}
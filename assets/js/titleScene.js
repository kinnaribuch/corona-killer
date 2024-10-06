class TitleScene extends Phaser.Scene {
   
    constructor(){
        super({key:'titleScene'});
    }

    preload(){
        this.load.image('sky', 'assets/images/sky.png');    
        this.load.image('coronologo', 'assets/images/corona-logo.png');    
        this.load.image('playButton', 'assets/images/play-btn.png');    
        this.load.audio('music', 'assets/sound/soundd.mp3');
    }

    create(){

        this.add.image(400, 300, 'sky');
        music = this.sound.add('music', {volume:1});
        music.play();
        music.loop = true;

        coronoLogo = this.add.image(390 , 240, 'coronologo').setScale(0.6);
   
        // start button
        const button = this.add.sprite( 390, 450, 'playButton')
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        button.on('pointerdown', () => this.nextScene());
        
    }

    nextScene(){
        
        this.scene.stop('titleScene');
        this.scene.start('infoScene');
    }
}
class InfoScene extends Phaser.Scene {
   
    constructor(){
        super({key:'infoScene'});
    }

    preload(){
        this.load.image('instruction', 'assets/images/instruction.png');
        this.load.image('nextBtn', 'assets/images/next-btn.png');
    }

    create(){

        this.add.image(400, 300, 'instruction');
   
        // start button
        const button = this.add.sprite( 670, 500, 'nextBtn').setScale(0.9)
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        button.on('pointerdown', () => this.nextScene());
    }

    nextScene(){
        music.stop();
        this.scene.stop('infoScene');
        this.scene.start('gameScene');
    }
}
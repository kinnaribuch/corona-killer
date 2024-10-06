class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameScene'});
    }

    preload(){
        this.load.audio('gamefinish', 'assets/sound/gamefinish.wav');
        this.load.audio('gameover', 'assets/sound/gameover.wav');
        this.load.audio('bullet', 'assets/sound/bullet.wav');
        this.load.image('leftBtn', 'assets/images/left-btn.png');  
        this.load.image('rightBtn', 'assets/images/right-btn.png');      
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('syringe', 'assets/images/syringe.png');
        this.load.image('bomb', 'assets/images/corona.png');
        this.load.image('ammo', 'assets/images/ammo.png');   
        this.load.spritesheet('explosion', 'assets/images/explosion.png', { frameWidth: 68, frameHeight: 67 });
    }
    
    create(){

        sky = this.add.image(400, 300, 'sky');
        this.sound.add('gameover');
        this.sound.add('bullet');
        this.sound.add('gamefinish');
        
        syringe = this.physics.add.image(400,452, 'syringe').setScale(0.8).setOrigin(0.5,0)
        syringe.setCollideWorldBounds(true)

    
        cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.shoot, this)
    
        bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 8,
            setXY: {
                x:10, y: 10, stepX: Phaser.Math.Between(1, config.height - 15, config.width - 15)
            }
        })

        this.setObjVelocity(bombs);
    
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate:12,
            hideOnComplete :true,
        })
    
        scoreText = this.add.text(16,16,'Score:0', { fontSize:'32px',fill: '#fff' }).setShadow(2, 2, "#333333", 2);
      
        this.physics.add.collider(syringe,bombs,this.destroySyringe,null,this)

        const leftbutton = this.add.sprite( 650, 470, 'leftBtn').setScale(1.2)
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        leftbutton.on('pointerdown', this.left, this)
        leftbutton.on('pointerup', this.leftstop, this)

        const rightbutton = this.add.sprite( 740, 470, 'rightBtn').setScale(1.2)
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        rightbutton.on('pointerdown', this.right, this)
        rightbutton.on('pointerup', this.rightstop, this)

    }
  
    left(){
        syringe.setVelocityX(-200);  
    }

    leftstop(){
        syringe.setVelocityX(0);
    }
     
    right(){
        syringe.setVelocityX(200);
    }
    
    rightstop(){
        syringe.setVelocityX(0);
    }

    setObjVelocity(bombs){
        bombs.children.iterate(function(bomb){
            let xVel = Phaser.Math.Between(20, 100);
            let yVel = Phaser.Math.Between(20, 100);
            bomb.setVelocity(xVel, yVel);
        })
    }
    
    shoot(){
        ammo = this.physics.add.image(syringe.x,syringe.y, 'ammo').setScale(0.3)
        ammo.setRotation(-Phaser.Math.PI2 / 4);
        ammo.setVelocityY(-600)
        this.physics.add.collider(ammo,bombs,this.destroyBomb,null,this)
        var bulletVoice = this.sound.add('bullet');
        this.sound.play('bullet', {volume:1});
    }
    
    update(){

        this.checkForRepos(bombs)

        if (gameOver)
        {
            return;
        }
    }
  
   
    checkForRepos(bombs){
        bombs.children.iterate(function(bomb){
            if(bomb.y > config.height){
                resetPos(bomb)
            }
        })
    }
    
    destroyBomb(ammo,bomb){
    
        explosion = this.add.sprite(bomb.x,bomb.y, 'explosion');
        explosion.play('explode');
    
        bomb.disableBody(true, true)
        ammo.disableBody(true, true)
        let x = Phaser.Math.Between(0, config.width - 15)
        bomb.enableBody(true, x, 0, true, true)
        let xVel = Phaser.Math.Between(20, 100);
        let yVel = Phaser.Math.Between(20, 100);
        bomb.setVelocity(xVel, yVel);
    
        score += 10;
        scoreText.setText('Score: '+ score);
       
        var gameovermusic = this.sound.add('gameover');
        this.sound.play('gameover', {volume:1});   
    }

    destroySyringe(bomb){
        this.physics.pause();
        syringe.angle += 90;
        syringe.setTint(0xff0000);
        syringe.y = 575;
        gameOver = true;    

        setTimeout(function()
		{ 
			game.scene.keys.gameScene.scene.start('overScene');
		}, 1000);

        var gamefinishmusic = this.sound.add('gamefinish');
        this.sound.play('gamefinish', {volume:1});   
    }
}

function resetPos(bomb){
    bomb.y = 0;
    let randomX = Phaser.Math.Between(15, config.width - 15);
    bomb.x = randomX;
}
/*
used chatGPT to help with animations: https://chat.openai.com/share/1aa56c01-8b2f-45c7-af1a-d8e6d5c8b9cd
used chatGPT to help with passing data from scene to scene: https://chat.openai.com/share/46ea62d3-6a33-481d-9d29-0f89d1b5091f
*/

class Play extends Phaser.Scene 
{
    constructor()
    {
        super('playScene')
        this.timeAlive = 0
        this.isJumping = false
        this.ground
        this.ninja
        this.mine
        this.speedIncrease = 20000
    }

    create() 
    {
        //add background image to scene
        this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, 'PlayBackground').setOrigin(0, 0)
        this.timeAlive = 0

        //set up ninja sprite
        this.ninja = this.physics.add.sprite(100, 355, 'runAnims').setOrigin(0, 0)
        this.ninja.setCollideWorldBounds(true)
        this.ninja.setOffset(this.ninja.width / 2, this.ninja.height / 2 + 30)
        this.ninja.anims.play('runAnims')
        this.ninja.on('animationcomplete', function(animation, frame)
        {
            if (animation.key === 'jumpAnims')
            {
                this.ninja.anims.play('runAnims')
                this.isJumping = false
            }
        }, this)

        this.mine = this.physics.add.sprite(Phaser.Math.Between(800, 1600), 407, 'mineAnims').setOrigin(0, 0)
        this.mine.setScale(1.5)
        this.mine.anims.play('mineAnims')
        this.mine.body.allowGravity = false
        this.mine.body.immovable = true
        this.mine.setCollideWorldBounds(false)
        this.mine.setOffset(this.mine.width / 2 - 16, this.mine.height / 2 - 20)
        this.mine.setSize(30, 12)
        this.mine.setOrigin(0, 0)
        this.mineSpeed = -700
        this.mine.setVelocityX(this.mineSpeed)
        
        //set up ground sprite
        this.ground = this.physics.add.sprite(400, 745, "groundCollision")
        this.ground.body.allowGravity = false
        this.ground.body.immovable = true

        //add collision and physics
        this.physics.add.collider(this.ninja, this.ground)
        this.physics.add.collider(this.ninja, this.mine, this.handleMineCollision, null, this);
        this.physics.world.gravity.y = 5000

        //add space for jump
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //display time alive clock
        this.displayClock = this.add.text(235, 50, 'Time Elapsed: 0', {fontSize: '40px', fontFamily: 'Monospace'})
        this.clock = this.time.addEvent
        ({
            delay: 1000,
            callback: this.updateClock,
            callbackScope: this,
            loop: true
        })

        this.time.addEvent
        ({
            delay: this.speedIncrease,
            callback: this.increaseMineSpeed,
            callbackScope: this,
            loop: true
        })

        this.mineSpeedText = this.add.text(75, 225, '      Mine speed will start \n   increasing every 20 seconds', {fontSize: '40px', fontFamily: 'Monospace', visible: false})
        this.mineSpeedText.setVisible(false)

    }

    increaseMineSpeed()
    {
        this.mineSpeed -= 150
    }

    //checks to see if jump/roll animation is complete
    animationComplete(animation, frame)
    {
        if (animation.key == 'jumpAnims')
        {
            this.ninja.anims.play('runAnims')
        }

    }


    handleMineCollision(ninja, mine) 
    {
        this.sound.play('impact')
        this.scene.stop('playScene')
        this.scene.start('gameOverScene', {timeAlive: this.timeAlive})
    }

    updateClock()
    {
        this.timeAlive += 1
        this.displayClock.setText('Time Elapsed: ' + this.timeAlive)
    }

    update() //check collisions, game over, movement/animation 
    {

        if (this.mine.x + this.mine.width < 0) 
        {
            this.mine.x = this.sys.game.config.width;
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && !this.isJumping)
        {
            this.isJumping = true
            this.ninja.anims.play('jumpAnims')       
            this.ninja.setVelocityY(-1000)

            var randomSound = Math.floor(Math.random() * 3) + 1
            if (randomSound == 1)
            {
                this.sound.play('jumpsound1')
            }
    
            else if (randomSound == 2)
            {
                this.sound.play('jumpsound2')
            }

            else
            {
                this.sound.play('jumpsound3')
            }
        }  

        this.backgroundImage.tilePositionX += 4   

        this.mine.setVelocityX(this.mineSpeed)

        if (this.timeAlive >= 20 && this.timeAlive <= 25)
        {
            this.mineSpeedText.setVisible(true)
        }

        else
        {
            this.mineSpeedText.setVisible(false)
        }



    }

}

/*
used chatGPT to help with animations: https://chat.openai.com/share/1aa56c01-8b2f-45c7-af1a-d8e6d5c8b9cd
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
    }

    create() //add music, background, sprites, define keys, initialize/display score, game over flag
    {
        this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, 'PlayBackground').setOrigin(0, 0)

        this.ninja = this.physics.add.sprite(100, 355, 'runAnims').setOrigin(0, 0)
        this.ninja.setCollideWorldBounds(true)
        this.ninja.setOffset(this.ninja.width / 2, this.ninja.height / 2 + 30);

        this.ninja.anims.play('runAnims')

        this.ninja.on('animationcomplete', function(animation, frame)
        {
            if (animation.key === 'jumpAnims')
            {
                this.ninja.anims.play('runAnims')
                this.isJumping = false
            }
        }, this)
        

        this.ground = this.physics.add.sprite(400, 735, "groundCollision")
        this.ground.body.allowGravity = false
        this.ground.body.immovable = true

        this.mine = this.physics.add.sprite(400, 0, 'mineAnims').setOrigin(0, 0)
        this.mine.setCollideWorldBounds(true)
        this.mine.setOffset(this.mine.width / 2, this.mine.height / 2)
        this.mine.body.allowGravity = false
        this.mine.body.immovable = true


        this.physics.add.collider(this.ninja, this.ground)


        this.physics.world.gravity.y = 8000

        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.displayClock = this.add.text(235, 50, 'Time Elapsed: 0', {fontSize: '40px', fontFamily: 'Monospace'})

        this.clock = this.time.addEvent
        ({
            delay: 1000,
            callback: this.updateClock,
            callbackScope: this,
            loop: true
        })


    }

    animationComplete(animation, frame)
    {
        if (animation.key == 'jumpAnims')
        {
            this.ninja.anims.play('runAnims')
        }
    }

    updateClock()
    {
        this.timeAlive += 1
        this.displayClock.setText('Time Elapsed: ' + this.timeAlive)
    }

    update() //check collisions, game over, movement/animation, 
    {
        
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && !this.isJumping)
        {
            this.isJumping = true
            this.ninja.anims.play('jumpAnims')       
            this.ninja.setVelocityY(-3000)
        }

        else
        {
            this.ninja.setVelocity(0)
        }

        this.backgroundImage.tilePositionX += 4
    }

}

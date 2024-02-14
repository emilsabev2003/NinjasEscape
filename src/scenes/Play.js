class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() //add music, background, sprites, define keys, initialize/display score, game over flag
    {
        let ninjaSprite = this.add.sprite(300, 300, 'ninjaAnims').setOrigin(0, 0)
        ninjaSprite.anims.play('ninjaAnims')


    }

    update() //check collisions, game over, movement/animation, 
    {
        
    }

}

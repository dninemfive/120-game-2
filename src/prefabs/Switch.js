class Switch extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pos = {x: x + this.scene.player.x,
                    y: y - this.scene.player.y * game.config.height / 200};
        console.log("Added switch at position " + x + ", " + y + ".");

        let debugConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '30px',
            color: '#FFFFFF',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.text = this.scene.add.text(x, y, "(" + x + ", " + y + ")", debugConfig).setOrigin(0.5,0);
    }

    update() {
        let playerPos = this.scene.player.pos, 
            backgroundSizeX = this.scene.background.displayWidth / 2, 
            screenSizeX = game.config.width,
            backgroundSizeY = this.scene.background.displayHeight / 2,
            screenSizeY = game.config.height;
        if(Math.abs(playerPos.x) < Math.abs(backgroundSizeX - screenSizeX)){
            this.x = this.pos.x - playerPos.x;
            this.text.x = this.x;
        }
        if(Math.abs(playerPos.y) < Math.abs(backgroundSizeY - screenSizeY)){
            this.y = this.pos.y - playerPos.y;
            this.text.y = this.y;
        }
    }
}
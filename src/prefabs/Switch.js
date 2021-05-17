class Switch extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        let playerPos = this.scene.player.pos, 
            backgroundSizeX = this.scene.background.displayWidth / 2, 
            screenSizeX = game.config.width,
            backgroundSizeY = this.scene.background.displayHeight / 2,
            screenSizeY = game.config.height;
        if(Math.abs(playerPos.x) < Math.abs(backgroundSizeX - screenSizeX)){
            this.x = -playerPos.x;
        }
        if(Math.abs(playerPos.y) < Math.abs(backgroundSizeY - screenSizeY)){
            this.y = -playerPos.y;
        }
    }
}
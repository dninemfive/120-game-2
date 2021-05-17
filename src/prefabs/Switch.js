class Switch extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        let playerPos = this.scene.player.pos;
        this.x = -playerPos.x;
        this.y = -playerPos.y;
    }
}
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pos = new Phaser.Math.Vector2(playerStartPos);
        console.log("started player");
    }

    update() {
        // To do simple 8-way movement without diagonal speed bonus, we simply add components to a vector then set its max distance to move speed
        let velocity = new Phaser.Math.Vector2();
        if (keyLeft.isDown) {
            velocity.x -= playerSpeed;
        }
        if (keyRight.isDown) {
            velocity.x += playerSpeed;
        }
        if (keyUp.isDown) {
            velocity.y -= playerSpeed;
        }
        if (keyDown.isDown) {
            velocity.y += playerSpeed;
        }
        velocity = velocity.limit(playerSpeed);
        this.pos += velocity;
    }
}
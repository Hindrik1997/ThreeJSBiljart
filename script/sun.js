class Sun extends THREE.DirectionalLight {
    constructor() {
        super(0xffccb3, 0.3);
        this.position.set(100, 175, -100);
        this.lookAt(0, 0, 0);


        GAME.scene.add(this);
    }
}
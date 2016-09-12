class Sun extends THREE.DirectionalLight
{
    constructor()
    {
        super(0xffffff, 1);
        this.position.set(100,100,100);
        this.lookAt(0,0,0);
        GAME.scene.add(this);
    }
}
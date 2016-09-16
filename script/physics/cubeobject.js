class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, geometry, material, isMovable);
        this.boundingBox = new THREE.BoundingBoxHelper(mesh, 0x00ff00);
        this.boundingBox.update();
        if (isMovable) GAME.registerForUpdates(this.updateBoundingBox, this);
        GAME.scene.add(this.boundingBox);
    }


    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            return otherObject.isCollidingWith(this);
        }
        else if (otherObject instanceof CubeObject) {
            return this.boundingBox.intersectsBox(otherObject.boundingBox);
        }
    }

    //noinspection JSMethodCanBeStatic
    updateBoundingBox(that) {
        that.boundingBox.update();
    }
}
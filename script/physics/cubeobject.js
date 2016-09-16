class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, geometry, material, isMovable);
        this.boundingBoxHelper = new THREE.BoundingBoxHelper(mesh, 0x00ff00);
        this.boundingBoxHelper.update();
        if (isMovable) GAME.registerForUpdates(this.updateBoundingBox, this);
        GAME.scene.add(this.boundingBoxHelper);
    }


    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            return otherObject.isCollidingWith(this);
        }
        else if (otherObject instanceof CubeObject) {
            return this.boundingBoxHelper.box.intersectsBox(otherObject.boundingBoxHelper.box);
        }
    }

    //noinspection JSMethodCanBeStatic
    updateBoundingBox(that) {
        that.boundingBoxHelper.update();
    }
}
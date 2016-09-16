class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, geometry, material, isMovable);
        this.boundingBoxHelper = new THREE.BoundingBoxHelper(mesh, 0x00ff00);
        this.boundingBoxHelper.update();
        if (isMovable) GAME.registerForUpdates(this.updateBoundingBox, this);
        GAME.scene.add(this.boundingBoxHelper);
    }


    // TODO: include angle for exchange of force during collision
    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            let dist = this.boundingBoxHelper.box.distanceToPoint(otherObject.mesh.position);
            let radius = otherObject.geometry.boundingSphere.radius;
            return dist < radius;
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
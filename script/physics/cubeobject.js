class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, isMovable);
        this.boundingBoxHelper = new THREE.BoundingBoxHelper(mesh, 0x00ff00);
        this.boundingBoxHelper.update();
        if (isMovable) GAME.registerForUpdates(this.updateBoundingBox, this);
        GAME.scene.add(this.boundingBoxHelper);
    }

    get maxMovementPerFrame() {
        let parameters = this.mesh.geometry.parameters;
        return Math.min(parameters.width, parameters.depth, parameters.height)
    }


    get distanceToGround() {
        return this.mesh.geometry.parameters.height / 2;
    }

// TODO: include angle for exchange of force during collision
    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            let dist = this.boundingBoxHelper.box.distanceToPoint(otherObject.mesh.position);
            let radius = otherObject.mesh.geometry.boundingSphere.radius;
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

    translate(x, y, z) {
        this.mesh.translateX(x);
        this.mesh.translateY(y);
        this.mesh.translateZ(z);
        this.boundingBoxHelper.update();
    }
}
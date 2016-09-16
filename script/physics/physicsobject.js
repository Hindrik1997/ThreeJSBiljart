class PhysicsObject extends GameObject {
    constructor(mesh, geometry, material, isMovable) {
        super(mesh, geometry, material);
        this._isMovable = isMovable;
        COLLISIONCONTROLLER.registerObject(this);
    }

    get isMoveable() {
        return this._isMovable;
    }

    set isMoveable(value) {
        this._isMovable = value;
    }

    get geometry() {
        return this._geometry;
    }

    set geometry(value) {
        this._geometry = value;
    }

    isCollidingWith(otherObject) {
        if(this == otherObject) {
            console.log("Yes, this object is colliding with itself.");
            return;
        }
        if (this.geometry.boundingBox) {
            // we are a box
            if (otherObject.geometry.boundingBox) {
                // They are a box
                return this.geometry.boundingBox.intersectsBox(otherObject.geometry.boundingBox);
            }
            else if (otherObject.geometry.boundingSphere) {
                // They are a sphere
                return this.geometry.boundingBox.intersectsSphere(otherObject.geometry.boundingSphere);
            }
            else throw Error("Other object is not valid.");
        }
        else if (this.geometry.boundingSphere) {
            // we are a sphere
            if (otherObject.geometry.boundingBox) {
                // They are a box
                return this.geometry.boundingSphere.intersectsBox(otherObject.geometry.boundingBox);
            }
            else if (otherObject.geometry.boundingSphere) {
                // They are a sphere
                return this.geometry.boundingSphere.intersectsSphere(otherObject.geometry.boundingSphere);
            }
            else throw Error("Other object is not valid.");
        }
        else throw Error("This object is not valid.");
    }

    collidedWith(otherObject) {
        console.log("collisione");
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}
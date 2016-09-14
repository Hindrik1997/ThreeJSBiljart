class PhysicsObject extends GameObject {
    constructor(mesh, geometry, material, isMovable) {
        super(mesh, geometry, material);
        this._isMovable = isMovable;
        this._geometry = geometry;
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
        if (this.geometry.boundingBox) {
            // we are a box
            if (otherObject.geometry.boundingBox) {
                // They are a box
                this.geometry.boundingBox.isIntersectionBox(otherObject.geometry.boundingBox);
            }
            else if (otherObject.geometry.boundingSphere) {
                // They are a sphere
                this.geometry.boundingBox.isIntersectionSphere(otherObject.geometry.boundingSphere);
            }
            else throw Error("Other object is not valid.");
        }
        else if (this.geometry.boundingSphere) {
            // we are a sphere
        }
    }
}
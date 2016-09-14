class PhysicsObject extends GameObject {
    constructor(mesh, geometry, material, isMovable, boundingBox) {
        super(mesh, geometry, material);
        this._isMovable = isMovable;
    }

    get isMoveable() {
        return this._isMovable;
    }

    set isMoveable(value) {
        this._isMovable = value;
    }
}
class PhysicsObject extends GameObject {
    constructor(mesh, geometry, material, isMovable, boundingBox) {
        super(mesh, geometry, material);
        this._isMovable = isMovable;
        this._boundingBox = boundingBox;
    }

    get isMoveable() {
        return this._isMovable;
    }

    set isMoveable(value) {
        this._isMovable = value;
    }

    get boundingBox() {
        return this._boundingBox;
    }

    set boundingBox(value) {
        this._boundingBox = value;
    }

    isCollidingWith(otherObject)
    {
        if(this.boundingBox instanceof THREE.)
    }

    isSphereCollidingWithSphere(otherObject)
}
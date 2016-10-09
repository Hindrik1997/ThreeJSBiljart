class BallObject extends SphereObject {
    constructor(ballNumber, geometry, material, isMovable) {
        super(geometry, material, isMovable);

        this.ballNr = ballNumber;
    }
}
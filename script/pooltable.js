/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height)
    {
        this.basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.basePlateMat = new THREE.MeshPhysicalMaterial({ color : "green" });
        this.basePlate = new CubeObject(this.basePlateGeom, this.basePlateMat, false);
        GAME.scene.add(this.basePlate.mesh);

        let tcl = new THREE.TextureLoader();

        this.standGeom = new THREE.BoxGeometry(width * 0.9, 2.5, height * 0.9);
        this.standMat = new THREE.MeshLambertMaterial({
            map : tcl.load("imgs/wood.jpg")
        });

        this.stand = new THREE.Mesh(this.standGeom, this.standMat);

        this.stand.position.y = 1.225;

        this.basePlate.mesh.position.y = 2.5;

        GAME.scene.add(this.stand);
    }
}
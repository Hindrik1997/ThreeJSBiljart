/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height)
    {
        let tcl = new THREE.TextureLoader();

        let aM = tcl.load("imgs/carpet.jpg");

        aM.wrapS = aM.wrapT = THREE.RepeatWrapping;
        aM.repeat.set(width / 2, height / 2);

        this.basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.basePlateMat = new THREE.MeshPhysicalMaterial({
            map : aM,
            roughness : 0.78,
            reflectivity : 0.95,
            metalness : 0.15
        });


        this.basePlate = new CubeObject(this.basePlateGeom, this.basePlateMat, false);
        GAME.scene.add(this.basePlate.mesh);

        this.standMat = new THREE.MeshPhysicalMaterial({
            reflectivity : 0.6,
            metalness : 0.7,
            roughnessMap : tcl.load("imgs/wood_roughness.jpg"),
            map : tcl.load("imgs/wood.jpg"),
            side: THREE.DoubleSide
        });

        this.standGeom = new THREE.BoxGeometry(width * 0.9, 2.5, height * 0.9);


        this.standMesh = new THREE.Mesh(this.standGeom, this.standMat);
        this.standMesh.position.y = 1.225;

        this.basePlate.translate(0, 2.5, 0);
        this.basePlate.mesh.position.y = 2.5;
        GAME.scene.add(this.standMesh);
    }
}
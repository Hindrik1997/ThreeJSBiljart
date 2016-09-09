/**
 * Created by hindrik on 6-9-16.
 */

var scene, renderer, camera;

$(document).ready(function(){

    Initialize();

});



function Initialize()
{
    scene = new THREE.Scene();
    var width = $(window).width() - 20;
    var height = $(window).height() - 20;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    $("body").append(renderer.domElement);

    renderer.setClearColor(0xffffff);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000.0);
    camera.position.set(0,6,0);
    scene.add(camera);

    window.addEventListener('resize', function(){
        var w = $(window).width();
        var h = $(window).height();

        renderer.setSize(w, h);

        camera.aspect = w / h;

        camera.updateProjectionMatrix();

    });


    StartRenderLoop();
}



function StartRenderLoop()
{
    requestAnimationFrame(StartRenderLoop);


    renderer.render(scene, camera);
}
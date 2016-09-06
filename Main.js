/**
 * Created by hindrik on 6-9-16.
 */

var scene, renderer;

$(document).ready(function(){

    scene = new THREE.Scene();
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    $("body").append(renderer.domElement);

});
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// SCENE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//RENDERER
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//OBJECT
// Instantiate a loader
const loader = new GLTFLoader();

var mesh;
// Load a glTF resource
loader.load(
	// resource URL
	'model/Seper.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		mesh = gltf.scene
		scene.add(mesh);
		mesh.position.set(20,-5,100);
		mesh.scale.set(30,30,30);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var mesh2;
// Load a glTF resource
loader.load(
	// resource URL
	'model/kube.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		mesh2 = gltf.scene
		scene.add(mesh2);
		mesh2.position.set(-50,-5,2);
		mesh2.scale.set(30,30,30);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var mesh3;
// Load a glTF resource
loader.load(
	// resource URL
	'model/Logo.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		mesh3 = gltf.scene
		scene.add(mesh3);
		mesh3.position.set(0,0,-10);
		mesh3.scale.set(0.3,0.3,0.3);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

/**
* Image
**/
const geometry = new THREE.PlaneGeometry( 5,5 );
const alpha_texture = new THREE.TextureLoader().load('./text/1.jpg')
const material = new THREE.MeshBasicMaterial( {
	map: alpha_texture,
	// transparent: true,
	// side: THREE.DoubleSide
} );
const plane = new THREE.Mesh( geometry, material );
plane.position.set(0,0,2)
scene.add( plane );

const geometry1 = new THREE.PlaneGeometry( 5,5 );
const alpha_texture1 = new THREE.TextureLoader().load('./text/2.jpg')
const material1 = new THREE.MeshBasicMaterial( {
	map: alpha_texture1,
	// transparent: true,
	// side: THREE.DoubleSide
} );
const plane1 = new THREE.Mesh( geometry1, material1 );
plane1.position.set(0,0,10)
scene.add( plane1 );

const geometry2 = new THREE.PlaneGeometry( 5,5 );
const alpha_texture2 = new THREE.TextureLoader().load('./text/3.jpg')
const material2 = new THREE.MeshBasicMaterial( {
	map: alpha_texture2,
	// transparent: true,
	// side: THREE.DoubleSide
} );
const plane2 = new THREE.Mesh( geometry2, material2 );
plane2.position.set(0,0,20)
scene.add( plane2 );

const geometry3 = new THREE.PlaneGeometry( 5,5 );
const alpha_texture3 = new THREE.TextureLoader().load('./text/4.jpg')
const material3 = new THREE.MeshBasicMaterial( {
	map: alpha_texture3,
	// transparent: true,
	// side: THREE.DoubleSide
} );
const plane3 = new THREE.Mesh( geometry3, material3 );
plane3.position.set(0,0,30)
scene.add( plane3 );

// VIDEO
let video = document.getElementById('video1');
video.src = "video/showreel.mp4";

let videoTexture = new THREE.VideoTexture(video);
let geometryBox = new THREE.PlaneGeometry( 4,2.25 );
let materialBox = new THREE.MeshBasicMaterial( {map: videoTexture} );
let cube = new THREE.Mesh( geometryBox, materialBox );
scene.add( cube );
cube.position.set(0,0,6);
video.play();

//CAMERA
camera.position.z = 1;

//LIGHT
const pointLight = new THREE.PointLight( 0xffffff, 5, 100 );
pointLight.position.set( 2,2,5 );
const ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientlight, pointLight );

//HELPER
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,100);
scene.add(lightHelper)

//CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.03;

controls.screenSpacePanning = false;

// Mouse
window.addEventListener("wheel", onMouseWheel);

let y = 0
let position = 0

function onMouseWheel(event) {
	y = event.deltaY
}


//ANIMATE
function animate() {
    requestAnimationFrame( animate );

   	mesh.rotation.y += 0.001;
    mesh2.rotation.y += 0.002;
    mesh2.rotation.z += 0.006;
	mesh3.rotation.y += 0.001;
	
    controls.update();

	camera.position.y = y

    renderer.render( scene, camera );
	window.addEventListener( 'resize', onWindowResize );
}

animate();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}


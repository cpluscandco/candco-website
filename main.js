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
let loadedModel1;
const gltfLoader1 = new GLTFLoader();
gltfLoader1.load('model/Logo.gltf', (gltfScene1) => {
	loadedModel1 = gltfScene1;
	console.log(loadedModel1);

	gltfScene1.scene.rotation.y = Math.PI / 8;
	gltfScene1.scene.position.z = -10;
	gltfScene1.scene.scale.set(0.35,0.35,0.35);
	scene.add(gltfScene1.scene);
})

let loadedModel2;
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('model/Kube.gltf', (gltfScene2) => {
	loadedModel2 = gltfScene2;
	console.log(loadedModel2);


	gltfScene2.scene.position.set(-10,-1,30);
	gltfScene2.scene.scale.set(10,10,10);
	scene.add(gltfScene2.scene);
})

let loadedModel3;
const gltfLoader3 = new GLTFLoader();
gltfLoader3.load('model/Seper.gltf', (gltfScene3) => {
	loadedModel3 = gltfScene3;
	console.log(loadedModel3);


	gltfScene3.scene.position.set(17,-1,8);
	gltfScene3.scene.scale.set(10,10,10);
	scene.add(gltfScene3.scene);
})

let loadedModel4;
const gltfLoader4 = new GLTFLoader();
gltfLoader4.load('model/Donats.gltf', (gltfScene4) => {
	loadedModel4 = gltfScene4;
	console.log(loadedModel4);


	gltfScene4.scene.position.set(17,-1,35);
	gltfScene4.scene.scale.set(10,10,10);
	scene.add(gltfScene4.scene);
})

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
video.play(cube);

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
	if (loadedModel1) {
		// loadedModel.scene.rotation.x += 0.01;
		loadedModel1.scene.rotation.y += 0.004;
		// loadedModel.scene.rotation.z += 0.01;
	}

	if (loadedModel2) {
		// loadedModel.scene.rotation.x += 0.01;
		loadedModel2.scene.rotation.y += 0.004;
		loadedModel2.scene.rotation.z += 0.01;
	}

	if (loadedModel3) {
		// loadedModel.scene.rotation.x += 0.01;
		loadedModel3.scene.rotation.y += 0.004;
		loadedModel3.scene.rotation.z += 0.01;
	}

	if (loadedModel4) {
		// loadedModel.scene.rotation.x += 0.01;
		loadedModel4.scene.rotation.y += 0.004;
		loadedModel4.scene.rotation.z += 0.01;
	}
    requestAnimationFrame( animate );
	renderer.render( scene, camera );

	window.addEventListener( 'resize', onWindowResize );
}

animate();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	// render();

}


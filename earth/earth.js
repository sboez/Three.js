/* VARIABLES DECLARATION */
let scene, camera, renderer;

function start() {
	init();
	animate(); 
}

/* INIT SCENE */ 
function init() {
	scene = new THREE.Scene();
	setCamera();
	setRenderer();
	setLight();
	setObjects();
	controls();
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', windowResize, false);
}

function windowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function setRenderer() {
	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function setCamera() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
	scene.add(camera);
	camera.position.z = 3;
	camera.position.y = 0;
}

function setLight() {
	let ambientLight = new THREE.AmbientLight(0x222222);
	scene.add(ambientLight);

	let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 5, 5);
	scene.add(directionalLight);
}

function setObjects() {
	// TEXTURE
	let texture = THREE.ImageUtils.loadTexture('../pics/earthmap1k.jpg');
	let bump = THREE.ImageUtils.loadTexture('../pics/earthbump1k.jpg');
	let specular = THREE.ImageUtils.loadTexture('../pics/earthspec1k.jpg');
	let cloudTexture = THREE.ImageUtils.loadTexture('../pics/mergecloud.jpg');
	let starfield = THREE.ImageUtils.loadTexture('../pics/galaxy_starfield.png')

	// SPHERE - EARTH
	let earthGeometry = new THREE.SphereGeometry(0.5, 20, 20);
	let earthMaterial = new THREE.MeshPhongMaterial({
		map : texture,
		bumpMap : bump, 
		bumpScale : 0.2, 
		specularMap : specular, 
		specular : new THREE.Color('grey')});
	let earth = new THREE.Mesh(earthGeometry, earthMaterial);
	scene.add(earth);

	// CLOUD
	let cloudGeometry = new THREE.SphereGeometry(0.51, 20, 20);
	let cloudMaterial = new THREE.MeshPhongMaterial({
		map : cloudTexture,
		side : THREE.DoubleSide,
		opacity : 0.29,
		transparent : true,
		depthWrite : false
	});
	let cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
	scene.add(cloud);

	// STARFIELD
	let geometry  = new THREE.SphereGeometry(10, 32, 32)
	let material  = new THREE.MeshPhongMaterial({
		map : starfield,
		side : THREE.DoubleSide});
	let mesh  = new THREE.Mesh(geometry, material)
	scene.add(mesh);
}

function controls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2.5;
	controls.maxDistance = 10;
	controls.update();
}

function animate()
{
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	earth.rotation.y += 0.0003;
	cloud.rotation.y += 0.0006;
	controls.update();
}

start();
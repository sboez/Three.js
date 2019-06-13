// INIT SCENE
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHT 
var ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// CAMERA
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
scene.add(camera);
camera.position.z = 3;
camera.position.y = 0;

// TEXTURE
var texture = THREE.ImageUtils.loadTexture('../pics/earthmap1k.jpg');
var bump = THREE.ImageUtils.loadTexture('../pics/earthbump1k.jpg');
var specular = THREE.ImageUtils.loadTexture('../pics/earthspec1k.jpg');
var cloudTexture = THREE.ImageUtils.loadTexture('../pics/mergecloud.jpg');
var starfield = THREE.ImageUtils.loadTexture('../pics/galaxy_starfield.png')

// SPHERE - EARTH
var earthGeometry = new THREE.SphereGeometry(0.5, 20, 20);
var earthMaterial = new THREE.MeshPhongMaterial({
	map : texture,
	bumpMap : bump, 
	bumpScale : 0.2, 
	specularMap : specular, 
	specular : new THREE.Color('grey')});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// CLOUD
var cloudGeometry = new THREE.SphereGeometry(0.51, 20, 20);
var cloudMaterial = new THREE.MeshPhongMaterial({
	map : cloudTexture,
	side : THREE.DoubleSide,
	opacity : 0.29,
	transparent : true,
	depthWrite : false
});
var cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloud);

// STARFIELD
var geometry  = new THREE.SphereGeometry(10, 32, 32)
var material  = new THREE.MeshPhongMaterial({
	map : starfield,
	side : THREE.DoubleSide});
var mesh  = new THREE.Mesh(geometry, material)
scene.add(mesh);

// CONTROLS
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 2.5;
controls.maxDistance = 10;
controls.update();

// ANIMATION
function animate()
{
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	earth.rotation.y += 0.0003;
	cloud.rotation.y += 0.0006;
	controls.update();
}

animate();
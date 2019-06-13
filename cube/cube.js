/* VARIABLES DECLARATION */
let scene, camera, renderer, ambientLight, spotLight, spotLight2, spotLightHelper, spotLightHelper2,
cubeMaterial, point, color, numberOfSides, vertexIndex, faceIndices, size, cubeGeometry;

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
	setCube();
	setFloor();
	controls();
	window.addEventListener('resize', windowResize, false);
}

function windowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function setCamera() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
	scene.add(camera);
	camera.position.z = 550;
	camera.position.y = 200;
	camera.rotation.x = -20 * Math.PI / 180;
}

function setRenderer() {
	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

function setLight() {
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	spotLight = new THREE.SpotLight(0xffffff, 1.5, 5000, 35 * Math.PI / 180);
	spotLight.position.set(250, 350, 50);
	spotLight.castShadow = true;
	scene.add(spotLight);

	spotLight2 = new THREE.SpotLight(0xff9f39, 1.5, 5000, 25 * Math.PI / 180);
	spotLight2.position.set(-100, 250, 50);
	spotLight2.castShadow = true;
	scene.add(spotLight2);

	spotLightHelper = new THREE.SpotLightHelper(spotLight);
	spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
	scene.add(spotLightHelper);
	scene.add(spotLightHelper2);
}

function setCube() {
	cubeMaterial = new THREE.MeshPhongMaterial({color: 0xfff999, vertexColors: THREE.VertexColors});
	faceIndices = ['a', 'b', 'c', 'd'];
	size = 80;
	cubeGeometry = new THREE.CubeGeometry(size, size, size);
	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(0, 0, 0);
	cube.receiveShadow = true;
	cube.castShadow = true;
	scene.add(cube);
	setCubeColor();
}

function setCubeColor() {
	for (var i = 0; i < cubeGeometry.faces.length; i++)
	{
		let face = cubeGeometry.faces[i];
		numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;

		for(var j = 0; j < numberOfSides; j++)
		{
			vertexIndex = face[faceIndices[j]];
			point = cubeGeometry.vertices[vertexIndex];
			color = new THREE.Color(0xffffff);
			color.setRGB(0.6 + point.x / size, 0.6 + point.y / size, 0.6 + point.z / size);
			face.vertexColors[j] = color;
		}
	}
}

function setFloor() {
	let floorMaterial = new THREE.MeshLambertMaterial({color : 0xd3d3d3, side : THREE.DoubleSide});
	let floorGeometry = new THREE.PlaneGeometry(600, 300, 1, 1);
	let floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -160 ;
	floor.rotation.x -= Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
}

/* CONTROLS
Use mouse : 
- right click to move camera
- left click to turn aroud
- scroll to zoom
*/
function controls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();
}

function animate() 
{
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
 	cube.rotation.y += 0.01;
 	controls.update();
}

start();
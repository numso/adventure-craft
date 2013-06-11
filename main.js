window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

var startTime = Date.now();
var camera, scene, renderer;
var cube;

var xDir = 1;
var yDir = 1;

init();
animate();

function init() {
  // set up the camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 100;

  // set up the scene
  scene = new THREE.Scene();

  // set up the cube
  cube = new THREE.Mesh(
    new THREE.CubeGeometry(20, 20, 20),
    new THREE.MeshNormalMaterial()
  );

  // add the stuffs
  scene.add(cube);

  // set up the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  $('#game').append(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}

function update() {
  console.log(cube.position.y);
  if (cube.position.x > 50) xDir = -1;
  if (cube.position.x < -50) xDir = 1;

  if (cube.position.y > 30) yDir = -1;
  if (cube.position.y < -30) yDir = 1;
}

function render() {
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.0225;
  cube.rotation.z += 0.0175;

  console.log(xDir, yDir);
  cube.position.x += .2 * xDir;
  cube.position.y += .1 * yDir;

  renderer.render(scene, camera);
}

// -- Helper Functions ----------------------------------------------------------------------- //

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

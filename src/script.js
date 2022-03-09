import * as THREE from 'three';

// Подключим файл со стилями
import './style.css';

// Сцена
const scene = new THREE.Scene();

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Объект с размерами
const sizes = {
    width: 600,
    height: 600
};

// Камера
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Отрисовщик
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.canvas-js')
});

// Передвижение куба
/* mesh.position.x = -1;
mesh.position.y = -0.8;
mesh.position.z = 0.4; */

// Масштабирование куба
mesh.scale.x = 0.5;
mesh.scale.y = 2;
mesh.scale.z = 0.7;

// Отрисовка осей координат
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
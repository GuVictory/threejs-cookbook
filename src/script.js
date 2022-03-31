import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Подключим файл со стилями
import './style.css';

// Сцена
const scene = new THREE.Scene();

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'gold', wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Объект с размерами
const sizes = {
    width: 600,
    height: 600
};

// Камера
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector('canvas.canvas-js');

// Отрисовщик
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});


renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
    controls.update();

    // Отрисовываем
    renderer.render(scene, camera);

    // Вызываем функцию анимации в следующем фрейме
    window.requestAnimationFrame(tick);
};

tick();
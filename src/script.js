import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Подключим файл со стилями
import './style.css';

// Сцена
const scene = new THREE.Scene();


// Создаем пустой BufferGeometry
const geometry = new THREE.BufferGeometry();

// Создаем Float32Array, который содержит координаты вершин
const positionsArray = new Float32Array([
    0, 0, 0, // Первая вершина
    0, 1, 0, // Вторая вершина
    1, 0, 0  // Третья вершина
]);

//Создаем атрибут и называем его 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 'gold', wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// Объект с размерами
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Обновляем размеры
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
        else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

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
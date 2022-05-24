import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

// Подключим файл со стилями
import './style.css';

const parameters = {
    color: 0xff0000,
};

// Отладка
const gui = new dat.GUI();

// Сцена
const scene = new THREE.Scene();


// Создаем пустой BufferGeometry
const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true });

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

gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('Box x');
    
gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    });


const tick = () => {
    controls.update();

    // Отрисовываем
    renderer.render(scene, camera);

    // Вызываем функцию анимации в следующем фрейме
    window.requestAnimationFrame(tick);
};

tick();
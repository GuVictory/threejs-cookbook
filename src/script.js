import * as THREE from 'three';

// Подключим файл со стилями
import './style.css';

// Сцена
const scene = new THREE.Scene();

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'gold', wireframe: true });

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


// Отрисовка осей координат
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

/**
 * Анимация
 */
const animateLoop = () =>
{
    const elapsedTime = clock.getElapsedTime();
    
    // Вращение объекта
    // mesh.rotation.y = elapsedTime;

    // Передвижение объекта
    // mesh.position.x = Math.cos(elapsedTime);
    // mesh.position.y = Math.sin(elapsedTime);

    // Трансформация камеры
    camera.position.x = Math.cos(elapsedTime);
    camera.position.y = Math.sin(elapsedTime);
    camera.lookAt(mesh.position);

    // Отрисовываем
    renderer.render(scene, camera);

    // Вызываем функцию анимации в следующем фрейме
    window.requestAnimationFrame(animateLoop);
};

animateLoop();
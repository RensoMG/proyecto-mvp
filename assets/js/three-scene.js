import * as THREE from 'three';

// ========== CONFIGURACIÓN DE ESCENA ==========
const canvas = document.getElementById('threeCanvas');
const scene = new THREE.Scene();

// Fondo con gradiente vía escena
scene.background = new THREE.Color(0x0a0a0f);
scene.fog = new THREE.FogExp2(0x0a0a0f, 0.00015);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 8);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// ========== ILUMINACIÓN ==========
const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(5, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 1024;
keyLight.shadow.mapSize.height = 1024;
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xa855f7, 1.5);
rimLight.position.set(-5, -1, -3);
scene.add(rimLight);

const fillLight = new THREE.PointLight(0x818cf8, 1.5, 15);
fillLight.position.set(0, 2, 0);
scene.add(fillLight);

// ========== PARTÍCULAS DE FONDO ==========
const particlesCount = 1500;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
        colors[i * 3] = 0.388;     // R - 99 (6366f1)
        colors[i * 3 + 1] = 0.4;   // G - 102
        colors[i * 3 + 2] = 0.945; // B - 241
    } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.545;     // 8b5cf6
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.965;
    } else {
        colors[i * 3] = 0.66;      // a855f7
        colors[i * 3 + 1] = 0.333;
        colors[i * 3 + 2] = 0.969;
    }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.7,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// ========== GEOMETRÍAS CENTRALES ==========
const geometriesGroup = new THREE.Group();
scene.add(geometriesGroup);

// Toro principal
const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.3, 128, 32, 2, 3);
const torusMat = new THREE.MeshPhysicalMaterial({
    color: 0x6366f1,
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    emissive: 0x1a1040,
    emissiveIntensity: 0.5,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.castShadow = true;
geometriesGroup.add(torus);

// Esfera interior
const sphereGeo = new THREE.IcosahedronGeometry(0.6, 1);
const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0xa855f7,
    metalness: 0.3,
    roughness: 0.15,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    emissive: 0x200840,
    emissiveIntensity: 0.6,
    wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
geometriesGroup.add(sphere);

// Anillo de esferas pequeñas
const smallSpheresGroup = new THREE.Group();
const smallSphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 1.8;
    const smallMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / 12, 0.8, 0.6),
        metalness: 0.5,
        roughness: 0.2,
        emissive: new THREE.Color().setHSL(i / 12, 0.9, 0.2),
        emissiveIntensity: 0.4,
    });
    const smallSphere = new THREE.Mesh(smallSphereGeo, smallMat);
    smallSphere.position.x = Math.cos(angle) * radius;
    smallSphere.position.z = Math.sin(angle) * radius;
    smallSphere.position.y = Math.sin(angle * 3) * 0.5;
    smallSpheresGroup.add(smallSphere);
}
geometriesGroup.add(smallSpheresGroup);

// Cubos flotantes decorativos
const cubesGroup = new THREE.Group();
for (let i = 0; i < 8; i++) {
    const cubeGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const cubeMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.6,
        roughness: 0.2,
        emissive: 0x100830,
        emissiveIntensity: 0.3,
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    const phi = Math.acos(-1 + (2 * i) / 8);
    const theta = Math.sqrt(8 * Math.PI) * phi;
    cube.position.x = 2.2 * Math.cos(theta) * Math.sin(phi);
    cube.position.y = 2.2 * Math.sin(theta) * Math.sin(phi);
    cube.position.z = 2.2 * Math.cos(phi);
    cubesGroup.add(cube);
}
geometriesGroup.add(cubesGroup);

// ========== SUELO REFLECTANTE ==========
const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a14,
    metalness: 0.9,
    roughness: 0.4,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -3;
ground.receiveShadow = true;
scene.add(ground);

// ========== MOUSE INTERACTION ==========
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ========== ANIMATION LOOP ==========
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Suavizar mouse
    target.x += (mouse.x - target.x) * 0.05;
    target.y += (mouse.y - target.y) * 0.05;

    // Rotación del grupo principal
    geometriesGroup.rotation.y += 0.003;
    geometriesGroup.rotation.x += (target.y * 0.3 - geometriesGroup.rotation.x) * 0.02;
    geometriesGroup.rotation.y += (target.x * 0.5 - geometriesGroup.rotation.y) * 0.02;

    // Rotación del toro
    torus.rotation.x += 0.002;
    torus.rotation.z += 0.001;

    // Esfera interior
    sphere.rotation.y -= 0.004;
    sphere.rotation.x += 0.002;

    // Anillo de esferas pequeñas
    smallSpheresGroup.rotation.y += 0.008;
    smallSpheresGroup.rotation.x += 0.003;

    // Cubos flotantes
    cubesGroup.rotation.y -= 0.005;
    cubesGroup.rotation.z += 0.004;

    // Partículas
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;

    // Movimiento de cámara sutil
    camera.position.x += (target.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (1.5 - target.y * 0.6 - camera.position.y) * 0.02;
    camera.lookAt(0, 0.2, 0);

    // Luz puntual dinámica
    fillLight.intensity = 1.5 + Math.sin(time * 2) * 0.3;

    renderer.render(scene, camera);
}

// ========== RESIZE ==========
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animación
animate();
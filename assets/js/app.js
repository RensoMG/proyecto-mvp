// ==================== NAVEGACIÓN MÓVIL ====================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ==================== EFECTO SCROLL NAVBAR ====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ESCENA 3D CON THREE.JS ====================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometría: toroide anudado que flota
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.3,
        roughness: 0.4,
        wireframe: false,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Partículas esfera
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x60a5fa,
        blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x3b82f6, 1, 10);
    pointLight.position.set(2, 2, 4);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xa78bfa, 0.5, 10);
    pointLight2.position.set(-2, -1, 3);
    scene.add(pointLight2);

    // Animación
    function animate() {
        requestAnimationFrame(animate);

        knot.rotation.x += 0.002;
        knot.rotation.y += 0.003;
        particlesMesh.rotation.y -= 0.0005;
        particlesMesh.rotation.x += 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // Ajuste responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});